import { CalendarDays } from "lucide-react";

interface BookingDateSelectorProps {
  selectedDate: string;
  minDate: string;
  onDateChange: (date: string) => void;
}

export default function BookingDateSelector({
  selectedDate,
  minDate,
  onDateChange,
}: BookingDateSelectorProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <CalendarDays className="h-5 w-5" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Select Date</h3>

          <p className="text-sm text-gray-500">
            Choose a day when your mentor is available.
          </p>
        </div>
      </div>

      <label className="mt-6 block">
        <span className="mb-2 block text-sm font-medium text-gray-700">
          Date
        </span>

        <input
          type="date"
          min={minDate}
          value={selectedDate}
          onChange={(event) => onDateChange(event.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#193B75] focus:ring-2 focus:ring-[#193B75]/10"
        />
      </label>
    </div>
  );
}
