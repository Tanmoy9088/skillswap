import { Calendar, CheckCircle2, X } from "lucide-react";

interface ScheduleSessionHeaderProps {
  isConfirming: boolean;
  skillName: string;
  onClose: () => void;
  isPending: boolean;
}

const ScheduleSessionHeader = ({
  isConfirming,
  skillName,
  onClose,
  isPending,
}: ScheduleSessionHeaderProps) => {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2">
          {isConfirming ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <Calendar className="h-5 w-5" />
          )}

          <h2 className="text-xl font-semibold">
            {isConfirming ? "Confirm Session" : "Schedule Session"}
          </h2>
        </div>

        <p className="mt-1 text-sm text-gray-500">
          {isConfirming
            ? "Review your session details before confirming."
            : `Schedule your ${skillName} session.`}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        disabled={isPending}
        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default ScheduleSessionHeader;
