"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { proposeSwapReschedule } from "@/lib/swapRequests";

export const useProposeSwapReschedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: proposeSwapReschedule,

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
