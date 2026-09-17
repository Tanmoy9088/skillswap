import { supabaseAdmin } from "@/lib/supabase/admin";

interface CreateNotificationParams {
  userAuthUserId: string;
  type: string;
  title: string;
  message: string;
  relatedId?: string | null;
}

export const createNotification = async ({
  userAuthUserId,
  type,
  title,
  message,
  relatedId = null,
}: CreateNotificationParams) => {
  const { data, error } = await supabaseAdmin
    .from("notifications")
    .insert({
      user_auth_user_id: userAuthUserId,
      type,
      title,
      message,
      related_id: relatedId,
    })
    .select(
      "id, user_auth_user_id, type, title, message, related_id, is_read, created_at",
    )
    .single();

  if (error) {
    console.error("Failed to create notification:", error);
    throw new Error(error.message);
  }

  return data;
};
