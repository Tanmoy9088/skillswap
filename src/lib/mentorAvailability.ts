import { createClient } from "@/lib/supabase/client";

export interface MentorAvailability {
  id: string;
  mentor_auth_user_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_active: boolean;
  created_at: string;
}

export const getMyAvailability = async (): Promise<MentorAvailability[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("mentor_availability")
    .select(
      "id, mentor_auth_user_id, day_of_week, start_time, end_time, is_active, created_at",
    )
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as MentorAvailability[];
};

export const createAvailability = async ({
  dayOfWeek,
  startTime,
  endTime,
}: {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}) => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("mentor_availability")
    .insert({
      mentor_auth_user_id: user.id,
      day_of_week: dayOfWeek,
      start_time: startTime,
      end_time: endTime,
    })
    .select(
      "id, mentor_auth_user_id, day_of_week, start_time, end_time, is_active, created_at",
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as MentorAvailability;
};

export const updateAvailabilityStatus = async ({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("mentor_availability")
    .update({
      is_active: isActive,
    })
    .eq("id", id)
    .select(
      "id, mentor_auth_user_id, day_of_week, start_time, end_time, is_active, created_at",
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as MentorAvailability;
};

export const deleteAvailability = async (id: string) => {
  const supabase = createClient();

  const { error } = await supabase
    .from("mentor_availability")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};

export const getMentorAvailability = async (
  mentorAuthUserId: string,
): Promise<MentorAvailability[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("mentor_availability")
    .select(
      "id, mentor_auth_user_id, day_of_week, start_time, end_time, is_active, created_at",
    )
    .eq("mentor_auth_user_id", mentorAuthUserId)
    .eq("is_active", true)
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as MentorAvailability[];
};

export const updateAvailability = async ({
  id,
  dayOfWeek,
  startTime,
  endTime,
}: {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}) => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("mentor_availability")
    .update({
      day_of_week: dayOfWeek,
      start_time: startTime,
      end_time: endTime,
    })
    .eq("id", id)
    .select(
      "id, mentor_auth_user_id, day_of_week, start_time, end_time, is_active, created_at",
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as MentorAvailability;
};
