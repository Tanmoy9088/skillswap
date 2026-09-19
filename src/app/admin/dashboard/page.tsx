"use client";

import { useMemo } from "react";
import { Activity, CheckCircle2, Users, Zap } from "lucide-react";

import { useAdminPlatformStats } from "@/hooks/admin/useAdminPlatformStats";
import { useAdminAnalytics } from "@/hooks/admin/useAdminAnalytics";

import DashboardError from "@/components/admin/dashboard/DashboardError";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardLoading from "@/components/admin/dashboard/DashboardLoading";
import DashboardStatCard from "@/components/admin/dashboard/DashboardStatCard";
import PopularSkillsChart from "@/components/admin/dashboard/PopularSkillsChart";
import RecentSessions from "@/components/admin/dashboard/RecentSessions";
import SessionActivityChart from "@/components/admin/dashboard/SessionActivityChart";
import SessionOverview from "@/components/admin/dashboard/SessionOverview";
import SessionStatistics from "@/components/admin/dashboard/SessionStatistics";
import SessionStatusChart from "@/components/admin/dashboard/SessionStatusChart";
import UserGrowthChart from "@/components/admin/dashboard/UserGrowthChart";

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
    return [
      {
        name: "Completed",
        value: sessions.filter((session) => session.status === "completed")
          .length,
      },
      {
        name: "Scheduled",
        value: sessions.filter((session) => session.status === "scheduled")
          .length,
      },
      {
        name: "Accepted",
        value: sessions.filter((session) => session.status === "accepted")
          .length,
      },
      {
        name: "In Progress",
        value: sessions.filter((session) => session.status === "in_progress")
          .length,
      },
      {
        name: "Cancelled",
        value: sessions.filter((session) => session.status === "cancelled")
          .length,
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

  if (isLoading) {
    return <DashboardLoading />;
  }

  if (isError) {
    return <DashboardError />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStatCard
            title="Total Users"
            value={platformStats?.total_users ?? users.length}
            description="Registered SkillSwap+ users"
            icon={Users}
            iconClassName="text-indigo-600"
            iconBackground="bg-indigo-50"
          />

          <DashboardStatCard
            title="Total Skills"
            value={platformStats?.total_skills ?? 0}
            description="Active skills available on the platform"
            icon={Zap}
            iconClassName="text-purple-600"
            iconBackground="bg-purple-50"
          />

          <DashboardStatCard
            title="Total Sessions"
            value={platformStats?.total_sessions ?? totalSessions}
            description="Swap sessions created on the platform"
            icon={Activity}
            iconClassName="text-blue-600"
            iconBackground="bg-blue-50"
          />

          <DashboardStatCard
            title="Active Mentors"
            value={platformStats?.active_mentors ?? 0}
            description="Mentors currently active"
            icon={Users}
            iconClassName="text-emerald-600"
            iconBackground="bg-emerald-50"
          />
        </div>

        <SessionOverview items={sessionOverview} />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <UserGrowthChart data={userGrowthData} />

          <SessionActivityChart data={sessionActivityData} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SessionStatusChart
            data={sessionStatusData}
            totalSessions={totalSessions}
          />

          <PopularSkillsChart data={popularSkills} />
        </div>

        <SessionStatistics
          activeSessions={activeSessions}
          completedSessions={completedSessions}
          cancelledSessions={cancelledSessions}
        />

        <RecentSessions sessions={recentSessions} />
      </div>
    </div>
  );
};

export default DashboardPage;
