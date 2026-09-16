"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { UserRound } from "lucide-react";

import RescheduleSessionModal from "@/components/swaps/RescheduleSessionModal";
import RateMentorModal from "@/components/swaps/RateMentorModal";
import SwapCardHeader from "@/components/swaps/SwapCardHeader";
import SwapCardUser from "@/components/swaps/SwapCardUser";
import SwapCardStatusContent from "@/components/swaps/SwapCardStatusContent";

import { useConfirmScheduleSwap } from "@/hooks/skills/useConfirmScheduleSwap";
import { useRespondToReschedule } from "@/hooks/skills/useRespondToReschedule";
import { useStartSwapSession } from "@/hooks/skills/useStartSwapSession";
import { useCompleteSwapSession } from "@/hooks/skills/useCompleteSwapSession";
import { useCancelSwapSession } from "@/hooks/skills/useCancelSwapSession";
import { useSwapRating } from "@/hooks/skills/useSwapRating";

import type { Swap } from "@/types/types/swaps";
import { toast } from "sonner";

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
   * ============================================================
   */

  const handleStartSession = async () => {
    if (!isMentor) {
      return;
    }

    try {
      await startSession.mutateAsync(swap.id);

      toast.success("Session started successfully!");
    } catch (error) {
      toast.error(
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

      toast.success("Session cancelled successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to cancel session.",
      );
    }
  };

  /*
   * ============================================================
   * MENTOR CONFIRMS LEARNER'S REQUEST
   * ============================================================
   */

  const handleConfirmSchedule = async () => {
    const confirmed = window.confirm("Confirm this requested session time?");

    if (!confirmed) {
      return;
    }

    try {
      await confirmSchedule.mutateAsync(swap.id);

      toast.success("Session confirmed successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to confirm session.",
      );
    }
  };

  /*
   * ============================================================
   * LEARNER ACCEPTS MENTOR'S NEW TIME
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

      toast.success("New session time accepted!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to accept the new time.",
      );
    }
  };

  /*
   * ============================================================
   * LEARNER REJECTS MENTOR'S NEW TIME
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

      toast.success("New time rejected. You can request another session time.");
    } catch (error) {
      toast.error(
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

      toast.success("Session completed successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to complete session.",
      );
    }
  };

  /*
   * ============================================================
   * NAVIGATION
   * ============================================================
   */

  const handleScheduleSession = () => {
    router.push(`/bookings/${swap.id}`);
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
        {/* TOP ACCENT */}

        <div
          className={`absolute inset-x-0 top-0 h-1.5 ${currentStatusConfig.accent}`}
        />

        <div className="p-5 sm:p-6">
          {/* HEADER */}

          <SwapCardHeader
            swap={swap}
            isLearner={isLearner}
            isMentor={isMentor}
            formattedStatus={formattedStatus}
            statusConfig={currentStatusConfig}
          />

          {/* USER */}

          <SwapCardUser
            userId={otherUserId}
            userName={otherUserName}
            userImage={otherUserImage}
            userRole={otherUserRole}
          />

          {/* ROLE DESCRIPTION */}

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {isLearner
                ? "You are learning this skill from your mentor."
                : "You are teaching this skill to your learner."}
            </p>
          </div>

          {/* STATUS CONTENT */}

          <SwapCardStatusContent
            swap={swap}
            isLearner={isLearner}
            isMentor={isMentor}
            isSchedulingActionPending={isSchedulingActionPending}
            isSessionActionPending={isSessionActionPending}
            isRatingLoading={isRatingLoading}
            existingRating={existingRating}
            onScheduleSession={handleScheduleSession}
            onConfirmSchedule={handleConfirmSchedule}
            onOpenReschedule={() => setIsRescheduleOpen(true)}
            onAcceptReschedule={handleAcceptReschedule}
            onRejectReschedule={handleRejectReschedule}
            onStartSession={handleStartSession}
            onJoinSession={handleJoinSession}
            onCancelSession={handleCancelSession}
            onCompleteSession={handleCompleteSession}
            onOpenRating={() => setIsRatingOpen(true)}
            confirmSchedulePending={confirmSchedule.isPending}
            respondToReschedulePending={respondToReschedule.isPending}
            startSessionPending={startSession.isPending}
            cancelSessionPending={cancelSession.isPending}
            completeSessionPending={completeSession.isPending}
          />

          {/* MOBILE PROFILE */}

          <Link
            href={`/mentors/${otherUserId}`}
            className="mt-5 flex items-center justify-center gap-1 text-sm font-semibold text-gray-500 transition hover:text-black sm:hidden"
          >
            <UserRound className="h-4 w-4" />
            View Profile
          </Link>
        </div>
      </article>

      {/* MENTOR: SUGGEST ANOTHER TIME MODAL */}

      {isRescheduleOpen && isMentor && (
        <RescheduleSessionModal
          swapId={swap.id}
          skillName={swap.skill_name}
          mentorAuthUserId={swap.mentor_auth_user_id}
          onClose={() => setIsRescheduleOpen(false)}
        />
      )}

      {/* RATE MENTOR MODAL */}

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
