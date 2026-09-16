import { createClient } from "@/lib/supabase/client";

import type { AdminUser, AdminUsersResponse } from "./adminTypes";

export const getAdminUsers = async (
  page: number = 1,
  pageSize: number = 3,
): Promise<AdminUsersResponse> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_admin_users", {
    p_page: page,
    p_page_size: pageSize,
  });

  if (error) {
    throw new Error(error.message);
  }

  const result = data ?? {};

  const users = (result.users ?? []) as AdminUser[];
  const total = Number(result.total ?? 0);

  return {
    users,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
};

export const getAdminAllUsers = async (): Promise<AdminUser[]> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_admin_all_users");

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
