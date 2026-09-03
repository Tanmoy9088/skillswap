"use client";
import { signUp } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  return useMutation({
    mutationKey:["signup"],
    mutationFn: signUp,
  });
};
