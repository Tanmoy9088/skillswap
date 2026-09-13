// hooks/useMySessionOptions.ts

"use client";

import { useQuery } from "@tanstack/react-query";

import { getMySessionOptions } from "@/lib/sessionOptions";

export const useMySessionOptions = (userSkillId?: string) => {
  return useQuery({
    queryKey: ["my-session-options", userSkillId],

    queryFn: () => {
      return getMySessionOptions(userSkillId);
    },

    staleTime: 30 * 1000,
  });
};
