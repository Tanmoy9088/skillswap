type RecentSession = {
  id: string;
  skill_name?: string | null;
  category?: string | null;
  learner_name?: string | null;
  mentor_name?: string | null;
  status: string;
  created_at: string;
};

type RecentSessionsProps = {
  sessions: RecentSession[];
};

const RecentSessions = ({ sessions }: RecentSessionsProps) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-50 text-green-700";

      case "cancelled":
        return "bg-red-50 text-red-700";

      case "in_progress":
        return "bg-purple-50 text-purple-700";

      case "scheduled":
        return "bg-blue-50 text-blue-700";

      default:
        return "bg-yellow-50 text-yellow-700";
    }
  };

  return (
    <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div>
        <h2 className="font-semibold text-gray-900">Recent Sessions</h2>

        <p className="mt-1 text-sm text-gray-500">
          Latest sessions created on SkillSwap+
        </p>
      </div>

      <div className="mt-5 overflow-x-auto">
        {sessions.length > 0 ? (
          <table className="w-full min-w-175 text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Skill
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Learner
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Mentor
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Status
                </th>

                <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((session) => (
                <tr
                  key={session.id}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {session.skill_name || "Unknown Skill"}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        {session.category || "Skill session"}
                      </p>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-gray-800">
                      {session.learner_name || "Unknown Learner"}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <p className="text-sm font-medium text-gray-800">
                      {session.mentor_name || "Unknown Mentor"}
                    </p>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                        session.status,
                      )}`}
                    >
                      {session.status.replace("_", " ")}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(session.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center text-sm text-gray-400">
            No sessions available
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentSessions;
