import { createClient } from "@/lib/supabase/client";
import type { AdminPlatformStats } from "./adminTypes";

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
