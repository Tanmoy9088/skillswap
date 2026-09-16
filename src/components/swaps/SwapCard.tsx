"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { UserRound } from "lucide-react";
import { toast } from "sonner";

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

interface SwapCardProps {
  swap: Swap;
  currentUserId: string;
}

const SwapCard = ({ swap, currentUserId }: SwapCardProps) => {
  const router = useRouter();

  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const confirmSchedule = useConfirmScheduleSwap();
  const respondToReschedule = useRespondToReschedule();
  const startSession = useStartSwapSession();
  const completeSession = useCompleteSwapSession();
  const cancelSession = useCancelSwapSession();

  const { data: existingRating, isLoading: isRatingLoading } = useSwapRating(
    swap.id,
  );

  const isLearner = swap.learner_auth_user_id === currentUserId;
  const isMentor = swap.mentor_auth_user_id === currentUserId;

  const otherUserId = isLearner
    ? swap.mentor_auth_user_id
    : swap.learner_auth_user_id;

  const otherUserName = isLearner ? swap.mentor_name : swap.learner_name;

  const otherUserImage = isLearner
    ? swap.mentor_profile_img
    : swap.learner_profile_img;

  const otherUserRole = isLearner ? "Mentor" : "Learner";

  const showConfirmation = (
    message: string,
    onConfirm: () => void | Promise<void>,
  ) => {
    toast.custom(
      (toastId) => (
        <div className="w-90 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
          <p className="text-sm font-medium text-gray-900">{message}</p>

          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => toast.dismiss(toastId)}
              className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={async () => {
                toast.dismiss(toastId);
                await onConfirm();
              }}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Confirm
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      },
    );
  };

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

  const handleJoinSession = () => {
    if (swap.status !== "in_progress") {
      return;
    }

    router.push(`/swaps/${swap.id}/session`);
  };

  const handleCancelSession = () => {
    showConfirmation(
      "Are you sure you want to cancel this session?",
      async () => {
        try {
          await cancelSession.mutateAsync(swap.id);

          toast.success("Session cancelled successfully!");
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to cancel session.",
          );
        }
      },
    );
  };

  const handleConfirmSchedule = () => {
    showConfirmation("Confirm this requested session time?", async () => {
      try {
        await confirmSchedule.mutateAsync(swap.id);

        toast.success("Session confirmed successfully!");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to confirm session.",
        );
      }
    });
  };

  const handleAcceptReschedule = () => {
    showConfirmation("Accept this new session time?", async () => {
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
    });
  };

  const handleRejectReschedule = () => {
    showConfirmation(
      "Reject this proposed time? You will be able to request another time.",
      async () => {
        try {
          await respondToReschedule.mutateAsync({
            swapId: swap.id,
            accept: false,
          });

          toast.success(
            "New time rejected. You can request another session time.",
          );
        } catch (error) {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to reject the new time.",
          );
        }
      },
    );
  };

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

  const handleScheduleSession = () => {
    router.push(`/bookings/${swap.id}`);
  };

  const formattedStatus = swap.status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());

  const isSchedulingActionPending =
    confirmSchedule.isPending || respondToReschedule.isPending;

  const isSessionActionPending =
    startSession.isPending || cancelSession.isPending;

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

  return (
    <>
      <article className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div
          className={`absolute inset-x-0 top-0 h-1.5 ${currentStatusConfig.accent}`}
        />

        <div className="p-5 sm:p-6">
          <SwapCardHeader
            swap={swap}
            isLearner={isLearner}
            isMentor={isMentor}
            formattedStatus={formattedStatus}
            statusConfig={currentStatusConfig}
          />

          <SwapCardUser
            userId={otherUserId}
            userName={otherUserName}
            userImage={otherUserImage}
            userRole={otherUserRole}
          />

          <div className="mt-4">
            <p className="text-sm text-gray-500">
              {isLearner
                ? "You are learning this skill from your mentor."
                : "You are teaching this skill to your learner."}
            </p>
          </div>

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

          <Link
            href={`/mentors/${otherUserId}`}
            className="mt-5 flex items-center justify-center gap-1 text-sm font-semibold text-gray-500 transition hover:text-black sm:hidden"
          >
            <UserRound className="h-4 w-4" />
            View Profile
          </Link>
        </div>
      </article>

      {isRescheduleOpen && isMentor && (
        <RescheduleSessionModal
          swapId={swap.id}
          skillName={swap.skill_name}
          mentorAuthUserId={swap.mentor_auth_user_id}
          onClose={() => setIsRescheduleOpen(false)}
        />
      )}

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
