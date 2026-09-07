import { createClient } from "@/lib/supabase/client";
export interface UpdateProfilePayload {
  name: string;
  phone?: string;
  bio?: string;
  profile_img?: string;
}
const supabase = createClient();

export const getCurrentProfile = async () => {
  // Get authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log("User", user);
  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    return null;
  }

  // Get user's profile including custom role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  return profile;
};

export const updateProfile = async (payload: UpdateProfilePayload) => {
  // Get logged-in user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({
      name: payload.name,
      phone: payload.phone,
      bio: payload.bio,
      profile_img: payload.profile_img,
    })
    .eq("auth_user_id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUserSkills = async () => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  const { data, error } = await supabase
    .from("user_skills")
    .select("*")
    .eq("user_id", profile.id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const addSkill = async ({
  skill_name,
  skill_type,
  proficiency_level,
}: {
  skill_name: string;
  skill_type: "offered" | "wanted";
  proficiency_level?: string;
}) => {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (!profile) {
    throw new Error("Profile not found");
  }

  const { data, error } = await supabase
    .from("user_skills")
    .insert({
      user_id: profile.id,
      skill_name,
      skill_type,
      proficiency_level,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const removeSkill = async (skillId: string) => {

  const { error } = await supabase
    .from("user_skills")
    .delete()
    .eq("id", skillId);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};
