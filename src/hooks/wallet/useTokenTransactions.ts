"use client";

import { useQuery } from "@tanstack/react-query";

import { getMyTokenTransactions } from "@/lib/wallet";

export const useTokenTransactions = () => {
  return useQuery({
    queryKey: ["token-transactions"],
    queryFn: getMyTokenTransactions,
    staleTime: 30 * 1000,
  });
};
