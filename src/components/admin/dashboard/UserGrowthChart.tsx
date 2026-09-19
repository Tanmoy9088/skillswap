import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type UserGrowthData = {
  name: string;
  users: number;
}[];

type UserGrowthChartProps = {
  data: UserGrowthData;
};

const UserGrowthChart = ({ data }: UserGrowthChartProps) => {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-900">User Growth</h2>

          <p className="mt-1 text-sm text-gray-500">
            New users registered over recent weeks
          </p>
        </div>
      </div>

      <div className="mt-6 h-72">
        {data.some((item) => item.users > 0) ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis dataKey="name" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="users"
                stroke="hsl(239 84% 67%)"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No user growth data available
          </div>
        )}
      </div>
    </section>
  );
};

export default UserGrowthChart;
