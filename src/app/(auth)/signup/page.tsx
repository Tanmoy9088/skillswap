/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { MagicCard } from "@/components/ui/magic-card";
import { useSignUp } from "@/hooks/use-signUp";
// import { loginSchema } from "@/schemas/loginSchema";
import { SignupSchema } from "@/schemas/signupSchema";
import { SignupPayload } from "@/types/interfaces/auth.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
const SignupPage = () => {
  const router = useRouter();
  const { mutate, isPending, error } = useSignUp();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupPayload>({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {} = useSignUp();
  const onSubmit = async (data: SignupPayload) => {
    console.log("Signup data=>", data);
    mutate(data, {
      onSuccess: async (res) => {
        console.log(res);
        await router.push("/login");
        reset();
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
          <MagicCard className="bg-red-200 w-fit rounded-xl px-20 py-10">
            <h2 className="mb-6 text-xl font-semibold">Welcome Back! Again</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <label>Name</label>

              <input
                type="text"
                placeholder="Enter name"
                {...register("name")}
                className="mt-1 mb-4 rounded-xl border px-4 py-3"
              />

              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              <label>Phone</label>

              <input
                type="text"
                placeholder="Enter phone"
                {...register("phone")}
                className="mt-1 mb-4 rounded-xl border px-4 py-3"
              />

              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
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
              <label className="mb-2">Confirm Password </label>

              <input
                type="password"
                placeholder="Enter confirm password "
                {...register("confirmPassword")}
                className="mt-1 mb-6 rounded-xl border px-4 py-3"
              />

              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}

              <button type="submit" disabled={isPending}>
                {isPending ? "Creating account..." : "Sign Up"}
              </button>
            </form>
          </MagicCard>
        </div>
      </div>
    </>
  );
};

export default SignupPage;

// import { MagicCard } from "@/components/ui/magic-card"
