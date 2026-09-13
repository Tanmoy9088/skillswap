"use client";

import { useQuery } from "@tanstack/react-query";

import { getSessionOptions } from "@/lib/sessionOptions";

export const useSessionOptions = (userSkillId: string) => {
  return useQuery({
    queryKey: ["session-options", userSkillId],
    queryFn: () => getSessionOptions(userSkillId),
    enabled: Boolean(userSkillId),
    staleTime: 30 * 1000,
  });
};
