"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  Coins,
  GraduationCap,
  Loader2,
  Users,
} from "lucide-react";

import { useSwapById } from "@/hooks/skills/useSwapById";
import { useSessionOptions } from "@/hooks/skills/useSessionOptions";
import { useRequestScheduleSwap } from "@/hooks/skills/useScheduleSwapSession";

import { getMentorAvailability } from "@/lib/mentorAvailability";

import type { BookingSessionOption } from "@/types/types/swaps";

type AvailabilitySlot = {
  id?: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active?: boolean;
};

type BookingStep = 1 | 2;

/* ============================================================
   HELPERS
============================================================ */

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);

  return hours * 60 + minutes;
};

const formatTime = (time: string): string => {
  const [hours, minutes] = time.slice(0, 5).split(":").map(Number);

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const getDateInputValue = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const dateInputToLocalDate = (value: string): Date => {
  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const isFullSessionWithinSlot = (
  startTime: string,
  durationMinutes: number,
  slot: AvailabilitySlot,
): boolean => {
  const sessionStart = timeToMinutes(startTime);

  const sessionEnd = sessionStart + durationMinutes;

  const availabilityStart = timeToMinutes(slot.start_time);

  const availabilityEnd = timeToMinutes(slot.end_time);

  return sessionStart >= availabilityStart && sessionEnd <= availabilityEnd;
};

const generateTimeOptions = (
  selectedDate: Date,
  durationMinutes: number,
  availability: AvailabilitySlot[],
): string[] => {
  const dayOfWeek = selectedDate.getDay();

  const slotsForDay = availability.filter(
    (slot) => slot.day_of_week === dayOfWeek,
  );

  const result: string[] = [];

  for (const slot of slotsForDay) {
    const start = timeToMinutes(slot.start_time);

    const end = timeToMinutes(slot.end_time);

    /*
     * Generate times every 15 minutes.
     *
     * The complete session must fit inside the
     * mentor's availability window.
     */

    for (let current = start; current + durationMinutes <= end; current += 15) {
      const hours = Math.floor(current / 60);

      const minutes = current % 60;

      const formatted = `${String(hours).padStart(2, "0")}:${String(
        minutes,
      ).padStart(2, "0")}`;

      result.push(formatted);
    }
  }

  return [...new Set(result)].sort();
};

const isTimeStillAvailable = (
  selectedDate: Date,
  selectedTime: string,
  durationMinutes: number,
  availability: AvailabilitySlot[],
): boolean => {
  const dayOfWeek = selectedDate.getDay();

  const slotsForDay = availability.filter(
    (slot) => slot.day_of_week === dayOfWeek,
  );

  return slotsForDay.some((slot) =>
    isFullSessionWithinSlot(selectedTime, durationMinutes, slot),
  );
};

/* ============================================================
   PAGE
============================================================ */

export default function BookingPage() {
  const params = useParams();

  const swapId = params.swapId as string;

  const [step, setStep] = useState<BookingStep>(1);

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string>("");

  const [selectedTime, setSelectedTime] = useState<string>("");

  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);

  const [isAvailabilityLoading, setIsAvailabilityLoading] = useState(false);

  const [availabilityError, setAvailabilityError] = useState<string | null>(
    null,
  );

  const [isSuccess, setIsSuccess] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  const {
    data: swap,
    isPending: isSwapPending,
    isError: isSwapError,
    error: swapError,
  } = useSwapById(swapId);

  const {
    data: sessionOptions = [],
    isPending: isOptionsPending,
    isError: isOptionsError,
    error: optionsError,
  } = useSessionOptions(swap?.skill_id ?? "");

  const requestScheduleMutation = useRequestScheduleSwap();

  /* ============================================================
     SELECTED SESSION OPTION
  ============================================================ */

  const selectedOption = useMemo<BookingSessionOption | null>(() => {
    if (!selectedOptionId) {
      return null;
    }

    return (
      sessionOptions.find((option) => option.id === selectedOptionId) ?? null
    );
  }, [selectedOptionId, sessionOptions]);

  /* ============================================================
     LOAD MENTOR AVAILABILITY
  ============================================================ */

  useEffect(() => {
    if (!swap?.mentor_auth_user_id) {
      return;
    }

    let cancelled = false;

    const loadAvailability = async () => {
      setIsAvailabilityLoading(true);

      setAvailabilityError(null);

      try {
        const data = await getMentorAvailability(swap.mentor_auth_user_id);

        if (cancelled) {
          return;
        }

        setAvailability((data ?? []) as AvailabilitySlot[]);
      } catch (error) {
        if (cancelled) {
          return;
        }

        setAvailabilityError(
          error instanceof Error
            ? error.message
            : "Unable to load mentor availability.",
        );
      } finally {
        if (!cancelled) {
          setIsAvailabilityLoading(false);
        }
      }
    };

    loadAvailability();

    return () => {
      cancelled = true;
    };
  }, [swap?.mentor_auth_user_id]);

  /* ============================================================
     AVAILABLE TIME OPTIONS
  ============================================================ */

  const availableTimes = useMemo(() => {
    if (!selectedDate || !selectedOption) {
      return [];
    }

    const date = dateInputToLocalDate(selectedDate);

    return generateTimeOptions(
      date,
      selectedOption.duration_minutes,
      availability,
    );
  }, [selectedDate, selectedOption, availability]);

  /* ============================================================
     RESET TIME WHEN DATE / SESSION CHANGES
  ============================================================ */

  /* ============================================================
     LOADING SWAP
  ============================================================ */

  if (isSwapPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FD]">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading booking...
        </div>
      </main>
    );
  }

  /* ============================================================
     SWAP ERROR
  ============================================================ */

  if (isSwapError || !swap) {
    return (
      <main className="min-h-screen bg-[#F7F8FD] px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-6">
          <h1 className="font-semibold text-red-800">Unable to load booking</h1>

          <p className="mt-2 text-sm text-red-600">
            {swapError instanceof Error
              ? swapError.message
              : "Swap not found or you do not have access to it."}
          </p>
        </div>
      </main>
    );
  }

  /* ============================================================
     SUCCESS
  ============================================================ */

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-[#F7F8FD] px-6 py-10">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-green-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              Session Request Sent
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-gray-600">
              {successMessage ||
                "Your mentor has received your session request. You will be notified when they respond."}
            </p>

            <div className="mx-auto mt-8 max-w-md rounded-2xl bg-gray-50 p-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Booking
              </p>

              <p className="mt-2 font-semibold text-gray-900">
                {swap.skill_name}
              </p>

              {selectedOption && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-400">Duration</p>

                    <p className="font-medium text-gray-900">
                      {selectedOption.duration_minutes} minutes
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Token Cost</p>

                    <p className="font-medium text-gray-900">
                      {selectedOption.token_rate}{" "}
                      {selectedOption.token_rate === 1 ? "token" : "tokens"}
                    </p>
                  </div>
                </div>
              )}

              {selectedDate && selectedTime && (
                <div className="mt-4">
                  <p className="text-xs text-gray-400">Requested Time</p>

                  <p className="font-medium text-gray-900">
                    {formatDate(dateInputToLocalDate(selectedDate))}
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    {formatTime(selectedTime)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ============================================================
     SESSION OPTIONS ERROR
  ============================================================ */

  if (isOptionsError) {
    return (
      <main className="min-h-screen bg-[#F7F8FD] px-6 py-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-6">
          <h1 className="font-semibold text-red-800">
            Unable to load session options
          </h1>

          <p className="mt-2 text-sm text-red-600">
            {optionsError instanceof Error
              ? optionsError.message
              : "Unable to load the mentor's session options."}
          </p>
        </div>
      </main>
    );
  }

  /* ============================================================
     SESSION OPTIONS LOADING
  ============================================================ */

  if (isOptionsPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FD]">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading available sessions...
        </div>
      </main>
    );
  }

  /* ============================================================
     PAGE
  ============================================================ */

  return (
    <main className="min-h-screen bg-[#F7F8FD]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* ======================================================
            HEADER
        ======================================================= */}

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#193B75]">
            Book a Session
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {swap.skill_name}
          </h1>

          <p className="mt-2 text-gray-600">
            Schedule a learning session with {swap.mentor_name}.
          </p>
        </div>

        {/* ======================================================
            STEP INDICATOR
        ======================================================= */}

        <div className="mt-8 flex items-center gap-3">
          <div
            className={`flex items-center gap-2 ${
              step === 1 ? "font-semibold text-[#193B75]" : "text-gray-400"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                step === 1
                  ? "bg-[#193B75] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              1
            </div>

            <span>Choose Session</span>
          </div>

          <div className="h-px w-10 bg-gray-300" />

          <div
            className={`flex items-center gap-2 ${
              step === 2 ? "font-semibold text-[#193B75]" : "text-gray-400"
            }`}
          >
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                step === 2
                  ? "bg-[#193B75] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              2
            </div>

            <span>Choose Time</span>
          </div>
        </div>

        {/* ======================================================
            SWAP INFORMATION
        ======================================================= */}

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Learner
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {swap.learner_name}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Users className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Mentor
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {swap.mentor_name}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================
            STEP 1
        ======================================================= */}

        {step === 1 && (
          <section className="mt-8">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Choose Session
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select one of the session options created by your mentor.
              </p>
            </div>

            {sessionOptions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                <Clock className="mx-auto h-8 w-8 text-gray-400" />

                <h3 className="mt-4 font-semibold text-gray-900">
                  No sessions available
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                  Your mentor has not currently made any session options
                  available for this skill.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sessionOptions.map((option) => {
                    const isSelected = option.id === selectedOptionId;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setSelectedOptionId(option.id);
                          setSelectedTime("");
                        }}
                        className={`relative rounded-2xl border bg-white p-5 text-left transition ${
                          isSelected
                            ? "border-[#193B75] ring-2 ring-[#193B75]/20"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                        }`}
                      >
                        {isSelected && (
                          <CheckCircle2 className="absolute right-4 top-4 h-5 w-5 text-[#193B75]" />
                        )}

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <Clock className="h-5 w-5" />
                        </div>

                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                          {option.duration_minutes} minutes
                        </h3>

                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                          <Coins className="h-4 w-4 text-yellow-600" />

                          <span>
                            {option.token_rate}{" "}
                            {option.token_rate === 1 ? "token" : "tokens"}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    disabled={!selectedOption}
                    onClick={() => {
                      if (!selectedOption) {
                        return;
                      }

                      setStep(2);
                    }}
                    className="rounded-xl bg-[#193B75] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#102B5B] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue to Schedule
                  </button>
                </div>
              </>
            )}
          </section>
        )}

        {/* ======================================================
            STEP 2
        ======================================================= */}

        {step === 2 && selectedOption && (
          <section className="mt-8">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Choose Date &amp; Time
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Select a time that fits your mentor&apos;s availability.
              </p>
            </div>

            {/* Selected option */}

            <div className="rounded-2xl border border-[#193B75]/20 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Selected Session
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {selectedOption.duration_minutes} minutes
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Token Cost
                  </p>

                  <p className="mt-1 flex items-center gap-1 font-semibold text-gray-900">
                    <Coins className="h-4 w-4 text-yellow-600" />
                    {selectedOption.token_rate}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSelectedDate("");
                    setSelectedTime("");
                  }}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[#193B75] hover:bg-blue-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Change Session
                </button>
              </div>
            </div>

            {/* Availability error */}

            {availabilityError && (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                <h3 className="font-semibold text-red-800">
                  Unable to load availability
                </h3>

                <p className="mt-1 text-sm text-red-600">{availabilityError}</p>
              </div>
            )}

            {/* Availability loading */}

            {isAvailabilityLoading ? (
              <div className="mt-6 flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-10">
                <div className="flex items-center gap-2 text-gray-600">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading mentor availability...
                </div>
              </div>
            ) : availability.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                <CalendarDays className="mx-auto h-8 w-8 text-gray-400" />

                <h3 className="mt-4 font-semibold text-gray-900">
                  No availability found
                </h3>

                <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                  Your mentor has not configured any active availability yet.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-6 lg:grid-cols-2">
                {/* Date */}

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <CalendarDays className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Select Date
                      </h3>

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
                      min={getDateInputValue(new Date())}
                      value={selectedDate}
                      onChange={(event) => {
                        setSelectedDate(event.target.value);
                        setSelectedTime("");
                      }}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#193B75] focus:ring-2 focus:ring-[#193B75]/10"
                    />
                  </label>

                  {selectedDate && (
                    <div className="mt-4 rounded-xl bg-gray-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Selected Date
                      </p>

                      <p className="mt-1 font-semibold text-gray-900">
                        {formatDate(dateInputToLocalDate(selectedDate))}
                      </p>
                    </div>
                  )}
                </div>

                {/* Time */}

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <Clock className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Select Time
                      </h3>

                      <p className="text-sm text-gray-500">
                        Session length: {selectedOption.duration_minutes}{" "}
                        minutes.
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
                        Choose another date when your mentor has enough
                        availability for the full{" "}
                        {selectedOption.duration_minutes}-minute session.
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
                            onClick={() => setSelectedTime(time)}
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
              </div>
            )}

            {/* ==================================================
                BOOKING SUMMARY
            =================================================== */}

            {selectedDate && selectedTime && (
              <div className="mt-8 rounded-2xl border border-[#193B75]/20 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#193B75] text-white">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Booking Summary
                    </h3>

                    <p className="text-sm text-gray-500">
                      Review your session before sending the request.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Skill
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {swap.skill_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Duration
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {selectedOption.duration_minutes} minutes
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Token Cost
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {selectedOption.token_rate}{" "}
                      {selectedOption.token_rate === 1 ? "token" : "tokens"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Date &amp; Time
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {formatDate(dateInputToLocalDate(selectedDate))}
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {formatTime(selectedTime)}
                    </p>
                  </div>
                </div>

                {/* ==================================================
                    REQUEST BUTTON
                =================================================== */}

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    disabled={requestScheduleMutation.isPending}
                    onClick={async () => {
                      if (!selectedOption) {
                        return;
                      }

                      if (!selectedDate || !selectedTime) {
                        return;
                      }

                      const date = dateInputToLocalDate(selectedDate);

                      /*
                       * Create a local Date using the selected
                       * date and time.
                       *
                       * toISOString() then sends the correct
                       * UTC representation to Supabase.
                       */

                      const [hours, minutes] = selectedTime
                        .split(":")
                        .map(Number);

                      date.setHours(hours, minutes, 0, 0);

                      /*
                       * Client-side availability validation.
                       *
                       * The database RPC remains authoritative.
                       */

                      const stillAvailable = isTimeStillAvailable(
                        date,
                        selectedTime,
                        selectedOption.duration_minutes,
                        availability,
                      );

                      if (!stillAvailable) {
                        setAvailabilityError(
                          "This time is no longer available for the full session duration. Please choose another time.",
                        );

                        return;
                      }

                      setAvailabilityError(null);

                      try {
                        await requestScheduleMutation.mutateAsync({
                          swapId: swap.id,
                          sessionOptionId: selectedOption.id,
                          scheduledAt: date.toISOString(),
                        });

                        setSuccessMessage(
                          `Your ${selectedOption.duration_minutes}-minute session request has been sent to ${swap.mentor_name}.`,
                        );

                        setIsSuccess(true);
                      } catch (error) {
                        setAvailabilityError(
                          error instanceof Error
                            ? error.message
                            : "Unable to request the session.",
                        );
                      }
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#193B75] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#102B5B] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {requestScheduleMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      <>
                        <CalendarDays className="h-4 w-4" />
                        Request Session
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
