"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, type UpdateProfilePayload } from "@/lib/profile";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-profile"],
      });
    },
  });
};
