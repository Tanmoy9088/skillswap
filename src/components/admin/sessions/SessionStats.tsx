import { Calendar, Clock, Users, XCircle } from "lucide-react";

interface SessionStatsProps {
  total: number;
  active: number;
  completed: number;
  cancelled: number;
}

const SessionStats = ({
  total,
  active,
  completed,
  cancelled,
}: SessionStatsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Sessions</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{total}</p>
          </div>

          <Calendar className="text-indigo-500" size={24} />
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{active}</p>
          </div>

          <Clock className="text-blue-500" size={24} />
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {completed}
            </p>
          </div>

          <Users className="text-green-500" size={24} />
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Cancelled</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {cancelled}
            </p>
          </div>

          <XCircle className="text-red-500" size={24} />
        </div>
      </div>
    </div>
  );
};

export default SessionStats;