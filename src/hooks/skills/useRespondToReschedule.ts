"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { respondToReschedule } from "@/lib/swapRequests";

export const useRespondToReschedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: respondToReschedule,

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
