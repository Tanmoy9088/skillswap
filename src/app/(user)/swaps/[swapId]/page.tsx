"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Coins,
  PlayCircle,
  User,
} from "lucide-react";

import { useSwapById } from "@/hooks/skills/useSwapById";
import Image from "next/image";

export default function SwapDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const swapId = params.swapId as string;

  const { data: swap, isLoading, error } = useSwapById(swapId);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 rounded bg-gray-200" />
            <div className="h-64 rounded-2xl bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !swap) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Swap Not Found</h1>

          <p className="mt-3 text-sm text-gray-500">
            We couldn&apos;t find this swap or you don&apos;t have access to it.
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </div>
      </main>
    );
  }

  const isScheduled = swap.status === "scheduled";

  const isInProgress = swap.status === "in_progress";

  const isCompleted = swap.status === "completed";

  const isCancelled = swap.status === "cancelled";

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        {/* Back */}
        <button
          type="button"
          onClick={() => router.push("/swaps")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Skill Swap</p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                {swap.skill_name}
              </h1>

              <p className="mt-2 text-sm text-gray-500">Swap ID: {swap.id}</p>
            </div>

            <StatusBadge status={swap.status} />
          </div>

          {/* Participants */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {/* Learner */}
            <div className="rounded-xl border bg-gray-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Learner
              </p>

              <div className="mt-3 flex items-center gap-3">
                {swap.learner_profile_img ? (
                  <Image
                    src={swap.learner_profile_img}
                    alt={swap.learner_name}
                    className="h-12 w-12 rounded-full object-cover"
                    fill
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                    <User size={22} />
                  </div>
                )}

                <div>
                  <p className="font-semibold text-gray-900">
                    {swap.learner_name}
                  </p>

                  <p className="text-sm text-gray-500">Learning</p>
                </div>
              </div>
            </div>

            {/* Mentor */}
            <div className="rounded-xl border bg-gray-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Mentor
              </p>

              <div className="mt-3 flex items-center gap-3">
                {swap.mentor_profile_img ? (
                  <Image
                    src={swap.mentor_profile_img}
                    alt={swap.mentor_name}
                    className="h-12 w-12 rounded-full object-cover"
                    fill
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                    <User size={22} />
                  </div>
                )}

                <div>
                  <p className="font-semibold text-gray-900">
                    {swap.mentor_name}
                  </p>

                  <p className="text-sm text-gray-500">Teaching</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session information */}
          <div className="mt-6 rounded-xl border p-5">
            <h2 className="font-semibold text-gray-900">Session Details</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <InfoItem
                icon={<Clock size={18} />}
                label="Duration"
                value={
                  swap.duration_minutes
                    ? `${swap.duration_minutes} minutes`
                    : "Not selected"
                }
              />

              <InfoItem
                icon={<Coins size={18} />}
                label="Token Cost"
                value={
                  swap.session_token_rate !== null
                    ? `${swap.session_token_rate} tokens`
                    : `${swap.token_rate} tokens`
                }
              />

              <InfoItem
                icon={<Calendar size={18} />}
                label="Scheduled"
                value={
                  swap.scheduled_at
                    ? new Date(swap.scheduled_at).toLocaleString()
                    : "Not scheduled"
                }
              />
            </div>
          </div>

          {/* Session actions */}
          {isScheduled && (
            <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5">
              <h2 className="font-semibold text-blue-900">Session Scheduled</h2>

              <p className="mt-1 text-sm text-blue-700">
                Your session is scheduled. The mentor can start the session when
                it is time.
              </p>
            </div>
          )}

          {isInProgress && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-green-900">
                    Session In Progress
                  </h2>

                  <p className="mt-1 text-sm text-green-700">
                    The session has started. You can join the video call now.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => router.push(`/swaps/${swap.id}/session`)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-green-700"
                >
                  <PlayCircle size={19} />
                  Join Session
                </button>
              </div>
            </div>
          )}

          {isCompleted && (
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
              <h2 className="font-semibold text-gray-900">Session Completed</h2>

              <p className="mt-1 text-sm text-gray-500">
                This SkillSwap session has been completed.
              </p>
            </div>
          )}

          {isCancelled && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5">
              <h2 className="font-semibold text-red-900">Session Cancelled</h2>

              <p className="mt-1 text-sm text-red-700">
                This session has been cancelled.
              </p>
            </div>
          )}

          {/* Debug information */}
          <div className="mt-8 rounded-xl bg-gray-950 p-5 text-sm text-gray-300">
            <p className="font-semibold text-white">Current Status</p>

            <p className="mt-2">{swap.status}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    accepted: "bg-gray-100 text-gray-700",
    schedule_requested: "bg-yellow-100 text-yellow-800",
    mentor_reschedule_proposed: "bg-orange-100 text-orange-800",
    scheduled: "bg-blue-100 text-blue-800",
    in_progress: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${
        styles[status] ?? "bg-gray-100 text-gray-700"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-4">
      <div className="flex items-center gap-2 text-gray-500">
        {icon}
        <span className="text-xs font-medium">{label}</span>
      </div>

      <p className="mt-2 font-semibold text-gray-900">{value}</p>
    </div>
  );
}
