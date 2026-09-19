import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type SessionStatusData = {
  name: string;
  value: number;
}[];

type SessionStatusChartProps = {
  data: SessionStatusData;
  totalSessions: number;
};

const statusColors = [
  "hsl(142 71% 45%)",
  "hsl(217 91% 60%)",
  "hsl(38 92% 50%)",
  "hsl(271 91% 65%)",
  "hsl(0 84% 60%)",
];

const SessionStatusChart = ({
  data,
  totalSessions,
}: SessionStatusChartProps) => {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div>
        <h2 className="font-semibold text-gray-900">Session Status</h2>

        <p className="mt-1 text-sm text-gray-500">
          Current status of created sessions
        </p>
      </div>

      <div className="mt-6 h-80">
        {data.some((item) => item.value > 0) ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={55}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={statusColors[index]} />
                ))}
              </Pie>

              <Tooltip />

              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-900 text-2xl font-bold"
              >
                {totalSessions}
              </text>

              <text
                x="50%"
                y="55%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-gray-500 text-xs"
              >
                Sessions
              </text>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No session status data available
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: statusColors[index],
                }}
              />

              <span className="text-xs text-gray-600">{item.name}</span>
            </div>

            <span className="text-sm font-semibold text-gray-900">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SessionStatusChart;
