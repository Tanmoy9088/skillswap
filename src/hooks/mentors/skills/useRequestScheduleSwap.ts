// hooks/useRequestScheduleSwap.ts

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { requestScheduleSwap } from "@/lib/swapRequests";

export const useRequestScheduleSwap = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      swapId,
      sessionOptionId,
      scheduledAt,
      note,
    }: {
      swapId: string;

      sessionOptionId: string;

      scheduledAt: string;

      note?: string;
    }) => {
      return requestScheduleSwap({
        swapId,

        sessionOptionId,

        scheduledAt,

        note,
      });
    },

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
