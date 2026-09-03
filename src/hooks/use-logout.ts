"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/lib/auth";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,

    onSuccess: () => {
      queryClient.clear();
    },
  });
};
