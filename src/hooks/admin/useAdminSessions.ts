"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminSessions } from "@/lib/admin";

export const useAdminSessions = () => {
  return useQuery({
    queryKey: ["admin-sessions"],
    queryFn: getAdminSessions,
    staleTime: 30 * 1000,
  });
};