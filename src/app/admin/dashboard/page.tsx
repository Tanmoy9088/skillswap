"use client";

import {
  Activity,
  BarChart3,
  Bot,
  Check,
  Rocket,
  TrendingUp,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const userGrowthData = [
  { week: "W1", users: 1200 },
  { week: "W2", users: 1850 },
  { week: "W3", users: 2300 },
  { week: "W4", users: 2491 },
];

const sessionData = [
  { day: "1", sessions: 200 },
  { day: "2", sessions: 300 },
  { day: "3", sessions: 250 },
  { day: "4", sessions: 450 },
];

const trendingSkills = [
  {
    name: "Rust Lang",
    percentage: "42%",
    icon: "⌘",
  },
  {
    name: "GenAI Ops",
    percentage: "28%",
    icon: "✦",
  },
  {
    name: "UX Writing",
    percentage: "15%",
    icon: "✎",
  },
  {
    name: "Algo-Trading",
    percentage: "12%",
    icon: "▥",
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#FAF8FF] p-8">
      {/* ================= HEADER ================= */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#253858]">
            Platform Pulse
          </h1>

          <p className="mt-1 text-gray-500">
            Real-time overview of SkillSwap+ ecosystem performance.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-sm">
          <span className="h-2 w-2 rounded-full bg-green-500" />

          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Live System Status: Optimal
          </span>
        </div>
      </div>

      {/* ================= TOP GRID ================= */}

      <div className="grid grid-cols-12 gap-7">
        {/* LEFT STATS */}

        <div className="col-span-3 flex flex-col gap-6">
          {/* Stickiness */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div className="rounded-xl bg-[#E2DFFF] p-3">
                <BarChart3 size={20} className="text-[#4F46E5]" />
              </div>

              <span className="rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                +12.4%
              </span>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Stickiness
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#253858]">
              42.8%
            </h2>

            <div className="mt-5 h-1 w-full rounded bg-gray-200">
              <div className="h-full w-[43%] rounded bg-[#4F46E5]" />
            </div>
          </div>

          {/* Total Sessions */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div className="rounded-xl bg-[#E2DFFF] p-3">
                <Rocket size={20} className="text-[#4F46E5]" />
              </div>

              <span className="rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                +8.2%
              </span>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Total Sessions
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#253858]">
              12,842
            </h2>

            <div className="mt-5 h-20">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sessionData}>
                  <Bar
                    dataKey="sessions"
                    fill="#4F46E5"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active Mentors */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div className="rounded-xl bg-[#E2DFFF] p-3">
                <Users size={20} className="text-[#4F46E5]" />
              </div>

              <span className="rounded bg-red-50 px-2 py-1 text-xs font-semibold text-red-500">
                -2.1%
              </span>
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              Active Mentors
            </p>

            <h2 className="mt-2 text-3xl font-bold text-[#253858]">
              1,405
            </h2>

            <p className="mt-3 text-xs italic text-gray-400">
              Peak hours starting in 2h
            </p>
          </div>
        </div>

        {/* CENTER CHART */}

        <div className="col-span-6">
          <div className="h-full min-h-[735px] rounded-2xl bg-white p-7 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#253858]">
                  User Base Evolution
                </h2>

                <p className="text-sm text-gray-500">
                  Growth trajectory over the last 30 days
                </p>
              </div>

              <div className="flex gap-2">
                <button className="rounded-lg bg-[#EEF0F8] px-4 py-2 text-sm">
                  Weekly
                </button>

                <button className="rounded-lg bg-[#4F46E5] px-4 py-2 text-sm text-white">
                  Monthly
                </button>
              </div>
            </div>

            <div className="my-8 h-px bg-gray-100" />

            {/* Chart */}

            <div className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid stroke="#EEEEEE" vertical={false} />

                  <XAxis
                    dataKey="week"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 flex items-center justify-between border-t pt-6">
              <div>
                <p className="text-xs font-bold uppercase text-gray-400">
                  New Signups
                </p>

                <p className="text-xl font-bold">2,491</p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase text-gray-400">
                  Retention Rate
                </p>

                <p className="text-xl font-bold">78%</p>
              </div>

              <button className="font-semibold text-[#4F46E5]">
                Detailed Report →
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="col-span-3 flex flex-col gap-6">
          {/* Trending Skills */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <TrendingUp className="text-[#4F46E5]" size={22} />

              <h2 className="text-xl font-bold text-[#253858]">
                Trending Skills
              </h2>
            </div>

            <div className="space-y-5">
              {trendingSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF0FF] text-[#4F46E5]">
                      {skill.icon}
                    </div>

                    <span className="text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>

                  <div className="rounded-lg bg-[#F5F6FA] px-2 py-1 text-sm font-semibold">
                    {skill.percentage} ↑
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}

          <div className="flex-1 rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-7 text-xl font-bold text-[#253858]">
              Recent Activity
            </h2>

            <div className="space-y-7">
              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4F46E5] text-white">
                  <Check size={14} />
                </div>

                <div>
                  <h3 className="font-semibold">Session Completed</h3>

                  <p className="text-sm text-gray-500">
                    Advanced React Architecture
                  </p>

                  <p className="mt-1 text-xs text-[#4F46E5]">
                    5 mins ago
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white">
                  <UserPlus size={14} />
                </div>

                <div>
                  <h3 className="font-semibold">New Mentor Onboarded</h3>

                  <p className="text-sm text-gray-500">
                    Senior DevOps
                  </p>

                  <p className="mt-1 text-xs text-[#4F46E5]">
                    14 mins ago
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500 text-white">
                  <Activity size={14} />
                </div>

                <div>
                  <h3 className="font-semibold">System Alert</h3>

                  <p className="text-sm text-gray-500">
                    High latency detected in Asia-Pacific
                  </p>

                  <p className="mt-1 text-xs text-[#4F46E5]">
                    45 mins ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}

      <div className="mt-7 grid grid-cols-12 gap-7">
        {/* Active Sessions */}

        <div className="col-span-8 rounded-2xl bg-white p-7 shadow-sm">
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#253858]">
              Active Sessions Monitoring
            </h2>

            <button className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
              View All Monitoring
            </button>
          </div>

          <div className="grid grid-cols-5 border-b pb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
            <p>Session Title</p>
            <p>Mentor</p>
            <p>Participants</p>
            <p>Status</p>
            <p>Duration</p>
          </div>

          <div className="grid grid-cols-5 items-center border-b py-5 text-sm">
            <div>
              <p className="font-semibold">Modern CSS Layouts</p>

              <p className="text-xs text-gray-400">
                Design Systems Track
              </p>
            </div>

            <p>Elena R.</p>

            <p>12</p>

            <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs text-green-600">
              LIVE
            </span>

            <p>45 / 60 min</p>
          </div>

          <div className="grid grid-cols-5 items-center py-5 text-sm">
            <div>
              <p className="font-semibold">Zero to Kubernetes</p>

              <p className="text-xs text-gray-400">
                Cloud Infrastructure
              </p>
            </div>

            <p>David K.</p>

            <p>24</p>

            <span className="w-fit rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
              WAITING
            </span>

            <p>Starts in 5m</p>
          </div>
        </div>

        {/* Promotion Card */}

        <div className="col-span-4 rounded-2xl bg-[#4F46E5] p-7 text-white shadow-lg">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">
            Curator's Choice
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Mastering Generative AI Workflows
          </h2>

          <p className="mt-5 leading-7 text-indigo-100">
            This course has seen a 140% increase in enrollments this week.
            Consider promoting the mentor to Featured status.
          </p>

          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-[#4F46E5]">
            <Zap size={16} />

            Promote Skill
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;