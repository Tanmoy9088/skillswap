import {
  LoginPayload,
  type SignupPayload,
} from "@/types/interfaces/auth.interface";
import { createClient } from "./supabase/client";

// Signup
export const signUp = async ({
  email,
  password,
  phone,
  name,
}: SignupPayload) => {
  const supabase = createClient();

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
      },
    },
  });

  if (signUpError) {
    throw new Error(signUpError.message);
  }

  if (!signUpData.user) {
    throw new Error("User was not created");
  }

  const profilePayload = {
    auth_user_id: signUpData.user.id,
    name,
    email,
    phone,
    role: "user",
    profile_img: null,
    token_balance: 100,
  };

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .insert(profilePayload)
    .select()
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  return {
    user: signUpData.user,
    profile: profileData,
  };
};

// Login
export const login = async ({ email, password }: LoginPayload) => {
  const supabase = createClient();

  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (loginError) {
    throw new Error(loginError.message);
  }

  if (!loginData.user) {
    throw new Error("User not found");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", loginData.user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  return {
    user: loginData.user,
    session: loginData.session,
    profile,
  };
};

// Get current user
export const getCurrentUser = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

// Logout
export const logout = async () => {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  return true;
};
