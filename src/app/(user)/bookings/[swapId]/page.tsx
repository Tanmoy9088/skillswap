"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import type { CalendarProps } from "react-calendar";
import { ArrowLeft, CalendarDays, Check, Clock3, Video } from "lucide-react";

import { useMySwaps } from "@/hooks/skills/useMySwap";
import { useMentorAvailabilityForBooking } from "@/hooks/mentors/useMentorAvailabilityForBooking";
import { scheduleSwapSession } from "@/lib/swapRequests";

import "react-calendar/dist/Calendar.css";

// const DAYS = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatDisplayDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

const formatTime = (time: string) => {
  const [hoursString, minutes] = time.split(":");
  const hours = Number(hoursString);

  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${minutes} ${suffix}`;
};

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
};

const minutesToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(remainingMinutes).padStart(
    2,
    "0",
  )}`;
};

const generateTimeSlots = (startTime: string, endTime: string) => {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  const slots: string[] = [];

  for (let current = start; current + 60 <= end; current += 60) {
    slots.push(minutesToTime(current));
  }

  return slots;
};

const ScheduleBookingPage = () => {
  const params = useParams<{ swapId: string }>();
  const router = useRouter();

  const swapId = params.swapId;

  const {
    data: swaps,
    isLoading: swapsLoading,
    isError: swapsError,
  } = useMySwaps();

  const swap = swaps?.find((item) => item.id === swapId);

  const {
    data: availability,
    isLoading: availabilityLoading,
    isError: availabilityError,
    error: availabilityQueryError,
  } = useMentorAvailabilityForBooking(swap?.mentor_auth_user_id);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);

  /*
   * The calendar can show the next 30 days.
   * Only days matching the mentor's active weekly availability are enabled.
   */
  const availableWeekdays = useMemo(() => {
    if (!availability || availability.length === 0) {
      return new Set<number>();
    }

    return new Set(availability.map((item) => item.day_of_week));
  }, [availability]);

  const today = useMemo(() => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    return date;
  }, []);

  const maxCalendarDate = useMemo(() => {
    const date = new Date(today);

    date.setDate(date.getDate() + 30);

    return date;
  }, [today]);

  /*
   * Get the availability windows for the selected date.
   */
  const selectedDateAvailability = useMemo(() => {
    if (!selectedDate || !availability) {
      return [];
    }

    const date = new Date(`${selectedDate}T00:00:00`);
    const dayOfWeek = date.getDay();

    return availability.filter((item) => item.day_of_week === dayOfWeek);
  }, [selectedDate, availability]);

  /*
   * Generate one-hour slots from the mentor's availability.
   */
  const availableTimeSlots = useMemo(() => {
    const slots = new Set<string>();

    selectedDateAvailability.forEach((item) => {
      const generatedSlots = generateTimeSlots(item.start_time, item.end_time);

      generatedSlots.forEach((slot) => {
        slots.add(slot);
      });
    });

    return Array.from(slots).sort();
  }, [selectedDateAvailability]);

  const selectedDateObject = selectedDate
    ? new Date(`${selectedDate}T00:00:00`)
    : null;

  const handleSelectDate: CalendarProps["onChange"] = (value) => {
    if (!(value instanceof Date)) {
      return;
    }

    setSelectedDate(formatDate(value));
    setSelectedTime(null);
    setScheduleError(null);
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    setScheduleError(null);
  };

  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime || !swap) {
      return;
    }

    setIsScheduling(true);
    setScheduleError(null);

    try {
      const scheduledDate = new Date(`${selectedDate}T${selectedTime}:00`);

      await scheduleSwapSession(swap.id, scheduledDate.toISOString());

      router.push("/bookings");
    } catch (error) {
      setScheduleError(
        error instanceof Error
          ? error.message
          : "Unable to schedule the session.",
      );
    } finally {
      setIsScheduling(false);
    }
  };

  /* ================= LOADING ================= */

  if (swapsLoading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-5 w-32 rounded bg-gray-200" />

          <div className="mt-8 h-10 w-72 rounded bg-gray-200" />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="h-175 rounded-3xl bg-white" />
            <div className="h-125 rounded-3xl bg-white" />
          </div>
        </div>
      </main>
    );
  }

  /* ================= ERROR ================= */

  if (swapsError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">
            Unable to load booking
          </h1>

          <p className="mt-2 text-sm text-gray-500">Please try again later.</p>

          <Link
            href="/bookings"
            className="mt-5 inline-flex rounded-xl bg-[#193B75] px-5 py-3 text-sm font-semibold text-white"
          >
            Back to My Bookings
          </Link>
        </div>
      </main>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!swap) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900">Booking not found</h1>

          <p className="mt-2 text-sm text-gray-500">
            We couldn&apos;t find this booking.
          </p>

          <Link
            href="/bookings"
            className="mt-5 inline-flex rounded-xl bg-[#193B75] px-5 py-3 text-sm font-semibold text-white"
          >
            Back to My Bookings
          </Link>
        </div>
      </main>
    );
  }

  /* ================= STATUS ================= */

  if (swap.status !== "accepted") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
            <CalendarDays className="h-8 w-8 text-gray-400" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-gray-900">
            This booking cannot be scheduled
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            This booking is currently{" "}
            <span className="font-semibold text-gray-700">{swap.status}</span>.
          </p>

          <Link
            href="/bookings"
            className="mt-6 inline-flex rounded-xl bg-[#193B75] px-5 py-3 text-sm font-semibold text-white"
          >
            Back to My Bookings
          </Link>
        </div>
      </main>
    );
  }

  /* ================= AVAILABILITY LOADING ================= */

  if (availabilityLoading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/bookings"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Bookings
          </Link>

          <div className="mt-8 animate-pulse">
            <div className="h-4 w-40 rounded bg-gray-200" />
            <div className="mt-3 h-10 w-72 rounded bg-gray-200" />

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
              <div className="space-y-6">
                <div className="h-40 rounded-3xl bg-white" />
                <div className="h-64 rounded-3xl bg-white" />
                <div className="h-64 rounded-3xl bg-white" />
              </div>

              <div className="h-125 rounded-3xl bg-white" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ================= AVAILABILITY ERROR ================= */

  if (availabilityError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold text-gray-900">
            Unable to load mentor availability
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {availabilityQueryError instanceof Error
              ? availabilityQueryError.message
              : "Please try again later."}
          </p>

          <Link
            href="/bookings"
            className="mt-6 inline-flex rounded-xl bg-[#193B75] px-5 py-3 text-sm font-semibold text-white"
          >
            Back to My Bookings
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back */}
        <Link
          href="/bookings"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-[#193B75]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Bookings
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="text-sm font-semibold text-indigo-600">
            Complete your booking
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#193B75] sm:text-4xl">
            Schedule Your Session
          </h1>

          <p className="mt-2 max-w-2xl text-gray-500">
            Choose a date and time based on{" "}
            <span className="font-semibold text-gray-700">
              {swap.mentor_name}
            </span>
            &apos;s availability.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* ================= MAIN ================= */}

          <section className="space-y-6">
            {/* Session Type */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Video className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">Session Type</h2>

                  <p className="text-sm text-gray-500">
                    Select how you&apos;d like to learn
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex w-full items-center justify-between rounded-2xl border-2 border-indigo-600 bg-indigo-50 p-4">
                  <div>
                    <p className="font-bold text-gray-900">1:1 Mentorship</p>

                    <p className="mt-1 text-sm text-gray-500">
                      Private session with your mentor
                    </p>
                  </div>

                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white">
                    <Check className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <CalendarDays className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">Select Date</h2>

                  <p className="text-sm text-gray-500">
                    Choose a day your mentor is available
                  </p>
                </div>
              </div>

              {availableWeekdays.size === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-gray-200 p-8 text-center">
                  <CalendarDays className="mx-auto h-8 w-8 text-gray-300" />

                  <p className="mt-3 font-semibold text-gray-700">
                    No dates available
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    This mentor hasn&apos;t added any active availability yet.
                  </p>
                </div>
              ) : (
                <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
                  <Calendar
                    value={selectedDateObject}
                    onChange={handleSelectDate}
                    minDate={today}
                    maxDate={maxCalendarDate}
                    minDetail="month"
                    next2Label={null}
                    prev2Label={null}
                    tileDisabled={({ date, view }) => {
                      if (view !== "month") {
                        return false;
                      }

                      return !availableWeekdays.has(date.getDay());
                    }}
                    tileClassName={({ date, view }) => {
                      if (view !== "month") {
                        return undefined;
                      }

                      if (availableWeekdays.has(date.getDay())) {
                        return "mentor-available-date";
                      }

                      return "mentor-unavailable-date";
                    }}
                    className="skillswap-calendar"
                  />
                </div>
              )}
            </div>

            {/* Time */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Clock3 className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="font-bold text-gray-900">Select Time</h2>

                  <p className="text-sm text-gray-500">
                    {selectedDateObject
                      ? `Available times for ${formatDisplayDate(
                          selectedDateObject,
                        )}`
                      : "Select a date first"}
                  </p>
                </div>
              </div>

              {!selectedDate ? (
                <div className="mt-6 rounded-2xl border border-dashed border-gray-200 p-8 text-center">
                  <CalendarDays className="mx-auto h-8 w-8 text-gray-300" />

                  <p className="mt-3 text-sm font-medium text-gray-500">
                    Select a date to see available times.
                  </p>
                </div>
              ) : availableTimeSlots.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-gray-200 p-8 text-center">
                  <Clock3 className="mx-auto h-8 w-8 text-gray-300" />

                  <p className="mt-3 text-sm font-medium text-gray-500">
                    No times available for this date.
                  </p>
                </div>
              ) : (
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {availableTimeSlots.map((time) => {
                    const isSelected = selectedTime === time;

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleSelectTime(time)}
                        className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-600 text-white"
                            : "border-gray-200 bg-white text-gray-700 hover:border-indigo-300 hover:bg-gray-50"
                        }`}
                      >
                        {formatTime(time)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Note */}
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-bold text-gray-900">Note to Mentor</h2>

              <p className="mt-1 text-sm text-gray-500">
                Let your mentor know what you&apos;d like to focus on.
              </p>

              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={5}
                placeholder="What would you like to learn or discuss?"
                className="mt-5 w-full resize-none rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </section>

          {/* ================= SUMMARY ================= */}

          <aside className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-xl font-bold text-[#193B75]">
                Booking Summary
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Mentor
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {swap.mentor_name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Skill
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {swap.skill_name}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Session Type
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    1:1 Mentorship
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Date
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedDateObject
                      ? formatDisplayDate(selectedDateObject)
                      : "Not selected"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Time
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedTime ? formatTime(selectedTime) : "Not selected"}
                  </p>
                </div>
              </div>

              <div className="my-6 border-t border-gray-100" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500">Token Cost</p>

                  <p className="mt-1 text-3xl font-bold text-[#193B75]">
                    {Number(swap.token_rate ?? 0).toLocaleString()}
                  </p>
                </div>

                <span className="mb-1 font-semibold text-indigo-600">
                  Tokens
                </span>
              </div>

              {scheduleError && (
                <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">
                  {scheduleError}
                </div>
              )}

              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={!selectedDate || !selectedTime || isScheduling}
                className="mt-6 w-full rounded-2xl bg-[#193B75] px-5 py-4 text-sm font-bold text-white transition hover:bg-[#102d5c] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
              >
                {isScheduling ? "Scheduling..." : "Confirm Booking"}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-gray-400">
                Your session will be scheduled with your mentor once confirmed.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ScheduleBookingPage;
