"use client";

import { CalendarDays, Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";

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

type AvailabilityRowProps = {
  item: AvailabilityItem;
  days: Day[];
  isUpdating: boolean;
  isDeleting: boolean;
  onToggle: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
  ) => Promise<void>;
};

const formatTime = (time: string) => {
  const [hoursString, minutes] = time.split(":");
  const hours = Number(hoursString);

  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${minutes} ${suffix}`;
};

const AvailabilityRow = ({
  item,
  days,
  isUpdating,
  isDeleting,
  onToggle,
  onDelete,
  onUpdate,
}: AvailabilityRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDay, setEditDay] = useState(item.day_of_week);
  const [editStartTime, setEditStartTime] = useState(
    item.start_time.slice(0, 5),
  );
  const [editEndTime, setEditEndTime] = useState(item.end_time.slice(0, 5));
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const dayName =
    days.find((day) => day.value === item.day_of_week)?.label ?? "Unknown";

  const handleEdit = () => {
    setError(null);
    setEditDay(item.day_of_week);
    setEditStartTime(item.start_time.slice(0, 5));
    setEditEndTime(item.end_time.slice(0, 5));
    setIsEditing(true);
  };

  const handleCancel = () => {
    setError(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setError(null);

    if (!editStartTime || !editEndTime) {
      setError("Please select both a start and end time.");
      return;
    }

    if (editStartTime >= editEndTime) {
      setError("End time must be after start time.");
      return;
    }

    try {
      setIsSaving(true);

      await onUpdate(item.id, editDay, editStartTime, editEndTime);

      setIsEditing(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update availability.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border p-4 ${
        item.is_active
          ? "border-gray-200 bg-white"
          : "border-gray-100 bg-gray-50 opacity-60"
      }`}
    >
      {isEditing ? (
        <div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor={`edit-day-${item.id}`}
                className="mb-2 block text-xs font-semibold text-gray-600"
              >
                Day
              </label>

              <select
                id={`edit-day-${item.id}`}
                value={editDay}
                onChange={(event) => setEditDay(Number(event.target.value))}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
                htmlFor={`edit-start-${item.id}`}
                className="mb-2 block text-xs font-semibold text-gray-600"
              >
                Start Time
              </label>

              <input
                id={`edit-start-${item.id}`}
                type="time"
                value={editStartTime}
                onChange={(event) => setEditStartTime(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label
                htmlFor={`edit-end-${item.id}`}
                className="mb-2 block text-xs font-semibold text-gray-600"
              >
                End Time
              </label>

              <input
                id={`edit-end-${item.id}`}
                type="time"
                value={editEndTime}
                onChange={(event) => setEditEndTime(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#193B75] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#102d5c] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              <Check className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                item.is_active
                  ? "bg-indigo-50 text-indigo-600"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <CalendarDays className="h-5 w-5" />
            </div>

            <div>
              <p className="font-bold text-gray-900">{dayName}</p>

              <p className="mt-1 text-sm text-gray-500">
                {formatTime(item.start_time)} – {formatTime(item.end_time)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleEdit}
              disabled={isDeleting}
              aria-label={`Edit ${dayName} availability`}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onToggle(item.id, item.is_active)}
              disabled={isUpdating || isDeleting}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                item.is_active
                  ? "bg-green-50 text-green-700 hover:bg-green-100"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <Check className="h-4 w-4" />
              {item.is_active ? "Active" : "Inactive"}
            </button>

            <button
              type="button"
              onClick={() => onDelete(item.id)}
              disabled={isDeleting}
              aria-label={`Delete ${dayName} availability`}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailabilityRow;
