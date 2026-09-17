import { createClient } from "@/lib/supabase/client";

export const markNotificationAsRead = async (notificationId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("mark_notification_as_read", {
    p_notification_id: notificationId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const markAllNotificationsAsRead = async () => {
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
    .update({
      is_read: true,
    })
    .eq("user_auth_user_id", user.id)
    .eq("is_read", false);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
