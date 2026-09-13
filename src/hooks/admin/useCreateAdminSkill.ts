"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminSkill, CreateAdminSkillPayload } from "@/lib/admin";

export const useCreateAdminSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAdminSkillPayload) => createAdminSkill(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-skills"],
      });

      queryClient.invalidateQueries({
        queryKey: ["available-skills"],
      });

      queryClient.invalidateQueries({
        queryKey: ["skill-discovery"],
      });
    },
  });
};
