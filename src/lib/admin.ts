import { createClient } from "@/lib/supabase/client";

/*
|--------------------------------------------------------------------------
| Admin Platform Stats
|--------------------------------------------------------------------------
*/

export interface AdminPlatformStats {
  total_users: number;
  total_skills: number;
  total_sessions: number;
  active_mentors: number;
}

export const getAdminPlatformStats = async (): Promise<AdminPlatformStats> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_admin_platform_stats");

  if (error) {
    throw new Error(error.message);
  }

  return {
    total_users: Number(data?.total_users ?? 0),
    total_skills: Number(data?.total_skills ?? 0),
    total_sessions: Number(data?.total_sessions ?? 0),
    active_mentors: Number(data?.active_mentors ?? 0),
  };
};

/*
|--------------------------------------------------------------------------
| Admin Users
|--------------------------------------------------------------------------
*/

export interface AdminUser {
  id: string;
  auth_user_id: string;
  name: string | null;
  profile_img: string | null;
  role: string | null;
  is_active: boolean | null;
  created_at: string;
}

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_admin_users");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminUser[];
};

export const toggleAdminUserStatus = async (
  userId: string,
  isActive: boolean,
) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("toggle_admin_user_status", {
    p_user_id: userId,
    p_is_active: isActive,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Admin Master Skills
|--------------------------------------------------------------------------
|
| These are the skills created and controlled by admins.
|
| Table:
|
| public.skills
|
|--------------------------------------------------------------------------
*/

export interface AdminMasterSkill {
  id: string;
  name: string;
  category: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  created_by: string | null;
}

export const getAdminSkills = async (): Promise<AdminMasterSkill[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("skills")
    .select(
      `
        id,
        name,
        category,
        description,
        image_url,
        is_active,
        created_at,
        created_by
      `,
    )
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminMasterSkill[];
};

/*
|--------------------------------------------------------------------------
| Create Master Skill
|--------------------------------------------------------------------------
|
| Only an admin should be able to successfully
| execute this operation.
|
| RLS must enforce admin access in Supabase.
|
|--------------------------------------------------------------------------
*/

export interface CreateAdminSkillPayload {
  name: string;
  category: string;
  description?: string;
  image?: File | null;
}

export const createAdminSkill = async (payload: CreateAdminSkillPayload) => {
  const supabase = createClient();

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
   * Get admin's profile
   */
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

  /*
   * Client-side admin check.
   *
   * IMPORTANT:
   * This is NOT the security mechanism.
   *
   * RLS must also enforce this in Supabase.
   */
  if (profile.role !== "admin") {
    throw new Error("You do not have permission to create skills.");
  }

  /*
   * Upload master skill image.
   *
   * Unlike the old system, this image belongs
   * to the master skill and is uploaded only
   * by an admin.
   */
  let imageUrl: string | null = null;
  let uploadedFilePath: string | null = null;

  if (payload.image) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(payload.image.type)) {
      throw new Error("Please upload a JPG, PNG, or WebP image.");
    }

    if (payload.image.size > 5 * 1024 * 1024) {
      throw new Error("Image must be smaller than 5MB.");
    }

    const fileExtension =
      payload.image.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${crypto.randomUUID()}.${fileExtension}`;

    uploadedFilePath = `admin/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("skill-images")
      .upload(uploadedFilePath, payload.image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Image upload failed: ${uploadError.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("skill-images").getPublicUrl(uploadedFilePath);

    imageUrl = publicUrl;
  }

  /*
   * Create master skill
   */
  const { data, error } = await supabase
    .from("skills")
    .insert({
      name: payload.name.trim(),
      category: payload.category.trim(),
      description: payload.description?.trim() || null,
      image_url: imageUrl,
      is_active: true,
      created_by: profile.id,
    })
    .select(
      `
      id,
      name,
      category,
      description,
      image_url,
      is_active,
      created_at,
      created_by
    `,
    )
    .single();

  if (error) {
    /*
     * Remove uploaded image if database
     * insertion failed.
     */
    if (uploadedFilePath) {
      await supabase.storage.from("skill-images").remove([uploadedFilePath]);
    }

    throw new Error(error.message);
  }

  return data as AdminMasterSkill;
};

/*
|--------------------------------------------------------------------------
| Update Master Skill
|--------------------------------------------------------------------------
*/

export interface UpdateAdminSkillPayload {
  skillId: string;
  name?: string;
  category?: string;
  description?: string;
  is_active?: boolean;
  image?: File | null;
}

export const updateAdminSkill = async (payload: UpdateAdminSkillPayload) => {
  const supabase = createClient();

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
   * Get admin profile
   */
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (!profile || profile.role !== "admin") {
    throw new Error("You do not have permission to update skills.");
  }

  /*
   * Prepare update object.
   */
  const updateData: Record<string, unknown> = {};

  if (payload.name !== undefined) {
    updateData.name = payload.name.trim();
  }

  if (payload.category !== undefined) {
    updateData.category = payload.category.trim();
  }

  if (payload.description !== undefined) {
    updateData.description = payload.description.trim() || null;
  }

  if (payload.is_active !== undefined) {
    updateData.is_active = payload.is_active;
  }

  /*
   * Upload a new image if provided.
   */
  if (payload.image) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(payload.image.type)) {
      throw new Error("Please upload a JPG, PNG, or WebP image.");
    }

    if (payload.image.size > 5 * 1024 * 1024) {
      throw new Error("Image must be smaller than 5MB.");
    }

    const fileExtension =
      payload.image.name.split(".").pop()?.toLowerCase() || "jpg";

    const fileName = `${crypto.randomUUID()}.${fileExtension}`;

    const filePath = `admin/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("skill-images")
      .upload(filePath, payload.image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Image upload failed: ${uploadError.message}`);
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("skill-images").getPublicUrl(filePath);

    updateData.image_url = publicUrl;
  }

  /*
   * Update master skill.
   */
  const { data, error } = await supabase
    .from("skills")
    .update(updateData)
    .eq("id", payload.skillId)
    .select(
      `
      id,
      name,
      category,
      description,
      image_url,
      is_active,
      created_at,
      created_by
    `,
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AdminMasterSkill;
};

