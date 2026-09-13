"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createSwapRating } from "@/lib/swapRequests";

interface CreateSwapRatingInput {
  swapId: string;
  rating: number;
  review?: string;
}

export const useCreateSwapRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ swapId, rating, review }: CreateSwapRatingInput) =>
      createSwapRating(swapId, rating, review),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["my-swaps"],
      });

      queryClient.invalidateQueries({
        queryKey: ["swap-rating", variables.swapId],
      });
    },
  });
};
