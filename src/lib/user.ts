import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export const getUsers = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
