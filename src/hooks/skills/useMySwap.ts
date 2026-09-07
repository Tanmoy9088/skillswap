"use client";

import { useQuery } from "@tanstack/react-query";

import { getMySwaps } from "@/lib/swapRequests";

export const useMySwaps = () => {
  return useQuery({
    queryKey: ["swaps"],
    queryFn: getMySwaps,
    staleTime: 30 * 1000,
  });
};