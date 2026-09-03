"use client";
import { MagicCard } from "@/components/ui/magic-card";
import { useLogin } from "@/hooks/use-login";
import { getCurrentProfile } from "@/lib/profile";
import { loginSchema } from "@/schemas/loginSchema";
import { LoginPayload } from "@/types/interfaces/auth.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
// import { MagicCard } from "@/components/ui/magic-card"

const LoginPage = () => {
  const router = useRouter();
  const { mutate, isPending, error } = useLogin();
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
        console.log("Success login response:", response);

        const userId = response?.user?.id;
        console.log("UserID:",userId)

        if (!userId) return;

        const profile = await getCurrentProfile();

        console.log("Profile:", profile);

        if (profile?.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      },

      onError: (error) => {
        console.log("LOGIN ERROR:", error.message);
      },
    });
  };
  return (
    <>
      <div className="backdrop-blur-2xl bg-[#4D44E3] w-screen h-screen px-10 flex justify-center items-center">
        {/*Left Card */}
        <div className="w-1/2">
          <div className=""></div>
        </div>
        {/*Right card/ Login form */}
        <div className="w-1/2">
          <MagicCard className="bg-red-200 h-115 w-fit rounded-xl px-20 py-10">
            <h2 className="mb-6 text-xl font-semibold">Welcome Back! Again</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <label>Email</label>

              <input
                type="text"
                placeholder="Enter email"
                {...register("email")}
                className="mt-1 mb-4 rounded-xl border px-4 py-3"
              />

              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              <label className="mb-2">Password</label>

              <input
                type="password"
                placeholder="Enter password"
                {...register("password")}
                className="mt-1 mb-6 rounded-xl border px-4 py-3"
              />

              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <button
                type="submit"
                className="rounded-md border py-2 text-center"
              >
                Login
              </button>
            </form>
            Not create account? <a href="/signup">Signup</a>
          </MagicCard>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
