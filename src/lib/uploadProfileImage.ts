// lib/uploadProfileImage.ts

import { createClient } from "@/lib/supabase/client";

export const uploadProfileImage = async (file: File, userId: string) => {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop();

  const fileName = `${userId}-${Date.now()}.${fileExt}`;

  const filePath = `avatars/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("profile_Img")
    .upload(filePath, file);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage.from("profile_Img").getPublicUrl(filePath);

  return data.publicUrl;
};
