// hooks/useCreateSessionOption.ts

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSessionOption } from "@/lib/sessionOptions";

import type { SessionDuration } from "@/types/types/swaps";

export const useCreateSessionOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userSkillId,
      durationMinutes,
      tokenRate,
    }: {
      userSkillId: string;

      durationMinutes: SessionDuration;

      tokenRate: number;
    }) => {
      return createSessionOption({
        userSkillId,

        durationMinutes,

        tokenRate,
      });
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-session-options", variables.userSkillId],
      });

      queryClient.invalidateQueries({
        queryKey: ["session-options", variables.userSkillId],
      });
    },
  });
};
