"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { confirmScheduleSwap } from "@/lib/swapRequests";

export const useConfirmScheduleSwap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: confirmScheduleSwap,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-swaps"],
      });

      queryClient.invalidateQueries({
        queryKey: ["swap-requests"],
      });
    },
  });
};