"use client";

import { useQuery } from "@tanstack/react-query";

import { getAdminSkills } from "@/lib/admin";

export const useAdminSkills = () => {
  return useQuery({
    queryKey: ["admin-skills"],
    queryFn: getAdminSkills,
    staleTime: 30 * 1000,
  });
};
