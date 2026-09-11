"use client";

import { MagicCard } from "@/components/ui/magic-card";
import { useLogin } from "@/hooks/use-login";
import { getCurrentProfile } from "@/lib/profile";
import { loginSchema } from "@/schemas/loginSchema";
import { LoginPayload } from "@/types/interfaces/auth.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const router = useRouter();
  const { mutate, isPending, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginPayload) => {
    mutate(data, {
      onSuccess: async (response) => {
        const userId = response?.user?.id;

        if (!userId) return;

        const profile = await getCurrentProfile();

        if (profile?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }

        reset();
      },
    });
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-indigo-700 via-indigo-600 to-violet-700 px-4 py-6 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white/10 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="relative hidden min-h-155 overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between">
            {/* Decorative circles */}
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />

            <div className="relative z-10">
              <div className="mb-10 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                  <Sparkles size={20} />
                </div>

                <span className="text-xl font-bold tracking-tight">
                  SkillSwap+
                </span>
              </div>

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-100">
                Learn. Teach. Grow.
              </p>

              <h1 className="max-w-lg text-5xl font-bold leading-tight">
                Exchange skills.
                <br />
                Build connections.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-indigo-100">
                Connect with people who can teach what you want to learn,
                while sharing the skills you already have.
              </p>
            </div>

            <div className="relative z-10 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm leading-6 text-indigo-50">
                “Everyone has something valuable to teach, and something new
                to learn.”
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center bg-white p-5 sm:p-10 lg:p-12">
            <MagicCard className="w-full max-w-md rounded-3xl border-0 bg-white p-0 shadow-none">
              <div className="mb-8">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600">
                  <Sparkles size={23} />
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Sign in to continue your SkillSwap+ journey.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >
                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      {...register("email")}
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* PASSWORD */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-12 text-sm outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-700"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* SERVER ERROR */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error.message}
                  </div>
                )}

                {/* LOGIN */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="mt-1 h-12 rounded-xl bg-indigo-600 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? "Signing in..." : "Sign in"}
                </button>
              </form>

              {/* SIGNUP */}
              <p className="mt-7 text-center text-sm text-gray-500">
                Don;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-indigo-600 transition hover:text-indigo-700"
                >
                  Create an account
                </Link>
              </p>
            </MagicCard>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;