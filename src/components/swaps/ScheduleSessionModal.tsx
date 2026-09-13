"use client";

import { useEffect, useMemo, useState } from "react";

import { Calendar, CheckCircle2, Loader2, X, Clock, Coins } from "lucide-react";

import { useRequestScheduleSwap } from "@/hooks/mentors/skills/useScheduleSwapSession";
import { useSessionOptions } from "@/hooks/mentors/skills/useSessionOptions";
import { getMentorAvailability } from "@/lib/mentorAvailability";

import type { BookingSessionOption } from "@/types/types/swaps";

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

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ScheduleSessionModal = ({
  swapId,
  skillName,
  mentorAuthUserId,
  userSkillId,
  onClose,
}: ScheduleSessionModalProps) => {
  const scheduleSession = useRequestScheduleSwap();

  /*
   * ============================================================
   * SESSION OPTIONS
   * ============================================================
   *
   * These are created by the mentor.
   *
   * Example:
   *
   * 30 minutes → 2 tokens
   * 60 minutes → 4 tokens
   * 90 minutes → 6 tokens
   */
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

  /*
   * ============================================================
   * SELECTED SESSION OPTION
   * ============================================================
   */

  const selectedSessionOption = useMemo(() => {
    return sessionOptions.find(
      (option) => option.id === selectedSessionOptionId,
    );
  }, [sessionOptions, selectedSessionOptionId]);

  /*
   * ============================================================
   * LOAD MENTOR AVAILABILITY
   * ============================================================
   */

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

  /*
   * ============================================================
   * FIND AVAILABILITY FOR SELECTED DATE
   * ============================================================
   */

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

  /*
   * ============================================================
   * CONVERT HH:mm TO MINUTES
   * ============================================================
   */

  const timeToMinutes = (timeValue: string): number => {
    if (!timeValue) {
      return -1;
    }

    const [hours, minutes] = timeValue.split(":").map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return -1;
    }

    return hours * 60 + minutes;
  };

  /*
   * ============================================================
   * CHECK WHETHER THE ENTIRE SESSION FITS
   * ============================================================
   *
   * This is better than only checking the START time.
   *
   * Example:
   *
   * Availability:
   * 10:00 - 11:00
   *
   * Selected:
   * 10:30
   *
   * 60-minute session
   *
   * This must be rejected because the session would end at
   * 11:30.
   */

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

  /*
   * ============================================================
   * HUMAN-READABLE AVAILABILITY
   * ============================================================
   */

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

  /*
   * ============================================================
   * SESSION OPTIONS TEXT
   * ============================================================
   */

  const sessionOptionsErrorMessage =
    sessionOptionsError instanceof Error
      ? sessionOptionsError.message
      : "Failed to load session options.";

  /*
   * ============================================================
   * SUBMIT STEP 1
   * ============================================================
   */

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /*
     * Session option is required.
     */
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

    /*
     * Make sure the WHOLE session fits inside availability.
     */
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

  /*
   * ============================================================
   * CONFIRM SCHEDULING
   * ============================================================
   */

  const handleConfirm = async () => {
    if (!selectedSessionOption) {
      alert("Please select a session option.");
      setIsConfirming(false);
      return;
    }

    const scheduledAt = new Date(`${date}T${time}`);

    /*
     * Validate again before sending to backend.
     */

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
      /*
       * IMPORTANT:
       *
       * We send ONLY:
       *
       * - swapId
       * - sessionOptionId
       * - scheduledAt
       *
       * The backend/RPC determines the real duration and
       * token rate from the mentor's session option.
       */
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

  /*
   * ============================================================
   * FORMATTED DATE
   * ============================================================
   */

  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString()
    : "";

  /*
   * ============================================================
   * DISABLE TIME
   * ============================================================
   */

  const isTimeDisabled =
    !date ||
    isLoadingAvailability ||
    selectedAvailability.length === 0 ||
    !selectedSessionOption;

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        {/* ================================================== */}
        {/* HEADER */}
        {/* ================================================== */}

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              {isConfirming ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Calendar className="h-5 w-5" />
              )}

              <h2 className="text-xl font-semibold">
                {isConfirming ? "Confirm Session" : "Schedule Session"}
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              {isConfirming
                ? "Review your session details before confirming."
                : `Schedule your ${skillName} session.`}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={scheduleSession.isPending}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ================================================== */}
        {/* STEP 1 */}
        {/* ================================================== */}

        {!isConfirming && (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* ================================================= */}
            {/* SESSION OPTIONS */}
            {/* ================================================= */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Choose a session
              </label>

              {isLoadingSessionOptions && (
                <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading mentor session options...
                </div>
              )}

              {!isLoadingSessionOptions && isSessionOptionsError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                  {sessionOptionsErrorMessage}
                </div>
              )}

              {!isLoadingSessionOptions &&
                !isSessionOptionsError &&
                sessionOptions.length === 0 && (
                  <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
                    This mentor has not created any active session options for
                    this skill yet.
                  </div>
                )}

              {!isLoadingSessionOptions &&
                !isSessionOptionsError &&
                sessionOptions.length > 0 && (
                  <div className="space-y-3">
                    {sessionOptions.map((option: BookingSessionOption) => {
                      const isSelected = selectedSessionOptionId === option.id;

                      return (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedSessionOptionId(option.id)}
                          className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
                            isSelected
                              ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-100"
                              : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                isSelected
                                  ? "bg-indigo-600 text-white"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              <Clock className="h-5 w-5" />
                            </div>

                            <div>
                              <p className="font-semibold text-gray-900">
                                {option.duration_minutes} minutes
                              </p>

                              <p className="text-xs text-gray-500">
                                Mentor-defined session
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 font-semibold text-indigo-600">
                            <Coins className="h-4 w-4" />

                            {option.token_rate}

                            <span className="font-normal text-gray-500">
                              tokens
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
            </div>

            {/* ================================================= */}
            {/* SELECTED OPTION SUMMARY */}
            {/* ================================================= */}

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

            {/* ================================================= */}
            {/* AVAILABILITY LOADING */}
            {/* ================================================= */}

            {isLoadingAvailability && (
              <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading mentor availability...
              </div>
            )}

            {/* ================================================= */}
            {/* AVAILABILITY ERROR */}
            {/* ================================================= */}

            {!isLoadingAvailability && availabilityError && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {availabilityError}
              </div>
            )}

            {/* ================================================= */}
            {/* DATE */}
            {/* ================================================= */}

            <div>
              <label
                htmlFor="session-date"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Date
              </label>

              <input
                id="session-date"
                type="date"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                  setTime("");
                  setIsConfirming(false);
                }}
                min={today}
                disabled={isLoadingAvailability}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black disabled:bg-gray-100"
                required
              />
            </div>

            {/* ================================================= */}
            {/* SELECTED DAY AVAILABILITY */}
            {/* ================================================= */}

            {date && !isLoadingAvailability && (
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

            {/* ================================================= */}
            {/* TIME */}
            {/* ================================================= */}

            <div>
              <label
                htmlFor="session-time"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Start time
              </label>

              <input
                id="session-time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                disabled={isTimeDisabled}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black disabled:bg-gray-100"
                required
              />

              {date &&
                selectedAvailability.length > 0 &&
                selectedSessionOption && (
                  <p className="mt-2 text-xs text-gray-500">
                    Choose a start time where the full{" "}
                    {selectedSessionOption.duration_minutes}
                    -minute session fits within the mentor&apos;s availability.
                  </p>
                )}
            </div>

            {/* ================================================= */}
            {/* BUTTONS */}
            {/* ================================================= */}

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

        {/* ================================================== */}
        {/* STEP 2 - CONFIRM */}
        {/* ================================================== */}

        {isConfirming && (
          <div className="mt-6 space-y-5">
            {/* Session details */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-4 font-semibold">Session Details</h3>

              <div className="space-y-3 text-sm">
                {/* Skill */}
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Skill</span>

                  <span className="text-right font-medium">{skillName}</span>
                </div>

                {/* Duration */}
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Duration</span>

                  <span className="font-medium">
                    {selectedSessionOption?.duration_minutes} minutes
                  </span>
                </div>

                {/* Tokens */}
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Token cost</span>

                  <span className="font-bold text-indigo-600">
                    {selectedSessionOption?.token_rate} tokens
                  </span>
                </div>

                {/* Date */}
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Date</span>

                  <span className="font-medium">{formattedDate}</span>
                </div>

                {/* Time */}
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Start time</span>

                  <span className="font-medium">{formatTime(time)}</span>
                </div>

                {/* Availability */}
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Availability</span>

                  <span className="text-right font-medium">
                    {availabilityText}
                  </span>
                </div>
              </div>
            </div>

            {/* Important note */}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
              The mentor&apos;s selected session option determines the duration
              and token cost. The booking request will use this session option.
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsConfirming(false)}
                disabled={scheduleSession.isPending}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50 disabled:opacity-50"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                disabled={scheduleSession.isPending || !selectedSessionOption}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {scheduleSession.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Confirm & Schedule
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

/**
 * ============================================================
 * FORMAT HH:mm
 * ============================================================
 *
 * 09:05 -> 9:05 AM
 * 13:30 -> 1:30 PM
 */
const formatTime = (time: string) => {
  if (!time) {
    return "";
  }

  const [hours, minutes] = time.split(":").map(Number);

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

export default ScheduleSessionModal;
