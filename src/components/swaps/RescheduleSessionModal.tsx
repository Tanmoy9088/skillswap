"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, CheckCircle2, Clock, Loader2, X } from "lucide-react";

import { getMentorAvailability } from "@/lib/mentorAvailability";
import { useProposeSwapReschedule } from "@/hooks/skills/useProposeSwapReschedule";

interface RescheduleSessionModalProps {
  swapId: string;
  skillName: string;
  mentorAuthUserId: string;
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

type Step = "select" | "review";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return 0;
  }

  return hours * 60 + minutes;
};

const formatTime = (time: string): string => {
  if (!time) {
    return "";
  }

  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return time;
  }

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

const getToday = (): string => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const createLocalDate = (date: string, time: string): Date => {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  const result = new Date();

  result.setFullYear(year, month - 1, day);
  result.setHours(hours, minutes, 0, 0);

  return result;
};

const isTimeWithinAvailability = (
  selectedTime: string,
  selectedAvailability: Availability[],
): boolean => {
  if (!selectedTime || selectedAvailability.length === 0) {
    return false;
  }

  const selectedMinutes = timeToMinutes(selectedTime);

  return selectedAvailability.some((slot) => {
    const startMinutes = timeToMinutes(slot.start_time);
    const endMinutes = timeToMinutes(slot.end_time);

    return selectedMinutes >= startMinutes && selectedMinutes < endMinutes;
  });
};

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

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

  /*
  |--------------------------------------------------------------------------
  | Load mentor availability
  |--------------------------------------------------------------------------
  |
  | This runs only when the mentor changes.
  |
  */

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

  /*
  |--------------------------------------------------------------------------
  | Selected day's availability
  |--------------------------------------------------------------------------
  */

  const selectedAvailability = useMemo(() => {
    if (!date) {
      return [];
    }

    const selectedDate = createLocalDate(date, "00:00");

    const dayOfWeek = selectedDate.getDay();

    return availability.filter(
      (item) => item.is_active && item.day_of_week === dayOfWeek,
    );
  }, [date, availability]);

  /*
  |--------------------------------------------------------------------------
  | Availability text
  |--------------------------------------------------------------------------
  */

  const availabilityText = useMemo(() => {
    if (!date) {
      return "";
    }

    if (selectedAvailability.length === 0) {
      const selectedDate = createLocalDate(date, "00:00");

      return `Mentor is not available on ${DAYS[selectedDate.getDay()]}.`;
    }

    return selectedAvailability
      .map((slot) => {
        return `${formatTime(slot.start_time)} – ${formatTime(slot.end_time)}`;
      })
      .join(", ");
  }, [date, selectedAvailability]);

  /*
  |--------------------------------------------------------------------------
  | Date changed
  |--------------------------------------------------------------------------
  */

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = event.target.value;

    setDate(newDate);

    // Time from the previous date must not remain selected.
    setTime("");

    // If the user changes the date while reviewing,
    // return them to the selection step.
    if (step === "review") {
      setStep("select");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Time changed
  |--------------------------------------------------------------------------
  */

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);

    if (step === "review") {
      setStep("select");
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Review
  |--------------------------------------------------------------------------
  */

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

    const proposedAt = createLocalDate(date, time);

    if (Number.isNaN(proposedAt.getTime())) {
      alert("Invalid date or time.");
      return;
    }

    if (proposedAt.getTime() <= Date.now()) {
      alert("Please choose a future date and time.");
      return;
    }

    setStep("review");
  };

  /*
  |--------------------------------------------------------------------------
  | Send proposal
  |--------------------------------------------------------------------------
  */

  const handleConfirm = async () => {
    if (proposeReschedule.isPending) {
      return;
    }

    if (!date || !time) {
      return;
    }

    const proposedAt = createLocalDate(date, time);

    if (Number.isNaN(proposedAt.getTime())) {
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

  /*
  |--------------------------------------------------------------------------
  | Formatted date
  |--------------------------------------------------------------------------
  */

  const formattedDate = useMemo(() => {
    if (!date) {
      return "";
    }

    return createLocalDate(date, "00:00").toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [date]);

  const isTimeDisabled =
    !date || isLoadingAvailability || selectedAvailability.length === 0;

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reschedule-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        {/* HEADER */}

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              {step === "review" ? (
                <CheckCircle2 className="h-5 w-5 text-purple-600" />
              ) : (
                <Calendar className="h-5 w-5 text-purple-600" />
              )}

              <h2
                id="reschedule-modal-title"
                className="text-xl font-semibold text-gray-900"
              >
                {step === "review" ? "Review New Time" : "Suggest Another Time"}
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {step === "review"
                ? "Review the new session time before sending it to the learner."
                : `Suggest a different time for your ${skillName} session.`}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={proposeReschedule.isPending}
            aria-label="Close modal"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* LOADING */}

        {isLoadingAvailability && (
          <div className="mt-6 flex items-center gap-3 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
            <Loader2 className="h-4 w-4 animate-spin" />

            <span>Loading your availability...</span>
          </div>
        )}

        {/* ERROR */}

        {!isLoadingAvailability && availabilityError && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {availabilityError}
          </div>
        )}

        {/* ============================================================
            STEP 1
        ============================================================ */}

        {step === "select" && !isLoadingAvailability && (
          <form onSubmit={handleReview} className="mt-6 space-y-5">
            {/* DATE */}

            <div>
              <label
                htmlFor="reschedule-date"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                New Date
              </label>

              <input
                id="reschedule-date"
                type="date"
                value={date}
                min={getToday()}
                disabled={proposeReschedule.isPending}
                onChange={handleDateChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
                required
              />
            </div>

            {/* AVAILABILITY */}

            {date && (
              <div
                className={`rounded-xl p-4 text-sm ${
                  selectedAvailability.length > 0
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                <div className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" />

                  <div>
                    <p className="font-semibold">Mentor availability</p>

                    <p className="mt-1">{availabilityText}</p>
                  </div>
                </div>
              </div>
            )}

            {/* TIME */}

            <div>
              <label
                htmlFor="reschedule-time"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                New Time
              </label>

              <input
                id="reschedule-time"
                type="time"
                value={time}
                disabled={isTimeDisabled || proposeReschedule.isPending}
                onChange={handleTimeChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
                required
              />

              {date && selectedAvailability.length > 0 && (
                <p className="mt-2 text-xs text-gray-500">
                  Choose a time between {availabilityText}.
                </p>
              )}
            </div>

            {/* NOTE */}

            <div>
              <label
                htmlFor="reschedule-note"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Note{" "}
                <span className="font-normal text-gray-400">(optional)</span>
              </label>

              <textarea
                id="reschedule-note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                maxLength={500}
                placeholder="Example: I am available at this time instead."
                disabled={proposeReschedule.isPending}
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
              />

              <p className="mt-1 text-right text-xs text-gray-400">
                {note.length}/500
              </p>
            </div>

            {/* BUTTONS */}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={proposeReschedule.isPending}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={proposeReschedule.isPending || isLoadingAvailability}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Calendar className="h-4 w-4" />
                Review
              </button>
            </div>
          </form>
        )}

        {/* ============================================================
            STEP 2
        ============================================================ */}

        {step === "review" && (
          <div className="mt-6 space-y-5">
            {/* SESSION DETAILS */}

            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
              <h3 className="mb-4 font-semibold text-purple-900">
                New Session Details
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Skill</span>

                  <span className="text-right font-medium text-gray-900">
                    {skillName}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Date</span>

                  <span className="text-right font-medium text-gray-900">
                    {formattedDate}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Time</span>

                  <span className="font-medium text-gray-900">
                    {formatTime(time)}
                  </span>
                </div>
              </div>
            </div>

            {/* INFO */}

            <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
              <p className="font-semibold">Learner confirmation required</p>

              <p className="mt-1">
                This does not schedule the session immediately. The learner must
                accept your proposed time first.
              </p>
            </div>

            {/* BUTTONS */}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("select")}
                disabled={proposeReschedule.isPending}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={proposeReschedule.isPending}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {proposeReschedule.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Send Proposal
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RescheduleSessionModal;
