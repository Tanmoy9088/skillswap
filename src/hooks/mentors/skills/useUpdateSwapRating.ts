"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSwapRating } from "@/lib/swapRequests";

interface UpdateSwapRatingInput {
  swapId: string;
  rating: number;
  review?: string;
}

export const useUpdateSwapRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ swapId, rating, review }: UpdateSwapRatingInput) =>
      updateSwapRating(swapId, rating, review),

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
