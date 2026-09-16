"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminUsers } from "@/lib/admin/adminUsers";
import { getAdminSessions } from "@/lib/admin/adminSessions";

export const useAdminAnalytics = () => {
  const usersQuery = useQuery({
    queryKey: ["admin-users"],
    queryFn: getAdminUsers,
  });

  const sessionsQuery = useQuery({
    queryKey: ["admin-sessions"],
    queryFn: getAdminSessions,
  });

  return {
    users: usersQuery.data ?? [],
    sessions: sessionsQuery.data ?? [],
    isLoading: usersQuery.isLoading || sessionsQuery.isLoading,
    isError: usersQuery.isError || sessionsQuery.isError,
    error: usersQuery.error || sessionsQuery.error,
  };
};
