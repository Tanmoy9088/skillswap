"use client";
import { login } from "@/lib/auth";
import { useMutation } from "@tanstack/react-query";
import {
  // getCookie,
  setCookie,
  // deleteCookie,
  // hasCookie,
  // getCookies,
} from "cookies-next/client";
export const useLogin = () => {
  return useMutation({
    mutationKey: ["use-login"],
    mutationFn: login,
    onSuccess: async (res) => {
      const cookieOptions = {
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
        sameSite: "lax" as const,
        secure: process.env.NODE_ENV === "production",
      };
      await setCookie("token", JSON.stringify(res.session), cookieOptions);
      await setCookie("user", JSON.stringify(res.user), cookieOptions);
    },
  });
};
