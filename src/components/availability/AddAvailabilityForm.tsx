"use client";

import { Plus } from "lucide-react";

type Day = {
  value: number;
  label: string;
};

type AddAvailabilityFormProps = {
  days: Day[];
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  formError: string | null;
  isCreating: boolean;
  onDayChange: (value: number) => void;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onSubmit: () => void;
};

const AddAvailabilityForm = ({
  days,
  dayOfWeek,
  startTime,
  endTime,
  formError,
  isCreating,
  onDayChange,
  onStartTimeChange,
  onEndTimeChange,
  onSubmit,
}: AddAvailabilityFormProps) => {
  return (
    <section className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Plus className="h-5 w-5" />
        </div>

        <div>
          <h2 className="font-bold text-gray-900">Add Availability</h2>

          <p className="text-sm text-gray-500">
            Choose when you are available for sessions.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div>
          <label
            htmlFor="day"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Day
          </label>

          <select
            id="day"
            value={dayOfWeek}
            onChange={(event) => onDayChange(Number(event.target.value))}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            {days.map((day) => (
              <option key={day.value} value={day.value}>
                {day.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="start-time"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Start Time
          </label>

          <input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(event) => onStartTimeChange(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label
            htmlFor="end-time"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            End Time
          </label>

          <input
            id="end-time"
            type="time"
            value={endTime}
            onChange={(event) => onEndTimeChange(event.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {formError && (
        <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {formError}
        </div>
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={isCreating}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#193B75] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#102d5c] disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <Plus className="h-4 w-4" />
        {isCreating ? "Adding..." : "Add Availability"}
      </button>
    </section>
  );
};

export default AddAvailabilityForm;