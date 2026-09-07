"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminPlatformStats } from "@/lib/admin";

export const useAdminPlatformStats = () => {
  return useQuery({
    queryKey: ["admin-platform-stats"],
    queryFn: getAdminPlatformStats,
    staleTime: 30 * 1000,
  });
};