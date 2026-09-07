"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminUsers } from "@/lib/admin";

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: getAdminUsers,
    staleTime: 30 * 1000,
  });
};