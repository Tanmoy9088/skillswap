"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  Video,
  XCircle,
} from "lucide-react";

import { useMySwaps } from "@/hooks/skills/useMySwap";

type BookingStatus = "scheduled" | "in_progress" | "completed" | "cancelled";

interface BookingSwap {
  id: string;
  skill_name: string;
  mentor_name: string;
  status: string;
  token_rate: number;
  scheduled_at?: string | null;
}

const statusStyles: Record<BookingStatus, string> = {
  scheduled: "bg-indigo-50 text-indigo-700",
  in_progress: "bg-orange-50 text-orange-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

const statusLabels: Record<BookingStatus, string> = {
  scheduled: "Scheduled",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const MyBookingsPage = () => {
  const { data: swaps, isLoading, isError } = useMySwaps();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  const bookings = (swaps ?? []) as BookingSwap[];

  /*
   * Only actual bookings appear here.
   *
   * accepted
   * schedule_requested
   * mentor_reschedule_proposed
   *
   * are handled from the Swap page and are NOT
   * shown as bookings yet.
   */
  const upcoming = bookings.filter(
    (swap) => swap.status === "scheduled" || swap.status === "in_progress",
  );

  const completed = bookings.filter((swap) => swap.status === "completed");

  const cancelled = bookings.filter((swap) => swap.status === "cancelled");

  return (
    <main className="min-h-screen bg-[#F7F7FF] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Calendar className="h-6 w-6" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#17366F]">
                My Bookings
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View your upcoming and previous skill sessions.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            STATS
        ====================================================== */}

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <BookingStat
            label="Upcoming"
            value={upcoming.length}
            icon={<Clock className="h-5 w-5" />}
          />

          <BookingStat
            label="Completed"
            value={completed.length}
            icon={<CheckCircle2 className="h-5 w-5" />}
          />

          <BookingStat
            label="Cancelled"
            value={cancelled.length}
            icon={<XCircle className="h-5 w-5" />}
          />
        </div>

        {/* =====================================================
            UPCOMING
        ====================================================== */}

        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#17366F]">
                Upcoming Sessions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your scheduled and active sessions.
              </p>
            </div>

            <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
              {upcoming.length}
            </span>
          </div>

          {upcoming.length === 0 ? (
            <EmptyBookings
              icon={<Calendar className="h-6 w-6" />}
              title="No upcoming sessions"
              description="Your scheduled sessions will appear here."
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((swap) => (
                <BookingCard key={swap.id} swap={swap} />
              ))}
            </div>
          )}
        </section>

        {/* =====================================================
            COMPLETED
        ====================================================== */}

        {completed.length > 0 && (
          <section className="mt-12">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#17366F]">
                Completed Sessions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Sessions you have already completed.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {completed.map((swap) => (
                <BookingCard key={swap.id} swap={swap} />
              ))}
            </div>
          </section>
        )}

        {/* =====================================================
            CANCELLED
        ====================================================== */}

        {cancelled.length > 0 && (
          <section className="mt-12">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#17366F]">
                Cancelled Sessions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Sessions that were cancelled.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {cancelled.map((swap) => (
                <BookingCard key={swap.id} swap={swap} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

/* ============================================================
   BOOKING CARD
============================================================ */

interface BookingCardProps {
  swap: BookingSwap;
}

const BookingCard = ({ swap }: BookingCardProps) => {
  const status = swap.status as BookingStatus;

  const statusClass = statusStyles[status] ?? "bg-gray-100 text-gray-600";

  const statusLabel = statusLabels[status] ?? swap.status.replace(/_/g, " ");

  const isUpcoming = status === "scheduled" || status === "in_progress";

  const isCompleted = status === "completed";

  const isCancelled = status === "cancelled";

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* =====================================================
          CARD HEADER
      ====================================================== */}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Video className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-bold text-gray-900">
                {swap.skill_name}
              </h3>

              <p className="mt-1 truncate text-sm text-gray-500">
                with {swap.mentor_name}
              </p>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
          >
            {statusLabel}
          </span>
        </div>

        {/* =====================================================
            DETAILS
        ====================================================== */}

        <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
          {/* TOKEN COST */}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Token cost</span>

            <span className="flex items-center gap-1 font-semibold text-gray-800">
              <Coins className="h-4 w-4 text-indigo-600" />
              {Number(swap.token_rate ?? 0).toLocaleString()}
            </span>
          </div>

          {/* SCHEDULED DATE */}

          {swap.scheduled_at && (
            <div className="flex items-start justify-between gap-4 text-sm">
              <span className="text-gray-500">
                {isCompleted
                  ? "Session"
                  : isCancelled
                    ? "Scheduled"
                    : "Scheduled"}
              </span>

              <span className="text-right font-medium text-gray-800">
                {formatDateTime(swap.scheduled_at)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      {isUpcoming && (
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Clock className="h-4 w-4 text-indigo-600" />

            {status === "scheduled"
              ? "Your session is scheduled."
              : "Your session is currently in progress."}
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="border-t border-green-100 bg-green-50 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-medium text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            Session completed
          </div>
        </div>
      )}

      {isCancelled && (
        <div className="border-t border-red-100 bg-red-50 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-medium text-red-700">
            <XCircle className="h-4 w-4" />
            Session cancelled
          </div>
        </div>
      )}
    </article>
  );
};

/* ============================================================
   DATE FORMATTER
============================================================ */

const formatDateTime = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

/* ============================================================
   STAT CARD
============================================================ */

interface BookingStatProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const BookingStat = ({ label, value, icon }: BookingStatProps) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">{label}</p>

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold text-[#17366F]">{value}</p>
    </div>
  );
};

/* ============================================================
   EMPTY STATE
============================================================ */

interface EmptyBookingsProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const EmptyBookings = ({ icon, title, description }: EmptyBookingsProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
        {icon}
      </div>

      <h3 className="mt-4 font-semibold text-gray-800">{title}</h3>

      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
};

/* ============================================================
   LOADING STATE
============================================================ */

const LoadingState = () => {
  return (
    <main className="min-h-screen bg-[#F7F7FF] px-4 pb-12 pt-28 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="animate-pulse">
          <div className="h-8 w-48 rounded bg-gray-200" />

          <div className="mt-3 h-4 w-80 rounded bg-gray-200" />

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-28 rounded-2xl bg-gray-200" />
            ))}
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-64 rounded-2xl bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

/* ============================================================
   ERROR STATE
============================================================ */

const ErrorState = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F7FF] px-6">
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        <XCircle className="mx-auto h-10 w-10 text-red-500" />

        <h1 className="mt-4 text-xl font-bold text-gray-900">
          Unable to load bookings
        </h1>

        <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
      </div>
    </main>
  );
};

export default MyBookingsPage;
