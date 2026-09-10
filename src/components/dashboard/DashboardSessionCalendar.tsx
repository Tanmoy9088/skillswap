"use client";

import { useMemo, useState } from "react";
import type { ComponentProps } from "react";
import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react";
import Calendar from "react-calendar";

import type { Swap } from "@/types/types/swaps";

interface DashboardSessionCalendarProps {
  swaps: Swap[];
  currentAuthUserId?: string;
}

type CalendarValue = Parameters<
  NonNullable<ComponentProps<typeof Calendar>["onChange"]>
>[0];

const DashboardSessionCalendar = ({
  swaps,
  currentAuthUserId,
}: DashboardSessionCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const mySwaps = useMemo(
    () =>
      swaps.filter(
        (swap) =>
          swap.learner_auth_user_id === currentAuthUserId ||
          swap.mentor_auth_user_id === currentAuthUserId,
      ),
    [swaps, currentAuthUserId],
  );

  const upcomingSessions = useMemo(
    () =>
      mySwaps.filter(
        (swap) =>
          (swap.status === "scheduled" || swap.status === "in_progress") &&
          Boolean(swap.scheduled_at),
      ),
    [mySwaps],
  );

  const completedSessions = useMemo(
    () =>
      mySwaps.filter(
        (swap) =>
          swap.status === "completed" && Boolean(swap.completed_at),
      ),
    [mySwaps],
  );

  const dateKey = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(date.getDate()).padStart(2, "0")}`;

  const getSessionDate = (swap: Swap) => {
    if (swap.status === "completed" && swap.completed_at) {
      return new Date(swap.completed_at);
    }

    if (swap.scheduled_at) {
      return new Date(swap.scheduled_at);
    }

    return null;
  };

  const selectedDateSessions = useMemo(() => {
    const selectedKey = dateKey(selectedDate);

    return mySwaps.filter((swap) => {
      const sessionDate = getSessionDate(swap);

      return sessionDate && dateKey(sessionDate) === selectedKey;
    });
  }, [mySwaps, selectedDate]);

  const hasUpcomingOnDate = (date: Date) =>
    upcomingSessions.some((swap) => {
      const sessionDate = getSessionDate(swap);

      return (
        sessionDate &&
        dateKey(sessionDate) === dateKey(date)
      );
    });

  const hasCompletedOnDate = (date: Date) =>
    completedSessions.some((swap) => {
      const sessionDate = getSessionDate(swap);

      return (
        sessionDate &&
        dateKey(sessionDate) === dateKey(date)
      );
    });

  const handleDateChange = (value: CalendarValue) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "";

    return new Date(dateString).toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
              <CalendarDays className="h-5 w-5 text-indigo-600" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
                Session Calendar
              </h2>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                View your upcoming and completed sessions by date.
              </p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 rounded-xl bg-gray-50 px-3 py-2.5 sm:gap-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
            <span className="h-2.5 w-2.5 rounded-full bg-green-500 shadow-sm shadow-green-200" />
            Upcoming
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-200" />
            Completed
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-5 grid min-w-0 gap-5 xl:mt-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        {/* Calendar */}
        <div className="min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-linear-to-br from-gray-50 to-white p-3 sm:p-5">
          <div className="flex justify-center overflow-x-auto">
            <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              className="skillswap-dashboard-calendar"
              tileClassName={({ date, view }) => {
                if (view !== "month") return "";

                const upcoming = hasUpcomingOnDate(date);
                const completed = hasCompletedOnDate(date);

                if (upcoming && completed) {
                  return "has-upcoming has-completed";
                }

                if (upcoming) {
                  return "has-upcoming";
                }

                if (completed) {
                  return "has-completed";
                }

                return "";
              }}
            />
          </div>
        </div>

        {/* Selected Day */}
        <div className="min-w-0 rounded-2xl border border-gray-100 bg-linear-to-br from-gray-50 to-white p-4 sm:p-5">
          <div className="border-b border-gray-100 pb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500">
              Selected Date
            </p>

            <h3 className="mt-1 text-lg font-bold leading-tight text-gray-900 sm:text-xl">
              {selectedDate.toLocaleDateString([], {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h3>
          </div>

          {selectedDateSessions.length === 0 ? (
            <div className="flex min-h-55 flex-col items-center justify-center px-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
                <CalendarDays className="h-7 w-7 text-gray-300" />
              </div>

              <p className="mt-4 text-sm font-semibold text-gray-600">
                No sessions on this date
              </p>

              <p className="mt-1 max-w-60 text-xs leading-5 text-gray-400">
                Select another date to view your scheduled or completed
                sessions.
              </p>
            </div>
          ) : (
            <div className="mt-4 max-h-90 space-y-3 overflow-y-auto pr-1">
              {selectedDateSessions.map((swap) => {
                const isCompleted = swap.status === "completed";

                const isLearner =
                  swap.learner_auth_user_id === currentAuthUserId;

                const dateValue = getSessionDate(swap);

                return (
                  <div
                    key={swap.id}
                    className="group rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-100 hover:shadow-md sm:p-4"
                  >
                    <div className="flex items-start gap-3">
                      {/* Status Icon */}
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          isCompleted
                            ? "bg-blue-50 text-blue-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Clock3 className="h-4 w-4" />
                        )}
                      </div>

                      {/* Session Details */}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-gray-900">
                          {swap.skill_name}
                        </p>

                        <p className="mt-1 truncate text-xs text-gray-500">
                          {isLearner
                            ? `Mentor: ${swap.mentor_name}`
                            : `Learner: ${swap.learner_name}`}
                        </p>

                        {dateValue && (
                          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-gray-400">
                            <Clock3 className="h-3 w-3" />

                            <span>
                              {isCompleted
                                ? `Completed ${formatDate(
                                    swap.completed_at,
                                  )} at ${formatTime(
                                    swap.completed_at,
                                  )}`
                                : `${formatDate(
                                    swap.scheduled_at,
                                  )} at ${formatTime(
                                    swap.scheduled_at,
                                  )}`}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Status */}
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide sm:text-[10px] ${
                          isCompleted
                            ? "bg-blue-50 text-blue-600 ring-1 ring-blue-100"
                            : "bg-green-50 text-green-600 ring-1 ring-green-100"
                        }`}
                      >
                        {isCompleted ? "Completed" : "Upcoming"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Responsive Summary */}
      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5 sm:grid-cols-3">
        <div className="rounded-xl bg-green-50/70 p-3">
          <p className="text-xs font-medium text-green-600">
            Upcoming
          </p>

          <p className="mt-1 text-xl font-bold text-gray-900">
            {upcomingSessions.length}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50/70 p-3">
          <p className="text-xs font-medium text-blue-600">
            Completed
          </p>

          <p className="mt-1 text-xl font-bold text-gray-900">
            {completedSessions.length}
          </p>
        </div>

        <div className="col-span-2 rounded-xl bg-indigo-50/70 p-3 sm:col-span-1">
          <p className="text-xs font-medium text-indigo-600">
            Total Sessions
          </p>

          <p className="mt-1 text-xl font-bold text-gray-900">
            {upcomingSessions.length + completedSessions.length}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardSessionCalendar;