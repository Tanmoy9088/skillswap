"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAdminSession } from "@/lib/admin";

export const useCancelAdminSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sessionId: string) => cancelAdminSession(sessionId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-sessions"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-platform-stats"],
      });

      queryClient.invalidateQueries({
        queryKey: ["swaps"],
      });

      queryClient.invalidateQueries({
        queryKey: ["token-balance"],
      });

      queryClient.invalidateQueries({
        queryKey: ["token-transactions"],
      });
    },
  });
};