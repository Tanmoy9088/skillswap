"use client";

import { useEffect, useMemo, useState } from "react";

import { Calendar } from "lucide-react";

import { useRequestScheduleSwap } from "@/hooks/skills/useScheduleSwapSession";
import { useSessionOptions } from "@/hooks/skills/useSessionOptions";
import { getMentorAvailability } from "@/lib/mentorAvailability";

import ScheduleSessionAvailability from "./ScheduleSessionAvailability";
import ScheduleSessionConfirmation from "./ScheduleSessionConfirmation";
import ScheduleSessionHeader from "./ScheduleSessionHeader";
import ScheduleSessionOptions from "./ScheduleSessionOptions";

import { DAYS, formatTime, timeToMinutes } from "./ScheduleSessionUtils";

interface ScheduleSessionModalProps {
  swapId: string;
  skillName: string;
  mentorAuthUserId: string;

  /**
   * This is the mentor's user_skills.id.
   *
   * Example:
   * user_skills.id = beffb7b4-...
   */
  userSkillId: string;

  onClose: () => void;
}

interface Availability {
  id: string;
  mentor_auth_user_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
}

const ScheduleSessionModal = ({
  swapId,
  skillName,
  mentorAuthUserId,
  userSkillId,
  onClose,
}: ScheduleSessionModalProps) => {
  const scheduleSession = useRequestScheduleSwap();

  const {
    data: sessionOptions = [],
    isLoading: isLoadingSessionOptions,
    isError: isSessionOptionsError,
    error: sessionOptionsError,
  } = useSessionOptions(userSkillId);

  const [selectedSessionOptionId, setSelectedSessionOptionId] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [availability, setAvailability] = useState<Availability[]>([]);

  const [isLoadingAvailability, setIsLoadingAvailability] = useState(true);

  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null,
  );

  const [isConfirming, setIsConfirming] = useState(false);

  const [currentTime] = useState(() => Date.now());

  const today = new Date().toISOString().split("T")[0];

  const selectedSessionOption = useMemo(() => {
    return sessionOptions.find(
      (option) => option.id === selectedSessionOptionId,
    );
  }, [sessionOptions, selectedSessionOptionId]);

  useEffect(() => {
    const loadAvailability = async () => {
      try {
        setIsLoadingAvailability(true);
        setAvailabilityError(null);

        const data = await getMentorAvailability(mentorAuthUserId);

        setAvailability(data as Availability[]);
      } catch (error) {
        setAvailabilityError(
          error instanceof Error
            ? error.message
            : "Failed to load mentor availability.",
        );
      } finally {
        setIsLoadingAvailability(false);
      }
    };

    void loadAvailability();
  }, [mentorAuthUserId]);

  const selectedAvailability = useMemo(() => {
    if (!date) {
      return [];
    }

    const selectedDate = new Date(`${date}T00:00:00`);

    const dayOfWeek = selectedDate.getDay();

    return availability.filter(
      (item) => item.is_active && item.day_of_week === dayOfWeek,
    );
  }, [date, availability]);

  const isTimeWithinAvailability = (selectedTime: string): boolean => {
    if (
      !selectedTime ||
      selectedAvailability.length === 0 ||
      !selectedSessionOption
    ) {
      return false;
    }

    const selectedStart = timeToMinutes(selectedTime);

    if (selectedStart < 0) {
      return false;
    }

    const duration = selectedSessionOption.duration_minutes;

    const selectedEnd = selectedStart + duration;

    return selectedAvailability.some((slot) => {
      const start = timeToMinutes(slot.start_time.slice(0, 5));

      const end = timeToMinutes(slot.end_time.slice(0, 5));

      return selectedStart >= start && selectedEnd <= end;
    });
  };

  const availabilityText = useMemo(() => {
    if (!date) {
      return "";
    }

    if (selectedAvailability.length === 0) {
      return `Mentor is not available on ${
        DAYS[new Date(`${date}T00:00:00`).getDay()]
      }.`;
    }

    return selectedAvailability
      .map((slot) => {
        const start = slot.start_time.slice(0, 5);

        const end = slot.end_time.slice(0, 5);

        return `${formatTime(start)} – ${formatTime(end)}`;
      })
      .join(", ");
  }, [date, selectedAvailability]);

  const sessionOptionsErrorMessage =
    sessionOptionsError instanceof Error
      ? sessionOptionsError.message
      : "Failed to load session options.";

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    setTime("");
    setIsConfirming(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedSessionOptionId) {
      alert("Please select a session option.");
      return;
    }

    if (!selectedSessionOption) {
      alert("The selected session option is no longer available.");
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

    if (!isTimeWithinAvailability(time)) {
      alert(
        `The ${selectedSessionOption.duration_minutes}-minute session does not fit inside the mentor's availability. Available: ${availabilityText}`,
      );

      return;
    }

    const scheduledAt = new Date(`${date}T${time}`);

    if (Number.isNaN(scheduledAt.getTime())) {
      alert("Invalid date or time.");
      return;
    }

    if (scheduledAt.getTime() <= currentTime) {
      alert("Please choose a future date and time.");
      return;
    }

    setIsConfirming(true);
  };

  const handleConfirm = async () => {
    if (!selectedSessionOption) {
      alert("Please select a session option.");
      setIsConfirming(false);
      return;
    }

    const scheduledAt = new Date(`${date}T${time}`);

    if (!isTimeWithinAvailability(time)) {
      alert(
        `The selected session does not fit inside the mentor's availability: ${availabilityText}`,
      );

      setIsConfirming(false);

      return;
    }

    if (scheduledAt.getTime() <= Date.now()) {
      alert("Please choose a future date and time.");

      setIsConfirming(false);

      return;
    }

    try {
      await scheduleSession.mutateAsync({
        swapId,
        sessionOptionId: selectedSessionOption.id,
        scheduledAt: scheduledAt.toISOString(),
      });

      alert("Session scheduling request sent successfully.");

      onClose();
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to schedule session.",
      );
    }
  };

  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString()
    : "";

  const isTimeDisabled =
    !date ||
    isLoadingAvailability ||
    selectedAvailability.length === 0 ||
    !selectedSessionOption;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <ScheduleSessionHeader
          isConfirming={isConfirming}
          skillName={skillName}
          onClose={onClose}
          isPending={scheduleSession.isPending}
        />

        {!isConfirming && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <ScheduleSessionOptions
              sessionOptions={sessionOptions}
              selectedSessionOptionId={selectedSessionOptionId}
              isLoading={isLoadingSessionOptions}
              isError={isSessionOptionsError}
              errorMessage={sessionOptionsErrorMessage}
              onSelect={setSelectedSessionOptionId}
            />

            {selectedSessionOption && (
              <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                  Selected session
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">
                    {selectedSessionOption.duration_minutes} minutes
                  </span>

                  <span className="font-bold text-indigo-600">
                    {selectedSessionOption.token_rate} tokens
                  </span>
                </div>
              </div>
            )}

            <ScheduleSessionAvailability
              date={date}
              time={time}
              today={today}
              selectedAvailability={selectedAvailability}
              availabilityText={availabilityText}
              isLoadingAvailability={isLoadingAvailability}
              availabilityError={availabilityError}
              isTimeDisabled={isTimeDisabled}
              durationMinutes={selectedSessionOption?.duration_minutes}
              onDateChange={handleDateChange}
              onTimeChange={setTime}
            />

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={scheduleSession.isPending}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  scheduleSession.isPending ||
                  isLoadingAvailability ||
                  isLoadingSessionOptions ||
                  sessionOptions.length === 0
                }
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Calendar className="h-4 w-4" />
                Review
              </button>
            </div>
          </form>
        )}

        {isConfirming && (
          <ScheduleSessionConfirmation
            skillName={skillName}
            selectedSessionOption={selectedSessionOption}
            formattedDate={formattedDate}
            time={time}
            availabilityText={availabilityText}
            isPending={scheduleSession.isPending}
            onBack={() => setIsConfirming(false)}
            onConfirm={handleConfirm}
            formatTime={formatTime}
          />
        )}
      </div>
    </div>
  );
};

export default ScheduleSessionModal;
