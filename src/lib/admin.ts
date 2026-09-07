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
