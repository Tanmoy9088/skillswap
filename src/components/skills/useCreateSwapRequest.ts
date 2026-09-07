"use client";

import { useMutation } from "@tanstack/react-query";

import { createSwapRequest } from "@/lib/swapRequests";

export const useCreateSwapRequest = () => {
  return useMutation({
    mutationFn: createSwapRequest,
  });
};
