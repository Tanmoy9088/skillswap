"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Coins, Star, UserRound } from "lucide-react";

import ScheduleSessionModal from "@/components/swaps/ScheduleSessionModal";
import { useStartSwapSession } from "@/hooks/skills/useStartSwapSession";
import { useCompleteSwapSession } from "@/hooks/skills/useCompleteSwapSession";
import RateMentorModal from "@/components/swaps/RateMentorModal";

import type { Swap } from "@/types/types/swaps";

interface SwapCardProps {
  swap: Swap;
  currentUserId: string;
}

const SwapCard = ({ swap, currentUserId }: SwapCardProps) => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const startSession = useStartSwapSession();
  const completeSession = useCompleteSwapSession();

  const isLearner = swap.learner_auth_user_id === currentUserId;

  const otherUserId = isLearner
    ? swap.mentor_auth_user_id
    : swap.learner_auth_user_id;

  const otherUserName = isLearner ? swap.mentor_name : swap.learner_name;

  const otherUserImage = isLearner
    ? swap.mentor_profile_img
    : swap.learner_profile_img;

  const otherUserRole = isLearner ? "Mentor" : "Learner";

  const handleStartSession = async () => {
    try {
      await startSession.mutateAsync(swap.id);

      alert("Session started successfully!");
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "Failed to start session.",
      );
    }
  };

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
            {swap.status.replace("_", " ")}
          </span>

          <h3 className="mt-3 text-xl font-bold text-gray-900">
            {swap.skill_name}
          </h3>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-3 py-2 text-sm font-semibold text-yellow-700">
          <Coins className="h-4 w-4" />
          {swap.token_rate} token
        </div>
      </div>

      {/* Other User */}
      <div className="mt-6 flex items-center gap-3">
        {otherUserImage ? (
          <Image
            src={otherUserImage || "/image.png"}
            alt={otherUserName}
            className="h-12 w-12 rounded-full object-cover"
            width={40}
            height={40}
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <UserRound className="h-6 w-6 text-gray-500" />
          </div>
        )}

        <div>
          <p className="font-semibold text-gray-900">{otherUserName}</p>

          <p className="text-sm text-gray-500">{otherUserRole}</p>
        </div>
      </div>

      {/* Role */}
      <div className="mt-5 rounded-xl bg-gray-50 p-4">
        <p className="text-sm text-gray-600">
          {isLearner
            ? "You are learning this skill."
            : "You are teaching this skill."}
        </p>
      </div>

      {/* Session Actions */}

      {/* Accepted → Schedule */}
      {swap.status === "accepted" && !swap.scheduled_at && (
        <button
          type="button"
          onClick={() => setIsScheduleOpen(true)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          <Calendar className="h-4 w-4" />
          Schedule Session
        </button>
      )}

      {/* Scheduled → Start */}
      {swap.status === "scheduled" && swap.scheduled_at && (
        <>
          <div className="mt-4 rounded-xl bg-green-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-green-800">
              <Calendar className="h-4 w-4" />
              Scheduled Session
            </div>

            <p className="mt-2 text-sm text-green-700">
              {new Date(swap.scheduled_at).toLocaleString()}
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartSession}
            disabled={startSession.isPending}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {startSession.isPending ? "Starting..." : "Start Session"}
          </button>
        </>
      )}

      {/* In Progress */}
      {/* In Progress */}
      {swap.status === "in_progress" && (
        <>
          <div className="mt-4 rounded-xl bg-yellow-50 p-4">
            <p className="font-semibold text-yellow-800">Session In Progress</p>

            {swap.started_at && (
              <p className="mt-1 text-sm text-yellow-700">
                Started {new Date(swap.started_at).toLocaleString()}
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={completeSession.isPending}
            onClick={async () => {
              try {
                await completeSession.mutateAsync(swap.id);

                alert("Session completed successfully!");
              } catch (error) {
                alert(
                  error instanceof Error
                    ? error.message
                    : "Failed to complete session.",
                );
              }
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {completeSession.isPending ? "Completing..." : "Complete Session"}
          </button>
        </>
      )}

      {/* Completed */}
      {swap.status === "completed" && (
        <>
          <div className="mt-4 rounded-xl bg-green-50 p-4">
            <p className="font-semibold text-green-800">Session Completed</p>

            {swap.completed_at && (
              <p className="mt-1 text-sm text-green-700">
                Completed {new Date(swap.completed_at).toLocaleString()}
              </p>
            )}
          </div>

          {isLearner && (
            <button
              type="button"
              onClick={() => setIsRatingOpen(true)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <Star className="h-4 w-4" />
              Rate Mentor
            </button>
          )}
        </>
      )}

      {/* Cancelled */}
      {swap.status === "cancelled" && (
        <div className="mt-4 rounded-xl bg-red-50 p-4">
          <p className="font-semibold text-red-800">Session Cancelled</p>
        </div>
      )}

      {/* Profile */}
      <Link
        href={`/mentors/${otherUserId}`}
        className="mt-3 block text-center text-sm font-medium text-gray-600 hover:text-black"
      >
        View Profile
      </Link>

      {/* Schedule Modal */}
      {isScheduleOpen && (
        <ScheduleSessionModal
          swapId={swap.id}
          skillName={swap.skill_name}
          onClose={() => setIsScheduleOpen(false)}
        />
      )}
      {/* Rate Mentor Modal */}
      {isRatingOpen && (
        <RateMentorModal
          swapId={swap.id}
          mentorName={swap.mentor_name}
          skillName={swap.skill_name}
          onClose={() => setIsRatingOpen(false)}
        />
      )}
    </article>
  );
};

export default SwapCard;
