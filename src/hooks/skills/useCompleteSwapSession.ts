"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { completeSwapSession } from "@/lib/swapRequests";

export const useCompleteSwapSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (swapId: string) =>
      completeSwapSession(swapId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["swaps"],
      });
    },
  });
};