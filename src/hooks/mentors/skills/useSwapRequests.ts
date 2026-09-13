"use client";

import { useQuery } from "@tanstack/react-query";

import { getMySwapRequests } from "@/lib/swapRequests";

export const useSwapRequests = () => {
  return useQuery({
    queryKey: ["swap-requests"],
    queryFn: getMySwapRequests,
    staleTime: 30 * 1000,
  });
};