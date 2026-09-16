"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminUsers } from "@/lib/admin/adminUsers";

export const useAdminUsers = (page: number = 1, pageSize: number = 3) => {
  return useQuery({
    queryKey: ["admin-users", page, pageSize],
    queryFn: () => getAdminUsers(page, pageSize),
    placeholderData: (previousData) => previousData,
  });
};
