"use client";

import { useQuery } from "@tanstack/react-query";

import { getSwapById } from "@/lib/swapRequests";

export const useSwapById = (swapId: string) => {
  return useQuery({
    queryKey: ["swap", swapId],
    queryFn: () => getSwapById(swapId),
    enabled: Boolean(swapId),
  });
};
