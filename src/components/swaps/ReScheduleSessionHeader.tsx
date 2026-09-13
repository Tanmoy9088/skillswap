import { Calendar, CheckCircle2, X } from "lucide-react";

interface RescheduleSessionHeaderProps {
  step: "select" | "review";
  skillName: string;
  isPending: boolean;
  onClose: () => void;
}

const RescheduleSessionHeader = ({
  step,
  skillName,
  isPending,
  onClose,
}: RescheduleSessionHeaderProps) => {
  const isReviewing = step === "review";

  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-2">
          {isReviewing ? (
            <CheckCircle2 className="h-5 w-5 text-purple-600" />
          ) : (
            <Calendar className="h-5 w-5 text-purple-600" />
          )}

          <h2
            id="reschedule-modal-title"
            className="text-xl font-semibold text-gray-900"
          >
            {isReviewing ? "Review New Time" : "Suggest Another Time"}
          </h2>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          {isReviewing
            ? "Review the new session time before sending it to the learner."
            : `Suggest a different time for your ${skillName} session.`}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        disabled={isPending}
        aria-label="Close modal"
        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default RescheduleSessionHeader;
