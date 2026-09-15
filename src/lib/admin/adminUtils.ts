import type { SupabaseClient } from "@supabase/supabase-js";

const SKILL_IMAGE_BUCKET = "skill-images";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const getAdminProfile = async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (!profile) {
    throw new Error("Profile not found");
  }

  if (profile.role !== "admin") {
    throw new Error("You do not have permission to perform this action.");
  }

  return profile;
};

export const validateSkillImage = (file: File) => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Please upload a JPG, PNG, or WebP image.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image must be smaller than 5MB.");
  }
};

export const uploadSkillImage = async (
  supabase: SupabaseClient,
  file: File,
) => {
  validateSkillImage(file);

  const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";

  const fileName = `${crypto.randomUUID()}.${fileExtension}`;
  const filePath = `admin/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(SKILL_IMAGE_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    throw new Error(`Image upload failed: ${uploadError.message}`);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(SKILL_IMAGE_BUCKET).getPublicUrl(filePath);

  return {
    filePath,
    publicUrl,
  };
};

export const removeSkillImage = async (
  supabase: SupabaseClient,
  filePath: string,
) => {
  await supabase.storage.from(SKILL_IMAGE_BUCKET).remove([filePath]);
};
