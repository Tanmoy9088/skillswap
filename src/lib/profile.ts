import { createClient } from "@/lib/supabase/client";

export interface UpdateProfilePayload {
  name: string;
  phone?: string;
  bio?: string;
  profile_img?: string;
}

export interface AddSkillPayload {
  skill_id: string;
  skill_type: "offered" | "wanted";
  proficiency_level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  description?: string;
  image?: File | null;
}

const supabase = createClient();

export const getCurrentProfile = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    return null;
  }

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
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  const { data, error } = await supabase
    .from("user_skills")
    .select(
      `
      id,
      user_id,
      skill_id,
      skill_type,
      proficiency_level,
      description,
      image_url,
      created_at,
      skills (
        id,
        name,
        category,
        description,
        image_url,
        is_active
      )
    `,
    )
    .eq("user_id", profile.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data.map((item) => ({
    ...item,
    skills: Array.isArray(item.skills)
      ? (item.skills[0] ?? null)
      : (item.skills ?? null),
  }));
};

export const addSkill = async (payload: AddSkillPayload) => {
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
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (!profile) {
    throw new Error("Profile not found");
  }

  const { data: skill, error: skillError } = await supabase
    .from("skills")
    .select("id, name, is_active")
    .eq("id", payload.skill_id)
    .eq("is_active", true)
    .single();

  if (skillError) {
    throw new Error("Unable to find the selected skill.");
  }

  if (!skill) {
    throw new Error("The selected skill is no longer available.");
  }

  const { data: existingSkill, error: existingSkillError } = await supabase
    .from("user_skills")
    .select("id")
    .eq("user_id", profile.id)
    .eq("skill_id", payload.skill_id)
    .eq("skill_type", payload.skill_type)
    .maybeSingle();

  if (existingSkillError) {
    throw new Error(existingSkillError.message);
  }

  if (existingSkill) {
    throw new Error("You have already added this skill.");
  }

  let imageUrl: string | null = null;
  let imagePath: string | null = null;

  if (payload.image) {
    if (!payload.image.type.startsWith("image/")) {
      throw new Error("Please upload a valid image.");
    }

    if (payload.image.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be less than 5MB.");
    }

    const extension =
      payload.image.name.split(".").pop()?.toLowerCase() || "jpg";

    imagePath = `users/${profile.id}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("skill-images")
      .upload(imagePath, payload.image, {
        cacheControl: "3600",
        upsert: false,
        contentType: payload.image.type,
      });

    if (uploadError) {
      throw new Error(`Failed to upload course image: ${uploadError.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from("skill-images")
      .getPublicUrl(imagePath);

    imageUrl = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("user_skills")
    .insert({
      user_id: profile.id,
      skill_id: payload.skill_id,
      skill_type: payload.skill_type,
      proficiency_level: payload.proficiency_level ?? "Beginner",
      description: payload.description?.trim() || null,
      image_url: imageUrl,
    })
    .select(
      `
      id,
      user_id,
      skill_id,
      skill_type,
      proficiency_level,
      description,
      image_url,
      created_at,
      skills (
        id,
        name,
        category,
        description,
        image_url,
        is_active
      )
    `,
    )
    .single();

  if (error) {
    if (imagePath) {
      await supabase.storage.from("skill-images").remove([imagePath]);
    }

    throw new Error(error.message);
  }

  if (payload.skill_type === "offered") {
    const { error: sessionOptionError } = await supabase
      .from("user_skill_sessions")
      .insert({
        user_skill_id: data.id,
        duration_minutes: 60,
        token_rate: 5,
        is_active: true,
      });

    if (sessionOptionError) {
      await supabase.from("user_skills").delete().eq("id", data.id);

      if (imagePath) {
        await supabase.storage.from("skill-images").remove([imagePath]);
      }

      throw new Error(
        `Failed to create the default 60-minute session option: ${sessionOptionError.message}`,
      );
    }
  }

  return data;
};

export const removeSkill = async (skillId: string) => {
  const { data: skill, error: skillFetchError } = await supabase
    .from("user_skills")
    .select("image_url")
    .eq("id", skillId)
    .single();

  if (skillFetchError) {
    throw new Error(skillFetchError.message);
  }

  const { error } = await supabase
    .from("user_skills")
    .delete()
    .eq("id", skillId);

  if (error) {
    throw new Error(error.message);
  }

  if (skill?.image_url) {
    try {
      const imageUrl = new URL(skill.image_url);

      const marker = "/storage/v1/object/public/skill-images/";

      const markerIndex = imageUrl.pathname.indexOf(marker);

      if (markerIndex !== -1) {
        const imagePath = decodeURIComponent(
          imageUrl.pathname.substring(markerIndex + marker.length),
        );

        if (imagePath.startsWith("users/")) {
          await supabase.storage.from("skill-images").remove([imagePath]);
        }
      }
    } catch {}
  }

  return true;
};
