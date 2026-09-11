"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  Loader2,
  Users,
  XCircle,
} from "lucide-react";
import Link from "next/link";

import { useMySwaps } from "@/hooks/skills/useMySwap";

const statusStyles = {
  accepted: "bg-blue-50 text-blue-700",
  scheduled: "bg-indigo-50 text-indigo-700",
  in_progress: "bg-amber-50 text-amber-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

const MyBookingsPage = () => {
  const { data: swaps, isLoading, isError } = useMySwaps();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F7F7FF] px-4 pb-12 pt-28 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded bg-gray-200" />
            <div className="mt-3 h-4 w-80 rounded bg-gray-200" />

            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-64 rounded-2xl bg-gray-200" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (isError) {
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
  }

  const bookings = swaps ?? [];

  const upcoming = bookings.filter(
    (swap) =>
      swap.status === "accepted" ||
      swap.status === "scheduled" ||
      swap.status === "in_progress",
  );

  const completed = bookings.filter((swap) => swap.status === "completed");

  const cancelled = bookings.filter((swap) => swap.status === "cancelled");

  return (
    <main className="min-h-screen bg-[#F7F7FF] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
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
                Manage your skill sessions and upcoming mentorship.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
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

        {/* Upcoming */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-[#17366F]">
                Upcoming Sessions
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Sessions that need your attention.
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
              description="Your accepted and scheduled sessions will appear here."
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((swap) => (
                <BookingCard key={swap.id} swap={swap} />
              ))}
            </div>
          )}
        </section>

        {/* Completed */}
        {completed.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-[#17366F]">
              Completed Sessions
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {completed.map((swap) => (
                <BookingCard key={swap.id} swap={swap} />
              ))}
            </div>
          </section>
        )}

        {/* Cancelled */}
        {cancelled.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-[#17366F]">
              Cancelled Sessions
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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

interface BookingCardProps {
  swap: {
    id: string;
    skill_name: string;
    mentor_name: string;
    status: string;
    token_rate: number;
    scheduled_at?: string | null;
  };
}

const BookingCard = ({ swap }: BookingCardProps) => {
  const status =
    statusStyles[swap.status as keyof typeof statusStyles] ??
    "bg-gray-100 text-gray-600";

  const needsScheduling = swap.status === "accepted";

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
            <Users className="h-5 w-5" />
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
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${status}`}
        >
          {swap.status.replace("_", " ")}
        </span>
      </div>

      <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Token cost</span>

          <span className="flex items-center gap-1 font-semibold text-gray-800">
            <Coins className="h-4 w-4 text-indigo-600" />
            {swap.token_rate}
          </span>
        </div>

        {swap.scheduled_at && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Scheduled</span>

            <span className="font-medium text-gray-800">
              {new Date(swap.scheduled_at).toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {needsScheduling ? (
        <Link
          href={`/bookings/${swap.id}`}
          className="mt-5 block rounded-xl bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Schedule Session
        </Link>
      ) : (
        <Link
          href={`/bookings/${swap.id}`}
          className="mt-5 block rounded-xl border border-gray-200 bg-white px-4 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          View Session
        </Link>
      )}
    </article>
  );
};

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

export default MyBookingsPage;
