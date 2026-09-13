"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { requestScheduleSwap } from "@/lib/swapRequests";

export const useRequestScheduleSwap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestScheduleSwap,

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
