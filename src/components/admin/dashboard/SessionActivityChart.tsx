import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type SessionActivityData = {
  name: string;
  sessions: number;
}[];

type SessionActivityChartProps = {
  data: SessionActivityData;
};

const SessionActivityChart = ({ data }: SessionActivityChartProps) => {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">Session Activity</h2>

          <p className="mt-1 text-sm text-gray-500">
            Sessions created during the last seven days
          </p>
        </div>
      </div>

      <div className="mt-6 h-72">
        {data.some((item) => item.sessions > 0) ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="name" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Bar
                dataKey="sessions"
                fill="hsl(217 91% 60%)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No session activity available
          </div>
        )}
      </div>
    </section>
  );
};

export default SessionActivityChart;
