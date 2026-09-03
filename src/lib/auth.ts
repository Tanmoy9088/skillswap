import {
  LoginPayload,
  type SignupPayload,
} from "@/types/interfaces/auth.interface";
import { createClient } from "./supabase/client";
import { useRouter } from "next/navigation";

const supabase = createClient();

// Signup
export const signUp = async ({
  email,
  password,
  role,
  phone,
  profileImg,
  name,
}: SignupPayload) => {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        profileImg,
        // role,
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
    profile_img: profileImg,
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
  const { data: loginData, error: loginError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  if (loginError) {
    throw new Error(loginError.message);
  }
  console.log("Supabase Login Data:", loginData);
  return loginData;
};

//get Current user
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
// const router = useRouter()
//Logout
export const logout = async () => {
    
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
    //  router.push("/login")
  if (error) {
    throw new Error(error.message);
  }

  return true;
};
