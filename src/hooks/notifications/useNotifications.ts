"use client";

import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/client";

export interface Notification {
  id: string;
  user_auth_user_id: string;
  type: string;
  title: string;
  message: string;
  related_id: string | null;
  is_read: boolean;
  created_at: string;
}

const getNotifications = async (): Promise<Notification[]> => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("notifications")
    .select(
      "id, user_auth_user_id, type, title, message, related_id, is_read, created_at",
    )
    .eq("user_auth_user_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });
};
