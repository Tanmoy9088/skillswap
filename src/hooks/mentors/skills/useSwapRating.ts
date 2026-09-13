"use client";

import { useQuery } from "@tanstack/react-query";
import { getMySwapRating } from "@/lib/swapRequests";

export interface SwapRating {
  id: string;
  swap_id: string;
  reviewer_auth_user_id: string;
  reviewee_auth_user_id: string;
  rating: number;
  review: string | null;
}

export const useSwapRating = (swapId: string) => {
  return useQuery({
    queryKey: ["swap-rating", swapId],
    queryFn: async () => {
      const data = await getMySwapRating(swapId);

      return data as SwapRating | null;
    },
    enabled: Boolean(swapId),
    staleTime: 30 * 1000,
  });
};
