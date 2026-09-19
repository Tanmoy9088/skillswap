"use client";

import { CalendarDays, Clock3 } from "lucide-react";
import AvailabilityRow from "./AvailabilityRow";

type Day = {
  value: number;
  label: string;
};

type AvailabilityItem = {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
};

type AvailabilityListProps = {
  availability: AvailabilityItem[] | undefined;
  days: Day[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isUpdating: boolean;
  isDeleting: boolean;
  onToggle: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string
  ) => Promise<void>;
};

const AvailabilityList = ({
  availability,
  days,
  isLoading,
  isError,
  error,
  isUpdating,
  isDeleting,
  onToggle,
  onDelete,
  onUpdate,
}: AvailabilityListProps) => {
  return (
    <section className="mt-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
          <Clock3 className="h-5 w-5" />
        </div>

        <div>
          <h2 className="font-bold text-gray-900">Your Schedule</h2>

          <p className="text-sm text-gray-500">
            Manage your current availability.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="mt-6 space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      )}

      {isError && (
        <div className="mt-6 rounded-2xl bg-red-50 p-5 text-sm text-red-600">
          {error instanceof Error
            ? error.message
            : "Unable to load your availability."}
        </div>
      )}

      {!isLoading &&
        !isError &&
        availability &&
        availability.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-gray-200 p-10 text-center">
            <CalendarDays className="mx-auto h-9 w-9 text-gray-300" />

            <p className="mt-3 font-semibold text-gray-700">
              No availability added yet
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Add your first available day above.
            </p>
          </div>
        )}

      {!isLoading &&
        !isError &&
        availability &&
        availability.length > 0 && (
          <div className="mt-6 space-y-3">
            {availability.map((item) => (
              <AvailabilityRow
                key={item.id}
                item={item}
                days={days}
                isUpdating={isUpdating}
                isDeleting={isDeleting}
                onToggle={onToggle}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
          </div>
        )}
    </section>
  );
};

export default AvailabilityList;