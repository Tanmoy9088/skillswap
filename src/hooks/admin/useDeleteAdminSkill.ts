"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminSkill } from "@/lib/admin";

export const useDeleteAdminSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (skillId: string) => deleteAdminSkill(skillId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-skills"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-platform-stats"],
      });
    },
  });
};
