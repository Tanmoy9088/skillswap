import {
  Calendar,
  Check,
  Loader2,
  MessageCircle,
  Play,
  Star,
  Video,
  X,
  XCircle,
} from "lucide-react";

import type { Swap } from "@/types/types/swaps";

interface SwapCardStatusContentProps {
  swap: Swap;
  isLearner: boolean;
  isMentor: boolean;
  isSchedulingActionPending: boolean;
  isSessionActionPending: boolean;
  isRatingLoading: boolean;
  existingRating:
    | {
        rating: number;
      }
    | null
    | undefined;
  onScheduleSession: () => void;
  onConfirmSchedule: () => void;
  onOpenReschedule: () => void;
  onAcceptReschedule: () => void;
  onRejectReschedule: () => void;
  onStartSession: () => void;
  onJoinSession: () => void;
  onCancelSession: () => void;
  onCompleteSession: () => void;
  onOpenRating: () => void;
  confirmSchedulePending: boolean;
  respondToReschedulePending: boolean;
  startSessionPending: boolean;
  cancelSessionPending: boolean;
  completeSessionPending: boolean;
}

export default function SwapCardStatusContent({
  swap,
  isLearner,
  isMentor,
  isSchedulingActionPending,
  isSessionActionPending,
  isRatingLoading,
  existingRating,
  onScheduleSession,
  onConfirmSchedule,
  onOpenReschedule,
  onAcceptReschedule,
  onRejectReschedule,
  onStartSession,
  onJoinSession,
  onCancelSession,
  onCompleteSession,
  onOpenRating,
  confirmSchedulePending,
  respondToReschedulePending,
  startSessionPending,
  cancelSessionPending,
  completeSessionPending,
}: SwapCardStatusContentProps) {
  return (
    <>
      {/* ACCEPTED */}

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
                Choose a session time based on your mentor&apos;s availability.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onScheduleSession}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            <Calendar className="h-4 w-4" />
            Schedule Session
          </button>
        </div>
      )}

      {/* SCHEDULE REQUESTED */}

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
                    Your requested time has been sent to {swap.mentor_name}. The
                    session will only become scheduled after your mentor
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
                onClick={onConfirmSchedule}
                disabled={isSchedulingActionPending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {confirmSchedulePending ? (
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
                onClick={onOpenReschedule}
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

      {/* MENTOR RESCHEDULE PROPOSED */}

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
                Your mentor suggested a different session time. Please accept or
                reject the proposal.
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={onAcceptReschedule}
                  disabled={isSchedulingActionPending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {respondToReschedulePending ? (
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
                  onClick={onRejectReschedule}
                  disabled={isSchedulingActionPending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {respondToReschedulePending ? (
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

      {/* SCHEDULED */}

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
              onClick={onStartSession}
              disabled={isSessionActionPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {startSessionPending ? (
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
              onClick={onScheduleSession}
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
            onClick={onCancelSession}
            disabled={isSessionActionPending}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelSessionPending ? (
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

      {/* IN PROGRESS */}

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
            onClick={onJoinSession}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            <Video className="h-4 w-4" />
            Join Session
          </button>

          {/* COMPLETE SESSION */}

          <button
            type="button"
            disabled={completeSessionPending}
            onClick={onCompleteSession}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {completeSessionPending ? (
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

      {/* COMPLETED */}

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

          {/* ONLY LEARNER RATES MENTOR */}

          {isLearner && (
            <button
              type="button"
              onClick={onOpenRating}
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

      {/* CANCELLED */}

      {swap.status === "cancelled" && (
        <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>

            <div>
              <p className="font-semibold text-red-800">Session Cancelled</p>

              {swap.cancelled_at && (
                <p className="mt-1 text-sm text-red-700">
                  Cancelled {new Date(swap.cancelled_at).toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
