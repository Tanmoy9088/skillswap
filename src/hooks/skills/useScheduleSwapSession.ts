"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleSwapSession } from "@/lib/swapRequests";

export const useScheduleSwapSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      swapId,
      scheduledAt,
    }: {
      swapId: string;
      scheduledAt: string;
    }) => scheduleSwapSession(swapId, scheduledAt),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["swaps"],
      });

      queryClient.invalidateQueries({
        queryKey: ["swap-requests"],
      });
    },
  });
};