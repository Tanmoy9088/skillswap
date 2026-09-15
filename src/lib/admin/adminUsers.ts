import { createClient } from "@/lib/supabase/client";
import type { AdminUser } from "./adminTypes";

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
