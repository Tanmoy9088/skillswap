"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSwapRequestStatus } from "@/lib/swapRequests";

export const useUpdateSwapRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSwapRequestStatus,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["swap-requests"],
      });

      queryClient.invalidateQueries({
        queryKey: ["my-swaps"],
      });
    },
  });
};
