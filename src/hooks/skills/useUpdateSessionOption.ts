"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSessionOption } from "@/lib/sessionOptions";

import type { SessionDuration } from "@/types/types/swaps";

export const useUpdateSessionOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionOptionId,
      durationMinutes,
      tokenRate,
      isActive,
    }: {
      sessionOptionId: string;
      userSkillId: string;
      durationMinutes?: SessionDuration;
      tokenRate?: number;
      isActive?: boolean;
    }) => {
      return updateSessionOption({
        sessionOptionId,
        durationMinutes,
        tokenRate,
        isActive,
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
