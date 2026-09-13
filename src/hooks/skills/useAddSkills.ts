"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addSkill, AddSkillPayload } from "@/lib/profile";

export const useAddSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddSkillPayload) => addSkill(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-skills"],
      });
    },
  });
};
