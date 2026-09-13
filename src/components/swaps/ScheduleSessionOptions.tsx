import { Clock, Coins, Loader2 } from "lucide-react";

import type { BookingSessionOption } from "@/types/types/swaps";

interface ScheduleSessionOptionsProps {
  sessionOptions: BookingSessionOption[];
  selectedSessionOptionId: string;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  onSelect: (optionId: string) => void;
}

const ScheduleSessionOptions = ({
  sessionOptions,
  selectedSessionOptionId,
  isLoading,
  isError,
  errorMessage,
  onSelect,
}: ScheduleSessionOptionsProps) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        Choose a session
      </label>

      {isLoading && (
        <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading mentor session options...
        </div>
      )}

      {!isLoading && isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      {!isLoading && !isError && sessionOptions.length === 0 && (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
          This mentor has not created any active session options for this skill
          yet.
        </div>
      )}

      {!isLoading && !isError && sessionOptions.length > 0 && (
        <div className="space-y-3">
          {sessionOptions.map((option) => {
            const isSelected = selectedSessionOptionId === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelect(option.id)}
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
                  <span className="font-normal text-gray-500">tokens</span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ScheduleSessionOptions;
