"use client";

import { Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";

import { useMySwaps } from "@/hooks/skills/useMySwap";
import LoadingState from "@/components/bookings/LoadingState";
import ErrorState from "@/components/bookings/ErrorState";
import BookingStat from "@/components/bookings/BookingStats";
import EmptyBookings from "@/components/bookings/EmptyBookings";
import BookingCard from "@/components/bookings/BookingCard";
import BookingHeader from "@/components/bookings/BookingHeader";

export interface BookingSwap {
  id: string;
  skill_name: string;
  mentor_name: string;
  status: string;
  token_rate: number;
  scheduled_at?: string | null;
}

const MyBookingsPage = () => {
  const { data: swaps, isLoading, isError } = useMySwaps();

  if (isLoading) {
    return <LoadingState />;
  }

  if (isError) {
    return <ErrorState />;
  }

  const bookings = (swaps ?? []) as BookingSwap[];

  const upcoming = bookings.filter(
    (swap) => swap.status === "scheduled" || swap.status === "in_progress",
  );

  const completed = bookings.filter((swap) => swap.status === "completed");

  const cancelled = bookings.filter((swap) => swap.status === "cancelled");

  return (
    <main className="min-h-screen bg-[#F7F7FF] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER*/}
        <BookingHeader />

        {/* STATS*/}

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

        {/* UPCOMING */}

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

        {/* COMPLETED */}

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

        {/* Cancelled */}

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

export default MyBookingsPage;
