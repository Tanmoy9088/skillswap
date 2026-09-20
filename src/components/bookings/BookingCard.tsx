import { CheckCircle2, Clock, Coins, Video, XCircle } from "lucide-react";
import { BookingSwap } from "../../app/(user)/bookings/page";

type BookingStatus = "scheduled" | "in_progress" | "completed" | "cancelled";
const statusStyles: Record<BookingStatus, string> = {
  scheduled: "bg-indigo-50 text-indigo-700",
  in_progress: "bg-orange-50 text-orange-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

const statusLabels: Record<BookingStatus, string> = {
  scheduled: "Scheduled",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

interface BookingCardProps {
  swap: BookingSwap;
}

const formatDateTime = (date: string) => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const BookingCard = ({ swap }: BookingCardProps) => {
  const status = swap.status as BookingStatus;

  const statusClass = statusStyles[status] ?? "bg-gray-100 text-gray-600";

  const statusLabel = statusLabels[status] ?? swap.status.replace(/_/g, " ");

  const isUpcoming = status === "scheduled" || status === "in_progress";

  const isCompleted = status === "completed";

  const isCancelled = status === "cancelled";

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* =====================================================
          CARD HEADER
      ====================================================== */}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Video className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-bold text-gray-900">
                {swap.skill_name}
              </h3>

              <p className="mt-1 truncate text-sm text-gray-500">
                with {swap.mentor_name}
              </p>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
          >
            {statusLabel}
          </span>
        </div>

        {/* =====================================================
            DETAILS
        ====================================================== */}

        <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
          {/* TOKEN COST */}

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Token cost</span>

            <span className="flex items-center gap-1 font-semibold text-gray-800">
              <Coins className="h-4 w-4 text-indigo-600" />
              {Number(swap.token_rate ?? 0).toLocaleString()}
            </span>
          </div>

          {/* SCHEDULED DATE */}

          {swap.scheduled_at && (
            <div className="flex items-start justify-between gap-4 text-sm">
              <span className="text-gray-500">
                {isCompleted
                  ? "Session"
                  : isCancelled
                    ? "Scheduled"
                    : "Scheduled"}
              </span>

              <span className="text-right font-medium text-gray-800">
                {formatDateTime(swap.scheduled_at)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      {isUpcoming && (
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Clock className="h-4 w-4 text-indigo-600" />

            {status === "scheduled"
              ? "Your session is scheduled."
              : "Your session is currently in progress."}
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="border-t border-green-100 bg-green-50 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-medium text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            Session completed
          </div>
        </div>
      )}

      {isCancelled && (
        <div className="border-t border-red-100 bg-red-50 px-5 py-4">
          <div className="flex items-center gap-2 text-sm font-medium text-red-700">
            <XCircle className="h-4 w-4" />
            Session cancelled
          </div>
        </div>
      )}
    </article>
  );
};

export default BookingCard;
