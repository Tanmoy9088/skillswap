"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { getMentorAvailability } from "@/lib/mentorAvailability";
import { useProposeSwapReschedule } from "@/hooks/skills/useProposeSwapReschedule";
import RescheduleSessionForm from "./ReScheduleSessionForm";
import RescheduleSessionHeader from "./ReScheduleSessionHeader";
import RescheduleSessionReview from "./ReScheduleSessionReview";
import {
  DAYS,
  formatTime,
  getToday,
  isTimeWithinAvailability,
  type Availability,
} from "./rescheduleSessionUtils";

interface RescheduleSessionModalProps {
  swapId: string;
  skillName: string;
  mentorAuthUserId: string;
  onClose: () => void;
}

type Step = "select" | "review";

const RescheduleSessionModal = ({
  swapId,
  skillName,
  mentorAuthUserId,
  onClose,
}: RescheduleSessionModalProps) => {
  const proposeReschedule = useProposeSwapReschedule();

  const [step, setStep] = useState<Step>("select");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true);
  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    const loadAvailability = async () => {
      setIsLoadingAvailability(true);
      setAvailabilityError(null);

      try {
        const data = await getMentorAvailability(mentorAuthUserId);

        if (cancelled) {
          return;
        }

        setAvailability(data as Availability[]);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setAvailabilityError(
          error instanceof Error
            ? error.message
            : "Failed to load mentor availability.",
        );
      } finally {
        if (!cancelled) {
          setIsLoadingAvailability(false);
        }
      }
    };

    void loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [mentorAuthUserId]);

  const selectedAvailability = useMemo(() => {
    if (!date) {
      return [];
    }

    const selectedDate = new Date(`${date}T00:00:00+05:30`);
    const dayOfWeek = selectedDate.getDay();

    return availability.filter(
      (item) => item.is_active && item.day_of_week === dayOfWeek,
    );
  }, [date, availability]);

  const availabilityText = useMemo(() => {
    if (!date) {
      return "";
    }

    if (selectedAvailability.length === 0) {
      const selectedDate = new Date(`${date}T00:00:00+05:30`);

      return `Mentor is not available on ${DAYS[selectedDate.getDay()]}.`;
    }

    return selectedAvailability
      .map(
        (slot) =>
          `${formatTime(slot.start_time)} – ${formatTime(slot.end_time)}`,
      )
      .join(", ");
  }, [date, selectedAvailability]);

  const createProposedAt = () => {
    if (!date || !time) {
      return null;
    }

    const proposedAt = new Date(`${date}T${time}:00+05:30`);

    return Number.isNaN(proposedAt.getTime()) ? null : proposedAt;
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;

    setDate(newDate);
    setTime("");

    if (step === "review") {
      setStep("select");
    }
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);

    if (step === "review") {
      setStep("select");
    }
  };

  const handleReview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoadingAvailability) {
      return;
    }

    if (availabilityError) {
      alert(availabilityError);
      return;
    }

    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    if (selectedAvailability.length === 0) {
      alert("The mentor is not available on the selected date.");
      return;
    }

    if (!isTimeWithinAvailability(time, selectedAvailability)) {
      alert(
        `Please choose a time within the mentor's availability: ${availabilityText}`,
      );
      return;
    }

    const proposedAt = createProposedAt();

    if (!proposedAt) {
      alert("Invalid date or time.");
      return;
    }

    if (proposedAt.getTime() <= Date.now()) {
      alert("Please choose a future date and time.");
      return;
    }

    setStep("review");
  };

  const handleConfirm = async () => {
    if (proposeReschedule.isPending) {
      return;
    }

    if (!date || !time) {
      return;
    }

    const proposedAt = createProposedAt();

    if (!proposedAt) {
      alert("Invalid date or time.");
      return;
    }

    if (!isTimeWithinAvailability(time, selectedAvailability)) {
      alert(
        `The selected time is outside the mentor's availability: ${availabilityText}`,
      );

      setStep("select");
      return;
    }

    if (proposedAt.getTime() <= Date.now()) {
      alert("Please choose a future date and time.");

      setStep("select");
      return;
    }

    try {
      await proposeReschedule.mutateAsync({
        swapId,
        proposedAt: proposedAt.toISOString(),
        note: note.trim() || undefined,
      });

      alert("New session time proposed successfully.");
      onClose();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to suggest another time.",
      );
    }
  };

  const formattedDate = useMemo(() => {
    if (!date) {
      return "";
    }

    return new Date(`${date}T00:00:00+05:30`).toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [date]);

  const isTimeDisabled =
    !date || isLoadingAvailability || selectedAvailability.length === 0;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reschedule-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <RescheduleSessionHeader
          step={step}
          skillName={skillName}
          isPending={proposeReschedule.isPending}
          onClose={onClose}
        />

        {isLoadingAvailability && (
          <div className="mt-6 flex items-center gap-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading your availability...</span>
          </div>
        )}

        {!isLoadingAvailability && availabilityError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {availabilityError}
          </div>
        )}

        {step === "select" && !isLoadingAvailability && (
          <RescheduleSessionForm
            date={date}
            time={time}
            note={note}
            today={getToday()}
            selectedAvailability={selectedAvailability}
            availabilityText={availabilityText}
            isTimeDisabled={isTimeDisabled}
            isPending={proposeReschedule.isPending}
            isLoadingAvailability={isLoadingAvailability}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
            onNoteChange={(event) => setNote(event.target.value)}
            onCancel={onClose}
            onSubmit={handleReview}
          />
        )}

        {step === "review" && (
          <RescheduleSessionReview
            skillName={skillName}
            formattedDate={formattedDate}
            time={time}
            availabilityText={availabilityText}
            isPending={proposeReschedule.isPending}
            onBack={() => setStep("select")}
            onConfirm={handleConfirm}
            formatTime={formatTime}
          />
        )}
      </div>
    </div>
  );
};

export default RescheduleSessionModal;
