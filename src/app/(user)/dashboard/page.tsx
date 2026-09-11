"use client";

import { Calendar, Coins, History, Loader2 } from "lucide-react";
import DashboardSessionCalendar from "@/components/dashboard/DashboardSessionCalendar";
import { useMySwaps } from "@/hooks/skills/useMySwap";
import { useTokenBalance } from "@/hooks/wallet/useTokenBalance";
import { useCurrentProfile } from "@/hooks/use-current-profile";

import TokenTransactionHistory from "@/components/wallet/TokenTransactionHistory";

const Dashboard = () => {
  const { data: user } = useCurrentProfile();

  const {
    data: balance,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
  } = useTokenBalance();

  const {
    data: swaps = [],
    isLoading: isSwapsLoading,
    isError: isSwapsError,
  } = useMySwaps();

  const currentAuthUserId = user?.auth_user_id;

  const learning = currentAuthUserId
    ? swaps.filter((swap) => swap.learner_auth_user_id === currentAuthUserId)
    : [];

  const teaching = currentAuthUserId
    ? swaps.filter((swap) => swap.mentor_auth_user_id === currentAuthUserId)
    : [];

  const upcomingSessions = swaps.filter(
    (swap) =>
      (swap.status === "accepted" || swap.status === "scheduled") &&
      (swap.learner_auth_user_id === currentAuthUserId ||
        swap.mentor_auth_user_id === currentAuthUserId),
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header + Balance */}
        <div className="grid gap-6 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

            <p className="mt-2 text-gray-500">
              Manage your skills, sessions, and tokens.
            </p>
          </section>

          {/* Token Balance */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-yellow-600" />

              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Token Balance
              </p>
            </div>

            {isBalanceLoading ? (
              <div className="mt-5 flex items-center gap-2 text-gray-500">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </div>
            ) : isBalanceError ? (
              <p className="mt-5 text-sm text-red-600">
                Unable to load your token balance.
              </p>
            ) : (
              <>
                <p className="mt-3 text-4xl font-bold text-gray-900">
                  {balance ?? 0}
                </p>

                <p className="mt-1 text-sm text-gray-500">available tokens</p>
              </>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <Coins className="h-4 w-4" />
                Wallet
              </button>

              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <History className="h-4 w-4" />
                History
              </button>
            </div>
          </section>
        </div>

        {/* Upcoming Sessions */}
        <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />

            <h2 className="text-lg font-semibold text-gray-900">
              Upcoming Sessions
            </h2>
          </div>

          {isSwapsLoading ? (
            <div className="mt-5 flex items-center gap-2 text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading sessions...
            </div>
          ) : isSwapsError ? (
            <p className="mt-5 text-sm text-red-600">
              Unable to load your sessions.
            </p>
          ) : upcomingSessions.length === 0 ? (
            <p className="mt-5 text-sm text-gray-500">
              You have no upcoming sessions.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {upcomingSessions.map((swap) => {
                const isLearner =
                  swap.learner_auth_user_id === currentAuthUserId;

                return (
                  <div
                    key={swap.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-4"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900">
                        {swap.skill_name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {swap.scheduled_at
                          ? new Date(swap.scheduled_at).toLocaleString()
                          : "Not scheduled yet"}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {isLearner
                          ? `Mentor: ${swap.mentor_name}`
                          : `Learner: ${swap.learner_name}`}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        swap.status === "scheduled"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {swap.status === "scheduled"
                        ? "Scheduled"
                        : "Awaiting schedule"}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
        {/* Session Calendar */}
        <DashboardSessionCalendar
          swaps={swaps}
          currentAuthUserId={currentAuthUserId}
        />

        {/* Learning + Teaching */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {/* Learning */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Skills I&apos;m Learning
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your active learning swaps
                </p>
              </div>

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {learning.length}
              </span>
            </div>

            {learning.length === 0 ? (
              <p className="mt-5 text-sm text-gray-500">
                No learning swaps yet.
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {learning.slice(0, 3).map((swap) => (
                  <div
                    key={swap.id}
                    className="rounded-xl border border-gray-100 p-4"
                  >
                    <p className="font-semibold text-gray-900">
                      {swap.skill_name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Learning from {swap.mentor_name}
                    </p>

                    <p className="mt-1 text-xs capitalize text-gray-400">
                      {swap.status.replace("_", " ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Teaching */}
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Skills I&apos;m Teaching
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Your active teaching swaps
                </p>
              </div>

              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                {teaching.length}
              </span>
            </div>

            {teaching.length === 0 ? (
              <p className="mt-5 text-sm text-gray-500">
                No teaching swaps yet.
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {teaching.slice(0, 3).map((swap) => (
                  <div
                    key={swap.id}
                    className="rounded-xl border border-gray-100 p-4"
                  >
                    <p className="font-semibold text-gray-900">
                      {swap.skill_name}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Teaching {swap.learner_name}
                    </p>

                    <p className="mt-1 text-xs capitalize text-gray-400">
                      {swap.status.replace("_", " ")}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
          <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Completed Sessions
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Review sessions you have completed.
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                {learning.filter((swap) => swap.status === "completed").length}
              </span>
            </div>

            {learning.filter((swap) => swap.status === "completed").length ===
            0 ? (
              <p className="mt-5 text-sm text-gray-500">
                No completed learning sessions yet.
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {learning
                  .filter((swap) => swap.status === "completed")
                  .slice(0, 3)
                  .map((swap) => (
                    <div
                      key={swap.id}
                      className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-4"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          {swap.skill_name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Mentor: {swap.mentor_name}
                        </p>

                        {swap.completed_at && (
                          <p className="mt-1 text-xs text-gray-400">
                            Completed{" "}
                            {new Date(swap.completed_at).toLocaleString()}
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Completed
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>

        {/* Transaction History */}
        <div className="mt-6">
          <TokenTransactionHistory />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
