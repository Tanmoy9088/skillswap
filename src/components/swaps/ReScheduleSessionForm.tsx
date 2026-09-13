import { Calendar, Clock } from "lucide-react";

import type { Availability } from "./rescheduleSessionUtils";

interface RescheduleSessionFormProps {
  date: string;
  time: string;
  note: string;
  today: string;
  selectedAvailability: Availability[];
  availabilityText: string;
  isTimeDisabled: boolean;
  isPending: boolean;
  isLoadingAvailability: boolean;
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNoteChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCancel: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RescheduleSessionForm = ({
  date,
  time,
  note,
  today,
  selectedAvailability,
  availabilityText,
  isTimeDisabled,
  isPending,
  isLoadingAvailability,
  onDateChange,
  onTimeChange,
  onNoteChange,
  onCancel,
  onSubmit,
}: RescheduleSessionFormProps) => {
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5">
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
          min={today}
          disabled={isPending}
          onChange={onDateChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
          required
        />
      </div>

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
          disabled={isTimeDisabled || isPending}
          onChange={onTimeChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
          required
        />

        {date && selectedAvailability.length > 0 && (
          <p className="mt-2 text-xs text-gray-500">
            Choose a time between {availabilityText}.
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="reschedule-note"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Note <span className="font-normal text-gray-400">(optional)</span>
        </label>

        <textarea
          id="reschedule-note"
          value={note}
          onChange={onNoteChange}
          rows={3}
          maxLength={500}
          placeholder="Example: I am available at this time instead."
          disabled={isPending}
          className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-black disabled:bg-gray-100"
        />

        <p className="mt-1 text-right text-xs text-gray-400">
          {note.length}/500
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isPending || isLoadingAvailability}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Calendar className="h-4 w-4" />
          Review
        </button>
      </div>
    </form>
  );
};

export default RescheduleSessionForm;
