"use client";

import { GraduationCap, Loader2, Users } from "lucide-react";

import { useMySwaps } from "@/hooks/skills/useMySwap";
import { useCurrentProfile } from "@/hooks/use-current-profile";
import SwapCard from "@/components/swaps/SwapCard";

type Swap = NonNullable<ReturnType<typeof useMySwaps>["data"]>[number];

const SwapsPage = () => {
  const { data: user, isPending: isUserPending } = useCurrentProfile();

  const {
    data: swaps = [],
    isPending: isSwapsPending,
    isError,
    error,
  } = useMySwaps();

  console.log("SWAPS:", swaps);
  console.log("PROFILE:", user);

  if (isUserPending || isSwapsPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FD]">
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading swaps...
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FD]">
        <p className="text-gray-600">Please log in to view your swaps.</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-[#F7F8FD] px-6 py-10">
        <div className="mx-auto max-w-7xl rounded-2xl border border-red-200 bg-red-50 p-6">
          <h1 className="font-semibold text-red-800">Failed to load swaps</h1>

          <p className="mt-2 text-sm text-red-600">
            {error instanceof Error ? error.message : "Something went wrong."}
          </p>
        </div>
      </main>
    );
  }

  /*
   * IMPORTANT:
   * swaps use auth_user_id.
   * useCurrentProfile() gives us both:
   *   user.id
   *   user.auth_user_id
   *
   * We must compare against auth_user_id.
   */
  const currentAuthUserId: string = user.auth_user_id;

  const learning: Swap[] = swaps.filter(
    (swap: Swap): boolean => swap.learner_auth_user_id === currentAuthUserId,
  );

  const teaching: Swap[] = swaps.filter(
    (swap: Swap): boolean => swap.mentor_auth_user_id === currentAuthUserId,
  );

  return (
    <main className="min-h-screen bg-[#F7F8FD]">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Swaps</h1>

          <p className="mt-2 text-gray-600">
            Manage your learning and teaching swaps.
          </p>
        </div>

        {/* =========================
            MY LEARNING
        ========================== */}
        <section className="mt-10">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                My Learning
              </h2>

              <p className="text-sm text-gray-500">Skills you are learning</p>
            </div>
          </div>

          {learning.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="font-medium text-gray-700">
                No learning swaps yet.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Find a skill and request a swap to start learning.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {learning.map((swap) => (
                <SwapCard
                  key={swap.id}
                  swap={swap}
                  currentUserId={currentAuthUserId}
                />
              ))}
            </div>
          )}
        </section>

        {/* =========================
            MY TEACHING
        ========================== */}
        <section className="mt-12">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-purple-100 p-2">
              <Users className="h-5 w-5 text-purple-600" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                My Teaching
              </h2>

              <p className="text-sm text-gray-500">Skills you are teaching</p>
            </div>
          </div>

          {teaching.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="font-medium text-gray-700">
                No teaching swaps yet.
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Accepted swap requests will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {teaching.map((swap) => (
                <SwapCard
                  key={swap.id}
                  swap={swap}
                  currentUserId={currentAuthUserId}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default SwapsPage;
