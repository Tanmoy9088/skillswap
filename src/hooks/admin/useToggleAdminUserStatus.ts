"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleAdminUserStatus } from "@/lib/admin";

export const useToggleAdminUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, isActive }: { userId: string; isActive: boolean }) =>
      toggleAdminUserStatus(userId, isActive),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-platform-stats"],
      });
    },
  });
};
