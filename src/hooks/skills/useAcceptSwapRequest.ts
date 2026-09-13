"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { acceptSwapRequest } from "@/lib/swapRequests";

export const useAcceptSwapRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: acceptSwapRequest,

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
