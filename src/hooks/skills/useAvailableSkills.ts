import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
export interface AvailableSkill {
  id: string;
  name: string;
  category: string;
  description: string | null;
  image_url: string | null;
}
const fetchAvailableSkills = async (): Promise<AvailableSkill[]> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("skills")
    .select(` id, name, category, description, image_url `)
    .eq("is_active", true)
    .order("name", { ascending: true });
  if (error) {
    throw new Error(error.message);
  }
  return data ?? [];
};
export const useAvailableSkills = () => {
  return useQuery({
    queryKey: ["available-skills"],
    queryFn: fetchAvailableSkills,
    staleTime: 5 * 60 * 1000,
  });
};
