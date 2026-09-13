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
  token_rate?: number;
  image?: File | null;
}

const supabase = createClient();

/*
|--------------------------------------------------------------------------
| Get Current Profile
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Update Profile
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Get User Skills
|--------------------------------------------------------------------------
|
| user_skills = user's relationship with a skill
|
| skills = admin-controlled master skill
|
|--------------------------------------------------------------------------
*/

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

  /**
   * Get user's profile
   */
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  /**
   * Get user's skills and the related
   * admin-created master skill.
   */
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
      token_rate,
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

/*
|--------------------------------------------------------------------------
| Add User Skill
|--------------------------------------------------------------------------
|
| The user selects an existing skill from the
| admin-created skills table.
|
| The user does NOT create the master skill.
|
| The user CAN upload their own course image.
|
|--------------------------------------------------------------------------
*/

export const addSkill = async (payload: AddSkillPayload) => {
  /*
   * Get authenticated user
   */
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

  /*
   * Get user's profile
   */
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

  /*
   * Verify that the selected master skill exists
   * and is active.
   */
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

  /*
   * Check whether the user has already added
   * this skill with the same type.
   *
   * Example:
   *
   * React -> offered
   *
   * Cannot add:
   *
   * React -> offered
   *
   * But can add:
   *
   * React -> wanted
   */
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

  /*
  |--------------------------------------------------------------------------
  | Upload User Course Image
  |--------------------------------------------------------------------------
  |
  | Admin image:
  |
  | skill-images/admin/...
  |
  | User course image:
  |
  | skill-images/users/<profile-id>/...
  |
  |--------------------------------------------------------------------------
  */

  let imageUrl: string | null = null;
  let imagePath: string | null = null;

  if (payload.image) {
    /*
     * Validate image type
     */
    if (!payload.image.type.startsWith("image/")) {
      throw new Error("Please upload a valid image.");
    }

    /*
     * Maximum 5MB
     */
    if (payload.image.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be less than 5MB.");
    }

    /*
     * Get extension
     */
    const extension =
      payload.image.name.split(".").pop()?.toLowerCase() || "jpg";

    /*
     * Create user-specific path
     *
     * Example:
     *
     * users/
     *   profile-id/
     *     uuid.jpg
     */
    imagePath = `users/${profile.id}/${crypto.randomUUID()}.${extension}`;

    /*
     * Upload image
     */
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

    /*
     * Get public URL
     */
    const { data: publicUrlData } = supabase.storage
      .from("skill-images")
      .getPublicUrl(imagePath);

    imageUrl = publicUrlData.publicUrl;
  }

  /*
  |--------------------------------------------------------------------------
  | Create User Skill Relationship
  |--------------------------------------------------------------------------
  */

  const { data, error } = await supabase
    .from("user_skills")
    .insert({
      user_id: profile.id,
      skill_id: payload.skill_id,
      skill_type: payload.skill_type,

      proficiency_level: payload.proficiency_level ?? "Beginner",

      description: payload.description?.trim() || null,

      /*
       * Token rate only applies when
       * the user offers the skill.
       */
      token_rate:
        payload.skill_type === "offered" ? (payload.token_rate ?? 1) : null,

      /*
       * This is the USER'S course image.
       *
       * It is NOT the admin master image.
       */
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
      token_rate,
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

  /*
   * If database insertion fails after image upload,
   * remove the uploaded image so we don't leave
   * unused files in Storage.
   */
  if (error) {
    if (imagePath) {
      await supabase.storage.from("skill-images").remove([imagePath]);
    }

    throw new Error(error.message);
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Remove User Skill
|--------------------------------------------------------------------------
*/

export const removeSkill = async (skillId: string) => {
  /*
   * Get the skill first so we can remove
   * the user's course image after deleting
   * the user_skills record.
   */
  const { data: skill, error: skillFetchError } = await supabase
    .from("user_skills")
    .select("image_url")
    .eq("id", skillId)
    .single();

  if (skillFetchError) {
    throw new Error(skillFetchError.message);
  }

  /*
   * Delete user_skills record
   */
  const { error } = await supabase
    .from("user_skills")
    .delete()
    .eq("id", skillId);

  if (error) {
    throw new Error(error.message);
  }

  /*
   * Remove user's course image from Storage.
   *
   * We only do this for images belonging to
   * the user-skills record.
   */
  if (skill?.image_url) {
    try {
      const imageUrl = new URL(skill.image_url);

      const marker = "/storage/v1/object/public/skill-images/";

      const markerIndex = imageUrl.pathname.indexOf(marker);

      if (markerIndex !== -1) {
        const imagePath = decodeURIComponent(
          imageUrl.pathname.substring(markerIndex + marker.length),
        );

        /*
         * Only remove user images.
         *
         * We never remove:
         *
         * skill-images/admin/...
         */
        if (imagePath.startsWith("users/")) {
          await supabase.storage.from("skill-images").remove([imagePath]);
        }
      }
    } catch {
      /*
       * The database record has already been deleted.
       * If image cleanup fails, don't fail the entire
       * delete operation.
       */
    }
  }

  return true;
};