/*
|--------------------------------------------------------------------------
| Deactivate Master Skill
|--------------------------------------------------------------------------
|
| We don't physically delete the master skill.
|
| Existing user_skills records can continue to
| reference it safely.
|
|--------------------------------------------------------------------------
*/

export const deleteAdminSkill = async (skillId: string) => {
  const supabase = createClient();

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
   * Check admin
   */
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("auth_user_id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (!profile || profile.role !== "admin") {
    throw new Error("You do not have permission to delete skills.");
  }

  /*
   * Soft delete.
   */
  const { data, error } = await supabase
    .from("skills")
    .update({
      is_active: false,
    })
    .eq("id", skillId)
    .select(
      `
      id,
      name,
      category,
      description,
      image_url,
      is_active,
      created_at,
      created_by
    `,
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Admin Sessions
|--------------------------------------------------------------------------
*/

export interface AdminSession {
  id: string;
  request_id: string | null;
  skill_id: string | null;
  learner_auth_user_id: string;
  mentor_auth_user_id: string;
  status: "accepted" | "scheduled" | "in_progress" | "completed" | "cancelled";
  scheduled_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
  skill_name: string | null;
  category: string | null;
  token_rate: number | null;
  learner_name: string | null;
  learner_profile_img: string | null;
  mentor_name: string | null;
  mentor_profile_img: string | null;
}

export const getAdminSessions = async (): Promise<AdminSession[]> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_admin_sessions");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminSession[];
};

export const cancelAdminSession = async (sessionId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("cancel_admin_session", {
    p_swap_id: sessionId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
