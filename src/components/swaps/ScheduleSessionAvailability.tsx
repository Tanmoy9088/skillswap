import { Clock, Loader2 } from "lucide-react";

interface AvailabilitySlot {
  id: string;
  mentor_auth_user_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
}

interface ScheduleSessionAvailabilityProps {
  date: string;
  time: string;
  today: string;
  selectedAvailability: AvailabilitySlot[];
  availabilityText: string;
  isLoadingAvailability: boolean;
  availabilityError: string | null;
  isTimeDisabled: boolean;
  durationMinutes?: number;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const ScheduleSessionAvailability = ({
  date,
  time,
  today,
  selectedAvailability,
  availabilityText,
  isLoadingAvailability,
  availabilityError,
  isTimeDisabled,
  durationMinutes,
  onDateChange,
  onTimeChange,
}: ScheduleSessionAvailabilityProps) => {
  return (
    <>
      {isLoadingAvailability && (
        <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading mentor availability...
        </div>
      )}

      {!isLoadingAvailability && availabilityError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {availabilityError}
        </div>
      )}

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
          onChange={(event) => onDateChange(event.target.value)}
          min={today}
          disabled={isLoadingAvailability}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black disabled:bg-gray-100"
          required
        />
      </div>

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
          onChange={(event) => onTimeChange(event.target.value)}
          disabled={isTimeDisabled}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-black disabled:bg-gray-100"
          required
        />

        {date && selectedAvailability.length > 0 && durationMinutes && (
          <p className="mt-2 text-xs text-gray-500">
            Choose a start time where the full {durationMinutes}-minute session
            fits within the mentor&apos;s availability.
          </p>
        )}
      </div>
    </>
  );
};

export default ScheduleSessionAvailability;
