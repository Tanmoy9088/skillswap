"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

const cancelSwapSession = async (swapId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("cancel_swap_session", {
    p_swap_id: swapId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useCancelSwapSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelSwapSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["swaps"],
      });
    },
  });
};