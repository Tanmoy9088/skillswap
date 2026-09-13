import { Clock } from "lucide-react";

interface BookingTimeSelectorProps {
  selectedDate: string;
  selectedTime: string;
  durationMinutes: number;
  availableTimes: string[];
  formatTime: (time: string) => string;
  onTimeChange: (time: string) => void;
}

export default function BookingTimeSelector({
  selectedDate,
  selectedTime,
  durationMinutes,
  availableTimes,
  formatTime,
  onTimeChange,
}: BookingTimeSelectorProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
          <Clock className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Select Time</h3>

          <p className="text-sm text-gray-500">
            Session length: {durationMinutes} minutes.
          </p>
        </div>
      </div>

      {!selectedDate ? (
        <div className="mt-6 rounded-xl bg-gray-50 p-5 text-center text-sm text-gray-500">
          Select a date first to see available times.
        </div>
      ) : availableTimes.length === 0 ? (
        <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-5">
          <p className="text-sm font-medium text-yellow-800">
            No available start times for this date.
          </p>

          <p className="mt-1 text-xs text-yellow-700">
            Choose another date when your mentor has enough availability for the
            full {durationMinutes}-minute session.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {availableTimes.map((time) => {
            const isSelected = selectedTime === time;

            return (
              <button
                key={time}
                type="button"
                onClick={() => onTimeChange(time)}
                className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                  isSelected
                    ? "border-[#193B75] bg-[#193B75] text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {formatTime(time)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
