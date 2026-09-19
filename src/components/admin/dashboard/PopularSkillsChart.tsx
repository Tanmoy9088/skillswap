import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PopularSkill = {
  name: string;
  sessions: number;
};

type PopularSkillsChartProps = {
  data: PopularSkill[];
};

const PopularSkillsChart = ({ data }: PopularSkillsChartProps) => {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div>
        <h2 className="font-semibold text-gray-900">Popular Skills</h2>

        <p className="mt-1 text-sm text-gray-500">
          Skills with the most sessions
        </p>
      </div>

      <div className="mt-6 h-80">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                left: 20,
                right: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />

              <XAxis type="number" allowDecimals={false} />

              <YAxis type="category" dataKey="name" width={100} />

              <Tooltip />

              <Bar
                dataKey="sessions"
                fill="hsl(271 91% 65%)"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No skill session data available
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularSkillsChart;
