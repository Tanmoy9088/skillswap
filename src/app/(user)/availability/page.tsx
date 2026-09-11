"use client";

import { useState } from "react";
import {
  CalendarDays,
  Check,
  Clock3,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { useMentorAvailability } from "@/hooks/mentors/useMentorAvailability";

const DAYS = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

const formatTime = (time: string) => {
  const [hoursString, minutes] = time.split(":");
  const hours = Number(hoursString);

  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${minutes} ${suffix}`;
};

const AvailabilityPage = () => {
  const {
    data: availability,
    isLoading,
    isError,
    error,
    createAvailability,
    isCreating,
    updateAvailabilityStatus,
    isUpdating,
    updateAvailability,
    isEditing,
    deleteAvailability,
    isDeleting,
  } = useMentorAvailability();

  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const [formError, setFormError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDay, setEditDay] = useState(1);
  const [editStartTime, setEditStartTime] = useState("09:00");
  const [editEndTime, setEditEndTime] = useState("17:00");

  const handleAddAvailability = async () => {
    setFormError(null);

    if (!startTime || !endTime) {
      setFormError("Please select both a start and end time.");
      return;
    }

    if (startTime >= endTime) {
      setFormError("End time must be after start time.");
      return;
    }

    try {
      await createAvailability({
        dayOfWeek,
        startTime,
        endTime,
      });

      setStartTime("09:00");
      setEndTime("17:00");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to add availability.",
      );
    }
  };

  const handleToggle = async (id: string, isActive: boolean) => {
    setFormError(null);

    try {
      await updateAvailabilityStatus({
        id,
        isActive: !isActive,
      });
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to update availability.",
      );
    }
  };

  const handleDelete = async (id: string) => {
    setFormError(null);

    try {
      await deleteAvailability(id);

      if (editingId === id) {
        setEditingId(null);
      }
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to delete availability.",
      );
    }
  };

  const handleEdit = (id: string, day: number, start: string, end: string) => {
    setFormError(null);
    setEditingId(id);
    setEditDay(day);
    setEditStartTime(start.slice(0, 5));
    setEditEndTime(end.slice(0, 5));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormError(null);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

    setFormError(null);

    if (!editStartTime || !editEndTime) {
      setFormError("Please select both a start and end time.");
      return;
    }

    if (editStartTime >= editEndTime) {
      setFormError("End time must be after start time.");
      return;
    }

    try {
      await updateAvailability({
        id: editingId,
        dayOfWeek: editDay,
        startTime: editStartTime,
        endTime: editEndTime,
      });

      setEditingId(null);
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Unable to update availability.",
      );
    }
  };

  const getDayName = (day: number) =>
    DAYS.find((item) => item.value === day)?.label ?? "Unknown";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <CalendarDays className="h-6 w-6" />
          </div>

          <p className="mt-6 text-sm font-semibold text-indigo-600">
            Mentor Settings
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#193B75] sm:text-4xl">
            Your Availability
          </h1>

          <p className="mt-2 max-w-2xl text-gray-500">
            Set the days and times when learners can schedule sessions with you.
          </p>
        </div>

        {/* Add Availability */}
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
            {/* Day */}
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
                onChange={(event) => setDayOfWeek(Number(event.target.value))}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                {DAYS.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Start */}
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
                onChange={(event) => setStartTime(event.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {/* End */}
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
                onChange={(event) => setEndTime(event.target.value)}
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
            onClick={handleAddAvailability}
            disabled={isCreating}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#193B75] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#102d5c] disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            <Plus className="h-4 w-4" />
            {isCreating ? "Adding..." : "Add Availability"}
          </button>
        </section>

        {/* Existing Availability */}
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
                {availability.map((item) => {
                  const isEditingRow = editingId === item.id;

                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border p-4 ${
                        item.is_active
                          ? "border-gray-200 bg-white"
                          : "border-gray-100 bg-gray-50 opacity-60"
                      }`}
                    >
                      {isEditingRow ? (
                        <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
                          {/* Edit Day */}
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
                              onChange={(event) =>
                                setEditDay(Number(event.target.value))
                              }
                              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            >
                              {DAYS.map((day) => (
                                <option key={day.value} value={day.value}>
                                  {day.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Edit Start */}
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
                              onChange={(event) =>
                                setEditStartTime(event.target.value)
                              }
                              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                          </div>

                          {/* Edit End */}
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
                              onChange={(event) =>
                                setEditEndTime(event.target.value)
                              }
                              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            />
                          </div>

                          {/* Edit Actions */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={handleSaveEdit}
                              disabled={isEditing}
                              className="inline-flex items-center gap-2 rounded-xl bg-[#193B75] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#102d5c] disabled:cursor-not-allowed disabled:bg-gray-300"
                            >
                              <Check className="h-4 w-4" />
                              {isEditing ? "Saving..." : "Save"}
                            </button>

                            <button
                              type="button"
                              onClick={handleCancelEdit}
                              disabled={isEditing}
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
                              <p className="font-bold text-gray-900">
                                {getDayName(item.day_of_week)}
                              </p>

                              <p className="mt-1 text-sm text-gray-500">
                                {formatTime(item.start_time)} –{" "}
                                {formatTime(item.end_time)}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Edit */}
                            <button
                              type="button"
                              onClick={() =>
                                handleEdit(
                                  item.id,
                                  item.day_of_week,
                                  item.start_time,
                                  item.end_time,
                                )
                              }
                              disabled={isEditing || isDeleting}
                              aria-label={`Edit ${getDayName(
                                item.day_of_week,
                              )} availability`}
                              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Pencil className="h-4 w-4" />
                            </button>

                            {/* Toggle */}
                            <button
                              type="button"
                              onClick={() =>
                                handleToggle(item.id, item.is_active)
                              }
                              disabled={isUpdating || isEditing}
                              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                                item.is_active
                                  ? "bg-green-50 text-green-700 hover:bg-green-100"
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              <Check className="h-4 w-4" />

                              {item.is_active ? "Active" : "Inactive"}
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              disabled={isDeleting || isEditing}
                              aria-label={`Delete ${getDayName(
                                item.day_of_week,
                              )} availability`}
                              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-400 transition hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
        </section>

        {/* Info */}
        <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <p className="text-sm leading-6 text-indigo-800">
            <span className="font-bold">How this works:</span> Learners will see
            scheduling times based on the active availability you add here. You
            remain in control of when learners can schedule sessions.
          </p>
        </div>
      </div>
    </main>
  );
};

export default AvailabilityPage;
