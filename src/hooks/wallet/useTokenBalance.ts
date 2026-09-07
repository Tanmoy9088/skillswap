"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyTokenBalance } from "@/lib/wallet";

export const useTokenBalance = () => {
  return useQuery({
    queryKey: ["token-balance"],
    queryFn: getMyTokenBalance,
    staleTime: 30 * 1000,
  });
};