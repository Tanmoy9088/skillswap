import { createClient } from "@/lib/supabase/client";
import type { AdminSession } from "./adminTypes";

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
