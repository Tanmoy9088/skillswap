"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Calendar,
  Check,
  Coins,
  ExternalLink,
  Loader2,
  MessageCircle,
  Play,
  Star,
  UserRound,
  Video,
  X,
  XCircle,
} from "lucide-react";

import RescheduleSessionModal from "@/components/swaps/RescheduleSessionModal";
import RateMentorModal from "@/components/swaps/RateMentorModal";

import { useConfirmScheduleSwap } from "@/hooks/mentors/skills/useConfirmScheduleSwap";
import { useRespondToReschedule } from "@/hooks/mentors/skills/useRespondToReschedule";
import { useStartSwapSession } from "@/hooks/mentors/skills/useStartSwapSession";
import { useCompleteSwapSession } from "@/hooks/mentors/skills/useCompleteSwapSession";
import { useCancelSwapSession } from "@/hooks/mentors/skills/useCancelSwapSession";
import { useSwapRating } from "@/hooks/mentors/skills/useSwapRating";

import type { Swap } from "@/types/types/swaps";

interface SwapCardProps {
  swap: Swap;
  currentUserId: string;
}

const SwapCard = ({ swap, currentUserId }: SwapCardProps) => {
  const router = useRouter();

  /*
   * ============================================================
   * MODAL STATE
   * ============================================================
   */

  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  /*
   * ============================================================
   * MUTATIONS
   * ============================================================
   */

  const confirmSchedule = useConfirmScheduleSwap();

  const respondToReschedule = useRespondToReschedule();

  const startSession = useStartSwapSession();

  const completeSession = useCompleteSwapSession();

  const cancelSession = useCancelSwapSession();

  /*
   * ============================================================
   * RATING
   *
   * Only the learner needs to check their rating.
   * The mentor does not need this query.
   * ============================================================
   */

  const { data: existingRating, isLoading: isRatingLoading } = useSwapRating(
    swap.id,
  );

  /*
   * ============================================================
   * ROLE
   * ============================================================
   */

  const isLearner = swap.learner_auth_user_id === currentUserId;

  const isMentor = swap.mentor_auth_user_id === currentUserId;

  /*
   * ============================================================
   * OTHER USER
   * ============================================================
   */

  const otherUserId = isLearner
    ? swap.mentor_auth_user_id
    : swap.learner_auth_user_id;

  const otherUserName = isLearner ? swap.mentor_name : swap.learner_name;

  const otherUserImage = isLearner
    ? swap.mentor_profile_img
    : swap.learner_profile_img;

  const otherUserRole = isLearner ? "Mentor" : "Learner";

  /*
   * ============================================================
   * START SESSION
   *
   * ONLY MENTOR CAN START THE SESSION.
   * ============================================================
   */

  const handleStartSession = async () => {
    if (!isMentor) {
      return;
    }

    try {
      await startSession.mutateAsync(swap.id);

      alert("Session started successfully!");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to start session.",
      );
    }
  };

  /*
   * ============================================================
   * JOIN SESSION
   * ============================================================
   */

  const handleJoinSession = () => {
    if (swap.status !== "in_progress") {
      return;
    }

    router.push(`/swaps/${swap.id}/session`);
  };

  /*
   * ============================================================
   * CANCEL SESSION
   * ============================================================
   */

  const handleCancelSession = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this session?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await cancelSession.mutateAsync(swap.id);

      alert("Session cancelled successfully!");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to cancel session.",
      );
    }
  };

  /*
   * ============================================================
   * MENTOR CONFIRMS LEARNER'S REQUEST
   *
   * schedule_requested
   *        ↓
   * scheduled
   * ============================================================
   */

  const handleConfirmSchedule = async () => {
    const confirmed = window.confirm("Confirm this requested session time?");

    if (!confirmed) {
      return;
    }

    try {
      await confirmSchedule.mutateAsync(swap.id);

      alert("Session confirmed successfully!");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to confirm session.",
      );
    }
  };

  /*
   * ============================================================
   * LEARNER ACCEPTS MENTOR'S NEW TIME
   *
   * mentor_reschedule_proposed
   *        ↓
   * scheduled
   * ============================================================
   */

  const handleAcceptReschedule = async () => {
    const confirmed = window.confirm("Accept this new session time?");

    if (!confirmed) {
      return;
    }

    try {
      await respondToReschedule.mutateAsync({
        swapId: swap.id,
        accept: true,
      });

      alert("New session time accepted!");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to accept the new time.",
      );
    }
  };

  /*
   * ============================================================
   * LEARNER REJECTS MENTOR'S NEW TIME
   *
   * mentor_reschedule_proposed
   *        ↓
   * accepted
   * ============================================================
   */

  const handleRejectReschedule = async () => {
    const confirmed = window.confirm(
      "Reject this proposed time? You will be able to request another time.",
    );

    if (!confirmed) {
      return;
    }

    try {
      await respondToReschedule.mutateAsync({
        swapId: swap.id,
        accept: false,
      });

      alert("New time rejected. You can request another session time.");
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Failed to reject the new time.",
      );
    }
  };

  /*
   * ============================================================
   * COMPLETE SESSION
   * ============================================================
   */

  const handleCompleteSession = async () => {
    try {
      await completeSession.mutateAsync(swap.id);

      alert("Session completed successfully!");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to complete session.",
      );
    }
  };

  /*
   * ============================================================
   * STATUS
   * ============================================================
   */

  const formattedStatus = swap.status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

  const isSchedulingActionPending =
    confirmSchedule.isPending || respondToReschedule.isPending;

  const isSessionActionPending =
    startSession.isPending || cancelSession.isPending;

  /*
   * ============================================================
   * STATUS CONFIG
   * ============================================================
   */

  const statusConfig = {
    accepted: {
      badge: "bg-gray-100 text-gray-700",
      accent: "bg-gray-400",
    },

    schedule_requested: {
      badge: "bg-blue-100 text-blue-700",
      accent: "bg-blue-500",
    },

    mentor_reschedule_proposed: {
      badge: "bg-purple-100 text-purple-700",
      accent: "bg-purple-500",
    },

    scheduled: {
      badge: "bg-green-100 text-green-700",
      accent: "bg-green-500",
    },

    in_progress: {
      badge: "bg-yellow-100 text-yellow-700",
      accent: "bg-yellow-500",
    },

    completed: {
      badge: "bg-emerald-100 text-emerald-700",
      accent: "bg-emerald-500",
    },

    cancelled: {
      badge: "bg-red-100 text-red-700",
      accent: "bg-red-500",
    },
  } as const;

  const currentStatusConfig =
    statusConfig[swap.status] ?? statusConfig.accepted;

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <>
      <article className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* ========================================================
            TOP ACCENT
        ======================================================== */}

        <div
          className={`absolute inset-x-0 top-0 h-1.5 ${currentStatusConfig.accent}`}
        />

        <div className="p-5 sm:p-6">
          {/* ======================================================
              HEADER
          ====================================================== */}

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${currentStatusConfig.badge}`}
                >
                  {formattedStatus}
                </span>

                {isLearner && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Learning
                  </span>
                )}

                {isMentor && (
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                    Teaching
                  </span>
                )}
              </div>

              <h3 className="mt-3 truncate text-xl font-bold text-gray-900">
                {swap.skill_name}
              </h3>
            </div>

            {/* TOKEN */}

            <div className="flex shrink-0 items-center gap-1.5 rounded-xl border border-yellow-200 bg-yellow-50 px-3 py-2 text-sm font-bold text-yellow-700">
              <Coins className="h-4 w-4" />

              <span>{swap.session_token_rate ?? swap.token_rate}</span>

              <span className="hidden sm:inline">token</span>
            </div>
          </div>

          {/* ======================================================
              USER
          ====================================================== */}

          <div className="mt-6 flex items-center justify-between rounded-2xl border border-gray-100 bg-gray-50/70 p-4">
            <div className="flex min-w-0 items-center gap-3">
              {otherUserImage ? (
                <Image
                  src={otherUserImage}
                  alt={otherUserName}
                  width={52}
                  height={52}
                  className="h-13 w-13 rounded-full border-2 border-white object-cover shadow-sm"
                />
              ) : (
                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full border-2 border-white bg-gray-200 shadow-sm">
                  <UserRound className="h-6 w-6 text-gray-500" />
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-900">
                  {otherUserName}
                </p>

                <p className="mt-0.5 text-sm text-gray-500">{otherUserRole}</p>
              </div>
            </div>

            <Link
              href={`/mentors/${otherUserId}`}
              className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-gray-600 transition hover:text-black sm:flex"
            >
              Profile
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* ======================================================
              ROLE DESCRIPTION
          ====================================================== */}

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {isLearner
                ? "You are learning this skill from your mentor."
                : "You are teaching this skill to your learner."}
            </p>
          </div>

          {/* ======================================================
              ACCEPTED
              ONLY LEARNER CAN REQUEST INITIAL SESSION TIME
          ====================================================== */}

          {isLearner && swap.status === "accepted" && (
            <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <Calendar className="h-5 w-5 text-gray-700" />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-900">
                    Session Time Required
                  </p>

                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Choose a session time based on your mentor&apos;s
                    availability.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => router.push(`/bookings/${swap.id}`)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <Calendar className="h-4 w-4" />
                Schedule Session
              </button>
            </div>
          )}

          {/* ======================================================
              SCHEDULE REQUESTED
          ====================================================== */}

          {swap.status === "schedule_requested" && (
            <div className="mt-5 space-y-4">
              {swap.proposed_scheduled_at && (
                <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                    <Calendar className="h-4 w-4" />
                    Requested Session Time
                  </div>

                  <p className="mt-2 font-semibold text-blue-700">
                    {new Date(swap.proposed_scheduled_at).toLocaleString()}
                  </p>

                  {swap.schedule_note && (
                    <div className="mt-3 flex items-start gap-2">
                      <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />

                      <p className="text-sm leading-5 text-blue-700">
                        {swap.schedule_note}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* LEARNER */}

              {isLearner && (
                <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <Loader2 className="h-4 w-4 text-blue-600" />
                    </div>

                    <div>
                      <p className="font-semibold text-blue-800">
                        Waiting for mentor confirmation
                      </p>

                      <p className="mt-1 text-sm leading-5 text-blue-700">
                        Your requested time has been sent to {swap.mentor_name}.
                        The session will only become scheduled after your mentor
                        confirms it.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* MENTOR */}

              {isMentor && (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleConfirmSchedule}
                    disabled={isSchedulingActionPending}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {confirmSchedule.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Confirm Session
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRescheduleOpen(true)}
                    disabled={isSchedulingActionPending}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Calendar className="h-4 w-4" />
                    Suggest Another Time
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ======================================================
              MENTOR RESCHEDULE PROPOSED
          ====================================================== */}

          {swap.status === "mentor_reschedule_proposed" && (
            <div className="mt-5 space-y-4">
              {swap.proposed_scheduled_at && (
                <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-purple-800">
                    <Calendar className="h-4 w-4" />
                    Mentor Proposed New Time
                  </div>

                  <p className="mt-2 font-semibold text-purple-700">
                    {new Date(swap.proposed_scheduled_at).toLocaleString()}
                  </p>

                  {swap.schedule_note && (
                    <div className="mt-3 flex items-start gap-2">
                      <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />

                      <p className="text-sm leading-5 text-purple-700">
                        {swap.schedule_note}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* LEARNER */}

              {isLearner && (
                <div>
                  <p className="mb-3 text-sm text-gray-600">
                    Your mentor suggested a different session time. Please
                    accept or reject the proposal.
                  </p>

                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleAcceptReschedule}
                      disabled={isSchedulingActionPending}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {respondToReschedule.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          Accept New Time
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleRejectReschedule}
                      disabled={isSchedulingActionPending}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {respondToReschedule.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <X className="h-4 w-4" />
                          Reject New Time
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* MENTOR */}

              {isMentor && (
                <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                  <p className="font-semibold text-purple-800">
                    Waiting for learner confirmation
                  </p>

                  <p className="mt-1 text-sm leading-5 text-purple-700">
                    The learner needs to accept your proposed time before the
                    session is scheduled.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ======================================================
              SCHEDULED
              ONLY MENTOR CAN START
          ====================================================== */}

          {swap.status === "scheduled" && (
            <div className="mt-5 space-y-3">
              {/* SESSION TIME */}

              <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-green-800">
                      Scheduled Session
                    </p>

                    {swap.scheduled_at && (
                      <p className="mt-1 text-sm font-medium text-green-700">
                        {new Date(swap.scheduled_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* MENTOR */}

              {isMentor && (
                <button
                  type="button"
                  onClick={handleStartSession}
                  disabled={isSessionActionPending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {startSession.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Starting Session...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 fill-current" />
                      Start Session
                    </>
                  )}
                </button>
              )}

              {/* LEARNER */}

              {isLearner && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Video className="h-5 w-5 text-gray-500" />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        Session Not Started
                      </p>

                      <p className="mt-1 text-sm leading-5 text-gray-500">
                        Your mentor has not started the session yet. The Join
                        Session button will appear when your mentor starts the
                        session.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* LEARNER RESCHEDULE */}

              {isLearner && (
                <button
                  type="button"
                  onClick={() => router.push(`/bookings/${swap.id}`)}
                  disabled={isSessionActionPending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Calendar className="h-4 w-4" />
                  Reschedule Session
                </button>
              )}

              {/* CANCEL */}

              <button
                type="button"
                onClick={handleCancelSession}
                disabled={isSessionActionPending}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelSession.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Cancelling...
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    Cancel Session
                  </>
                )}
              </button>
            </div>
          )}

          {/* ======================================================
              IN PROGRESS
              BOTH USERS CAN JOIN
          ====================================================== */}

          {swap.status === "in_progress" && (
            <div className="mt-5 space-y-3">
              {/* SESSION STARTED */}

              <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Video className="h-5 w-5 text-yellow-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-yellow-800">
                      Session In Progress
                    </p>

                    {swap.started_at && (
                      <p className="mt-1 text-sm text-yellow-700">
                        Started {new Date(swap.started_at).toLocaleString()}
                      </p>
                    )}

                    <p className="mt-1 text-sm text-yellow-700">
                      Your mentor has started the session. You can join now.
                    </p>
                  </div>
                </div>
              </div>

              {/* JOIN BUTTON */}

              <button
                type="button"
                onClick={handleJoinSession}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                <Video className="h-4 w-4" />
                Join Session
              </button>

              {/* COMPLETE SESSION */}

              <button
                type="button"
                disabled={completeSession.isPending}
                onClick={handleCompleteSession}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {completeSession.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Completing...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Complete Session
                  </>
                )}
              </button>
            </div>
          )}

          {/* ======================================================
              COMPLETED
          ====================================================== */}

          {swap.status === "completed" && (
            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>

                  <div>
                    <p className="font-semibold text-green-800">
                      Session Completed
                    </p>

                    {swap.completed_at && (
                      <p className="mt-1 text-sm text-green-700">
                        Completed {new Date(swap.completed_at).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ==================================================
                  ONLY LEARNER RATES MENTOR
              ================================================== */}

              {isLearner && (
                <button
                  type="button"
                  onClick={() => setIsRatingOpen(true)}
                  disabled={isRatingLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isRatingLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Checking Rating...
                    </>
                  ) : existingRating ? (
                    <>
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      Rated {existingRating.rating}/5 · Edit Rating
                    </>
                  ) : (
                    <>
                      <Star className="h-4 w-4" />
                      Rate Mentor
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* ======================================================
              CANCELLED
          ====================================================== */}

          {swap.status === "cancelled" && (
            <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>

                <div>
                  <p className="font-semibold text-red-800">
                    Session Cancelled
                  </p>

                  {swap.cancelled_at && (
                    <p className="mt-1 text-sm text-red-700">
                      Cancelled {new Date(swap.cancelled_at).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================
              MOBILE PROFILE
          ====================================================== */}

          <Link
            href={`/mentors/${otherUserId}`}
            className="mt-5 flex items-center justify-center gap-1 text-sm font-semibold text-gray-500 transition hover:text-black sm:hidden"
          >
            <UserRound className="h-4 w-4" />
            View Profile
          </Link>
        </div>
      </article>

      {/* ============================================================
          MENTOR: SUGGEST ANOTHER TIME MODAL

          IMPORTANT:
          This stays OUTSIDE article because article has
          hover:-translate-y-1.
      ============================================================ */}

      {isRescheduleOpen && isMentor && (
        <RescheduleSessionModal
          swapId={swap.id}
          skillName={swap.skill_name}
          mentorAuthUserId={swap.mentor_auth_user_id}
          onClose={() => setIsRescheduleOpen(false)}
        />
      )}

      {/* ============================================================
          RATE MENTOR MODAL

          Also outside article to prevent modal flickering.
      ============================================================ */}

      {isRatingOpen && (
        <RateMentorModal
          swapId={swap.id}
          mentorName={swap.mentor_name}
          skillName={swap.skill_name}
          existingRating={existingRating}
          onClose={() => setIsRatingOpen(false)}
        />
      )}
    </>
  );
};

export default SwapCard;
