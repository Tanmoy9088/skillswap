"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSwapRequest } from "@/lib/swapRequests";

export const useCreateSwapRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSwapRequest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["swap-requests"],
      });
    },
  });
};
