"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { startSwapSession } from "@/lib/swapRequests";

export const useStartSwapSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (swapId: string) =>
      startSwapSession(swapId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["swaps"],
      });
    },
  });
};