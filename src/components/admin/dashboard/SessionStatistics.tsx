type SessionStatisticsProps = {
  activeSessions: number;
  completedSessions: number;
  cancelledSessions: number;
};

const SessionStatistics = ({
  activeSessions,
  completedSessions,
  cancelledSessions,
}: SessionStatisticsProps) => {
  return (
    <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div>
        <h2 className="font-semibold text-gray-900">Session Statistics</h2>

        <p className="mt-1 text-sm text-gray-500">
          Additional real-time session metrics
        </p>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Active Sessions</p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {activeSessions}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Completed Sessions</p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {completedSessions}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Cancelled Sessions</p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {cancelledSessions}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SessionStatistics;
