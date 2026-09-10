import { X, User, Calendar, Clock, Coins } from "lucide-react";

import type { AdminSession } from "@/lib/admin";

interface SessionDetailsModalProps {
  session: AdminSession | null;
  isCancelling: boolean;
  cancelError: string | null;
  onClose: () => void;
  onCancel: () => void;
}

const statusStyles: Record<string, string> = {
  accepted: "bg-blue-100 text-blue-700",
  scheduled: "bg-indigo-100 text-indigo-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const SessionDetailsModal = ({
  session,
  isCancelling,
  cancelError,
  onClose,
  onCancel,
}: SessionDetailsModalProps) => {
  if (!session) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Session Details</h2>
            <p className="mt-1 text-sm text-gray-500">
              View the complete session information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="rounded-xl bg-gray-50 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Skill
                </p>

                <h3 className="mt-1 text-xl font-bold text-gray-900">
                  {session.skill_name || "Unknown skill"}
                </h3>

                {session.category && (
                  <p className="mt-1 text-sm text-gray-500">
                    {session.category}
                  </p>
                )}
              </div>

              <span
                className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${
                  statusStyles[session.status] || "bg-gray-100 text-gray-700"
                }`}
              >
                {session.status.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <DetailItem
              icon={<User size={18} />}
              label="Mentor"
              value={session.mentor_name || "Unknown"}
            />

            <DetailItem
              icon={<User size={18} />}
              label="Learner"
              value={session.learner_name || "Unknown"}
            />

            <DetailItem
              icon={<Coins size={18} />}
              label="Token Rate"
              value={
                session.token_rate != null
                  ? `${session.token_rate} tokens`
                  : "Not available"
              }
            />

            <DetailItem
              icon={<Calendar size={18} />}
              label="Scheduled At"
              value={
                session.scheduled_at
                  ? new Date(session.scheduled_at).toLocaleString()
                  : "Not scheduled"
              }
            />

            <DetailItem
              icon={<Clock size={18} />}
              label="Started At"
              value={
                session.started_at
                  ? new Date(session.started_at).toLocaleString()
                  : "Not started"
              }
            />

            <DetailItem
              icon={<Clock size={18} />}
              label="Completed At"
              value={
                session.completed_at
                  ? new Date(session.completed_at).toLocaleString()
                  : "Not completed"
              }
            />

            {session.cancelled_at && (
              <DetailItem
                icon={<X size={18} />}
                label="Cancelled At"
                value={new Date(session.cancelled_at).toLocaleString()}
              />
            )}
          </div>

          {cancelError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {cancelError}
            </div>
          )}

          <div className="flex justify-end gap-3 border-t pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Back
            </button>

            {session.status === "scheduled" && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isCancelling}
                className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCancelling ? "Cancelling..." : "Cancel Session"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const DetailItem = ({ icon, label, value }: DetailItemProps) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-gray-400">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
};

export default SessionDetailsModal;
