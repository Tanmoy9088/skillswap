import Image from "next/image";
import { Eye, Search } from "lucide-react";

import type { AdminSession } from "@/lib/admin";

interface SessionsTableProps {
  sessions: AdminSession[];
  onView: (session: AdminSession) => void;
}

const statusStyles: Record<string, string> = {
  accepted: "bg-blue-100 text-blue-700",
  scheduled: "bg-indigo-100 text-indigo-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const SessionsTable = ({ sessions, onView }: SessionsTableProps) => {
  if (sessions.length === 0) {
    return (
      <div className="flex min-h-60 flex-col items-center justify-center p-8 text-center">
        <Search className="h-10 w-10 text-gray-300" />

        <h2 className="mt-4 font-semibold text-gray-900">
          No matching sessions
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Try searching for a different skill, user, category or status.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-275 text-left text-sm">
        <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-6 py-4 font-semibold">Skill</th>
            <th className="px-6 py-4 font-semibold">Mentor</th>
            <th className="px-6 py-4 font-semibold">Learner</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Token Rate</th>
            <th className="px-6 py-4 font-semibold">Scheduled</th>
            <th className="px-6 py-4 font-semibold">Created</th>
            <th className="px-6 py-4 text-right font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {sessions.map((session) => (
            <tr key={session.id} className="transition hover:bg-gray-50">
              <td className="px-6 py-4">
                <div>
                  <p className="font-semibold text-gray-900">
                    {session.skill_name || "Unknown skill"}
                  </p>

                  {session.category && (
                    <p className="mt-1 text-xs text-gray-500">
                      {session.category}
                    </p>
                  )}
                </div>
              </td>

              <td className="px-6 py-4">
                <UserCell
                  image={session.mentor_profile_img}
                  name={session.mentor_name}
                  fallback="M"
                />
              </td>

              <td className="px-6 py-4">
                <UserCell
                  image={session.learner_profile_img}
                  name={session.learner_name}
                  fallback="L"
                  fallbackClassName="bg-orange-100 text-orange-600"
                />
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    statusStyles[session.status] || "bg-gray-100 text-gray-700"
                  }`}
                >
                  {session.status.replace("_", " ")}
                </span>
              </td>

              <td className="px-6 py-4 font-semibold text-indigo-600">
                {session.token_rate != null
                  ? `${session.token_rate} tokens`
                  : "—"}
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-gray-600">
                {session.scheduled_at
                  ? new Date(session.scheduled_at).toLocaleString()
                  : "Not scheduled"}
              </td>

              <td className="whitespace-nowrap px-6 py-4 text-gray-500">
                {new Date(session.created_at).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onView(session)}
                  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                >
                  <Eye size={16} />
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface UserCellProps {
  image: string | null;
  name: string | null;
  fallback: string;
  fallbackClassName?: string;
}

const UserCell = ({
  image,
  name,
  fallback,
  fallbackClassName = "bg-indigo-100 text-indigo-600",
}: UserCellProps) => {
  return (
    <div className="flex items-center gap-3">
      {image ? (
        <Image
          src={image}
          alt={name || "User"}
          width={36}
          height={36}
          className="h-9 w-9 rounded-full object-cover"
        />
      ) : (
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full font-semibold ${fallbackClassName}`}
        >
          {name?.charAt(0).toUpperCase() || fallback}
        </div>
      )}

      <span className="font-medium text-gray-800">
        {name || "Unknown user"}
      </span>
    </div>
  );
};

export default SessionsTable;
