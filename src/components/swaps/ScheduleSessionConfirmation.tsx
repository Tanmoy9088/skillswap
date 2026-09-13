import { CheckCircle2, Loader2 } from "lucide-react";

import type { BookingSessionOption } from "@/types/types/swaps";

interface ScheduleSessionConfirmationProps {
  skillName: string;
  selectedSessionOption: BookingSessionOption | undefined;
  formattedDate: string;
  time: string;
  availabilityText: string;
  isPending: boolean;
  onBack: () => void;
  onConfirm: () => void;
  formatTime: (time: string) => string;
}

const ScheduleSessionConfirmation = ({
  skillName,
  selectedSessionOption,
  formattedDate,
  time,
  availabilityText,
  isPending,
  onBack,
  onConfirm,
  formatTime,
}: ScheduleSessionConfirmationProps) => {
  return (
    <div className="mt-6 space-y-5">
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-4 font-semibold">Session Details</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Skill</span>
            <span className="text-right font-medium">{skillName}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Duration</span>
            <span className="font-medium">
              {selectedSessionOption?.duration_minutes} minutes
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Token cost</span>
            <span className="font-bold text-indigo-600">
              {selectedSessionOption?.token_rate} tokens
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Date</span>
            <span className="font-medium">{formattedDate}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Start time</span>
            <span className="font-medium">{formatTime(time)}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Availability</span>
            <span className="text-right font-medium">{availabilityText}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-700">
        The mentor&apos;s selected session option determines the duration and
        token cost. The booking request will use this session option.
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isPending}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isPending || !selectedSessionOption}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
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
  );
};

export default ScheduleSessionConfirmation;
