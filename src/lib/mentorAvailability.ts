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

const AVAILABILITY_SELECT =
  "id, mentor_auth_user_id, day_of_week, start_time, end_time, is_active, created_at";

export const getMyAvailability = async (): Promise<MentorAvailability[]> => {
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
    .select(AVAILABILITY_SELECT)
    .eq("mentor_auth_user_id", user.id)
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
      is_active: true,
    })
    .select(AVAILABILITY_SELECT)
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
    .update({
      is_active: isActive,
    })
    .eq("id", id)
    .eq("mentor_auth_user_id", user.id)
    .select(AVAILABILITY_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Availability record not found.");
  }

  return data as MentorAvailability;
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
    .update({
      day_of_week: dayOfWeek,
      start_time: startTime,
      end_time: endTime,
    })
    .eq("id", id)
    .eq("mentor_auth_user_id", user.id)
    .select(AVAILABILITY_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Availability record not found.");
  }

  return data as MentorAvailability;
};

export const deleteAvailability = async (id: string) => {
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
    .delete()
    .eq("id", id)
    .eq("mentor_auth_user_id", user.id)
    .select("id");

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    throw new Error("Availability record not found.");
  }

  return true;
};

export const getMentorAvailability = async (
  mentorAuthUserId: string,
): Promise<MentorAvailability[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("mentor_availability")
    .select(AVAILABILITY_SELECT)
    .eq("mentor_auth_user_id", mentorAuthUserId)
    .eq("is_active", true)
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as MentorAvailability[];
};
