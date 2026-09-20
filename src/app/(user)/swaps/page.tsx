"use client";

import { useState } from "react";
import { GraduationCap, Loader2, Users } from "lucide-react";

import { useMySwaps } from "@/hooks/skills/useMySwap";
import { useCurrentProfile } from "@/hooks/use-current-profile";

import SwapCard from "@/components/swaps/SwapCard";
import EmptySwapState from "@/components/swaps/EmptySwapState";

export type Swap = NonNullable<ReturnType<typeof useMySwaps>["data"]>[number];

export type SwapView = "learning" | "teaching";

const SwapsPage = () => {
  const [activeView, setActiveView] = useState<SwapView>("learning");

  const { data: user, isPending: isUserPending } = useCurrentProfile();

  const {
    data: swaps = [],
    isPending: isSwapsPending,
    isError,
    error,
  } = useMySwaps();

  /* LOADING */

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

  /* NOT LOGGED IN */

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FD]">
        <p className="text-gray-600">Please log in to view your swaps.</p>
      </main>
    );
  }

  /* ERROR */

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

  const currentAuthUserId = user.auth_user_id;

  /* FILTER SWAPS */

  const learning: Swap[] = swaps.filter(
    (swap: Swap) => swap.learner_auth_user_id === currentAuthUserId,
  );

  const teaching: Swap[] = swaps.filter(
    (swap: Swap) => swap.mentor_auth_user_id === currentAuthUserId,
  );
  
  const activeSwaps = activeView === "learning" ? learning : teaching;

  /* EMPTY STATE CONTENTS */

  const isLearning = activeView === "learning";

  return (
    <main className="min-h-screen bg-[#F7F8FD]">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* PAGE HEADER  */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Swaps
          </h1>

          <p className="mt-2 text-gray-600">
            Manage your learning and teaching swaps.
          </p>
        </div>

        {/* LEARNING / TEACHING SWITCHER */}
        <div className="mt-8">
          <div className="inline-flex w-full rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm sm:w-auto">
            {/* MY LEARNING */}

            <button
              type="button"
              onClick={() => setActiveView("learning")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition sm:min-w-45 ${
                activeView === "learning"
                  ? "bg-[#193B75] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <GraduationCap className="h-5 w-5" />

              <span>My Learning</span>

              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  activeView === "learning"
                    ? "bg-white/15 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {learning.length}
              </span>
            </button>

            {/* MY TEACHING */}

            <button
              type="button"
              onClick={() => setActiveView("teaching")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition sm:min-w-45 ${
                activeView === "teaching"
                  ? "bg-[#193B75] text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Users className="h-5 w-5" />

              <span>My Teaching</span>

              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  activeView === "teaching"
                    ? "bg-white/15 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {teaching.length}
              </span>
            </button>
          </div>
        </div>

        {/* ======================================================
            ACTIVE SECTION HEADER
        ======================================================= */}

        <section className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  isLearning
                    ? "bg-blue-100 text-blue-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {isLearning ? (
                  <GraduationCap className="h-5 w-5" />
                ) : (
                  <Users className="h-5 w-5" />
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {isLearning ? "My Learning" : "My Teaching"}
                </h2>

                <p className="text-sm text-gray-500">
                  {isLearning
                    ? "Skills you are learning"
                    : "Skills you are teaching"}
                </p>
              </div>
            </div>

            {/* COUNT */}

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-200">
              {activeSwaps.length} {activeSwaps.length === 1 ? "swap" : "swaps"}
            </span>
          </div>

          {/* SWAP CARDS */}

          {activeSwaps.length === 0 ? (
            <EmptySwapState type={activeView} />
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {activeSwaps.map((swap) => (
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
