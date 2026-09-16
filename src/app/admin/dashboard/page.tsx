"use client";

import { useMemo } from "react";
import { Activity, ArrowUpRight, CheckCircle2, Users, Zap } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAdminPlatformStats } from "@/hooks/admin/useAdminPlatformStats";
import { useAdminAnalytics } from "@/hooks/admin/useAdminAnalytics";

const DashboardPage = () => {
  const {
    data: platformStats,
    isLoading: isStatsLoading,
    isError: isStatsError,
  } = useAdminPlatformStats();

  const {
    users,
    sessions,

    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
  } = useAdminAnalytics();

  const isLoading = isStatsLoading || isAnalyticsLoading;
  const isError = isStatsError || isAnalyticsError;

  const userGrowthData = useMemo(() => {
    const now = new Date();
    const weeks = Array.from({ length: 6 }, (_, index) => {
      const start = new Date(now);
      start.setDate(now.getDate() - (5 - index) * 7 - now.getDay());

      const end = new Date(start);
      end.setDate(start.getDate() + 6);

      return {
        label: `W${index + 1}`,
        start,
        end,
      };
    });

    return weeks.map((week) => ({
      name: week.label,
      users: users.filter((user) => {
        const createdAt = new Date(user.created_at);
        return createdAt >= week.start && createdAt <= week.end;
      }).length,
    }));
  }, [users]);

  const sessionActivityData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (6 - index));

      return date;
    });

    return days.map((date) => {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);

      return {
        name: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        sessions: sessions.filter((session) => {
          const createdAt = new Date(session.created_at);
          return createdAt >= date && createdAt < nextDate;
        }).length,
      };
    });
  }, [sessions]);

  const sessionStatusData = useMemo(() => {
    const completed = sessions.filter(
      (session) => session.status === "completed",
    ).length;

    const scheduled = sessions.filter(
      (session) => session.status === "scheduled",
    ).length;

    const accepted = sessions.filter(
      (session) => session.status === "accepted",
    ).length;

    const inProgress = sessions.filter(
      (session) => session.status === "in_progress",
    ).length;

    const cancelled = sessions.filter(
      (session) => session.status === "cancelled",
    ).length;

    return [
      {
        name: "Completed",
        value: completed,
      },
      {
        name: "Scheduled",
        value: scheduled,
      },
      {
        name: "Accepted",
        value: accepted,
      },
      {
        name: "In Progress",
        value: inProgress,
      },
      {
        name: "Cancelled",
        value: cancelled,
      },
    ];
  }, [sessions]);

  const popularSkills = useMemo(() => {
    const counts = new Map<string, number>();

    sessions.forEach((session) => {
      const skillName = session.skill_name?.trim();

      if (!skillName) {
        return;
      }

      counts.set(skillName, (counts.get(skillName) ?? 0) + 1);
    });

    return Array.from(counts.entries())
      .sort(([, first], [, second]) => second - first)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        sessions: count,
      }));
  }, [sessions]);

  const completedSessions = useMemo(
    () => sessions.filter((session) => session.status === "completed").length,
    [sessions],
  );

  const cancelledSessions = useMemo(
    () => sessions.filter((session) => session.status === "cancelled").length,
    [sessions],
  );

  const activeSessions = useMemo(
    () =>
      sessions.filter(
        (session) =>
          session.status === "accepted" ||
          session.status === "scheduled" ||
          session.status === "in_progress",
      ).length,
    [sessions],
  );

  const totalSessions = sessions.length;

  const sessionOverview = useMemo(
    () => [
      {
        title: "Total",
        value: totalSessions,
        icon: Activity,
        description: "All requests and sessions",
      },
      {
        title: "Completed",
        value: completedSessions,
        icon: CheckCircle2,
        description: "Finished sessions",
      },
    ],
    [totalSessions, completedSessions],
  );

  const recentSessions = useMemo(
    () =>
      [...sessions]
        .sort(
          (first, second) =>
            new Date(second.created_at).getTime() -
            new Date(first.created_at).getTime(),
        )
        .slice(0, 6),
    [sessions],
  );

  const statusColors = [
    "hsl(142 71% 45%)",
    "hsl(217 91% 60%)",
    "hsl(38 92% 50%)",
    "hsl(271 91% 65%)",
    "hsl(0 84% 60%)",
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200" />
          <div className="mt-2 h-5 w-96 animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-32 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />
            <div className="h-96 animate-pulse rounded-2xl bg-white shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-700">
              Unable to load dashboard data
            </h2>
            <p className="mt-1 text-sm text-red-600">
              Please refresh the page and try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Real-time overview of SkillSwap+ platform activity
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Live Data
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {platformStats?.total_users ?? users.length}
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <Users size={22} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs text-gray-500">
              <ArrowUpRight size={14} />
              Registered SkillSwap+ users
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Skills
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {platformStats?.total_skills ?? 0}
                </p>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Zap size={22} />
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Active skills available on the platform
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Sessions
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {platformStats?.total_sessions ?? totalSessions}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Activity size={22} />
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Swap sessions created on the platform
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Mentors
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {platformStats?.active_mentors ?? 0}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <Users size={22} />
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Mentors currently active
            </div>
          </div>
        </div>

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Session Overview
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Real session request and completion statistics
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sessionOverview.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-gray-100 p-3 text-gray-700">
                      <Icon size={21} />
                    </div>

                    <span className="text-xs font-medium text-gray-400">
                      SkillSwap+
                    </span>
                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-500">
                    {item.title}
                  </p>

                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {item.value}
                  </p>

                  <p className="mt-2 text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">User Growth</h2>
                <p className="mt-1 text-sm text-gray-500">
                  New users registered over recent weeks
                </p>
              </div>

              <Users size={20} className="text-indigo-500" />
            </div>

            <div className="mt-6 h-72">
              {userGrowthData.some((item) => item.users > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
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

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Session Activity
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Sessions created during the last seven days
                </p>
              </div>

              <Activity size={20} className="text-blue-500" />
            </div>

            <div className="mt-6 h-72">
              {sessionActivityData.some((item) => item.sessions > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sessionActivityData}>
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
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <h2 className="font-semibold text-gray-900">Session Status</h2>
              <p className="mt-1 text-sm text-gray-500">
                Current status of created sessions
              </p>
            </div>

            <div className="mt-6 h-80">
              {sessionStatusData.some((item) => item.value > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sessionStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={55}
                      paddingAngle={3}
                    >
                      {sessionStatusData.map((entry, index) => (
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
              {sessionStatusData.map((item, index) => (
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

          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div>
              <h2 className="font-semibold text-gray-900">Popular Skills</h2>
              <p className="mt-1 text-sm text-gray-500">
                Skills with the most sessions
              </p>
            </div>

            <div className="mt-6 h-80">
              {popularSkills.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={popularSkills}
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
        </div>

        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-gray-900">
                Session Statistics
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Additional real-time session metrics
              </p>
            </div>
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

        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div>
            <h2 className="font-semibold text-gray-900">Recent Sessions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Latest sessions created on SkillSwap+
            </p>
          </div>

          <div className="mt-5 overflow-x-auto">
            {recentSessions.length > 0 ? (
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
                  {recentSessions.map((session) => (
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
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            session.status === "completed"
                              ? "bg-green-50 text-green-700"
                              : session.status === "cancelled"
                                ? "bg-red-50 text-red-700"
                                : session.status === "in_progress"
                                  ? "bg-purple-50 text-purple-700"
                                  : session.status === "scheduled"
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-yellow-50 text-yellow-700"
                          }`}
                        >
                          {session.status.replace("_", " ")}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500">
                        {new Date(session.created_at).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
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
      </div>
    </div>
  );
};

export default DashboardPage;
