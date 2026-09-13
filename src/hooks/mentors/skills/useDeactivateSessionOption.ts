"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deactivateSessionOption } from "@/lib/sessionOptions";

export const useDeactivateSessionOption = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionOptionId,
    }: {
      sessionOptionId: string;
      userSkillId: string;
    }) => {
      return deactivateSessionOption(sessionOptionId);
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
