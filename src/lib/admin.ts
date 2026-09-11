import { createClient } from "@/lib/supabase/client";

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

export interface AdminSkill {
  id: string;
  user_id: string;
  skill_name: string | null;
  skill_type: "offered" | "wanted" | null;
  proficiency_level: string | null;
  category: string | null;
  description: string | null;
  token_rate: number | null;
  created_at: string;
  mentor_name: string | null;
  mentor_profile_img: string | null;
}

export const getAdminSkills = async (): Promise<AdminSkill[]> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_admin_skills");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminSkill[];
};

export const deleteAdminSkill = async (skillId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("delete_admin_skill", {
    p_skill_id: skillId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

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
