"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";

import { useScheduleSwapSession } from "@/hooks/skills/useScheduleSwapSession";

interface ScheduleSessionModalProps {
  swapId: string;
  skillName: string;
  onClose: () => void;
}

const ScheduleSessionModal = ({
  swapId,
  skillName,
  onClose,
}: ScheduleSessionModalProps) => {
  const scheduleSession = useScheduleSwapSession();

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [currentTime] = useState(() => Date.now());
  const [isConfirming, setIsConfirming] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!date || !time) {
      alert("Please select a date and time.");
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
    const scheduledAt = new Date(`${date}T${time}`);

    try {
      await scheduleSession.mutateAsync({
        swapId,
        scheduledAt: scheduledAt.toISOString(),
      });

      alert("Session scheduled successfully.");
      onClose();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to schedule session.",
      );
    }
  };

  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString()
    : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              {isConfirming ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <Calendar className="h-5 w-5" />
              )}

              <h2 className="text-xl font-semibold">
                {isConfirming
                  ? "Confirm Session"
                  : "Schedule Session"}
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
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step 1: Date and Time */}
        {!isConfirming && (
          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-5"
          >
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
                onChange={(event) => setDate(event.target.value)}
                min={today}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                required
              />
            </div>

            <div>
              <label
                htmlFor="session-time"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Time
              </label>

              <input
                id="session-time"
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={scheduleSession.isPending}
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={scheduleSession.isPending}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                <Calendar className="h-4 w-4" />
                Review
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Confirmation */}
        {isConfirming && (
          <div className="mt-6 space-y-5">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-4 font-semibold">
                Session Details
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Skill
                  </span>

                  <span className="text-right font-medium">
                    {skillName}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Date
                  </span>

                  <span className="font-medium">
                    {formattedDate}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Time
                  </span>

                  <span className="font-medium">
                    {time}
                  </span>
                </div>
              </div>
            </div>

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
                disabled={scheduleSession.isPending}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {scheduleSession.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Confirming...
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

export default ScheduleSessionModal;