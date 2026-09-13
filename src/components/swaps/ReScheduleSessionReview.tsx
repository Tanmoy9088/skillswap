import { CheckCircle2, Loader2 } from "lucide-react";

interface RescheduleSessionReviewProps {
  skillName: string;
  formattedDate: string;
  time: string;
  availabilityText: string;
  isPending: boolean;
  onBack: () => void;
  onConfirm: () => void;
  formatTime: (time: string) => string;
}

const RescheduleSessionReview = ({
  skillName,
  formattedDate,
  time,
  availabilityText,
  isPending,
  onBack,
  onConfirm,
  formatTime,
}: RescheduleSessionReviewProps) => {
  return (
    <div className="mt-6 space-y-5">
      <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
        <h3 className="mb-4 font-semibold text-purple-900">
          New Session Details
        </h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Skill</span>

            <span className="text-right font-medium text-gray-900">
              {skillName}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Date</span>

            <span className="text-right font-medium text-gray-900">
              {formattedDate}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Time</span>

            <span className="font-medium text-gray-900">
              {formatTime(time)}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Availability</span>

            <span className="text-right font-medium text-gray-900">
              {availabilityText}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
        <p className="font-semibold">Learner confirmation required</p>

        <p className="mt-1">
          This does not schedule the session immediately. The learner must
          accept your proposed time first.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isPending}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={onConfirm}
          disabled={isPending}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Send Proposal
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RescheduleSessionReview;
