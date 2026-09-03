"use client";
import { login } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};
