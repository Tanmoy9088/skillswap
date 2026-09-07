import { createClient } from "@/lib/supabase/client";
import type { SkillDetailsResponse } from "@/types/types/skills";

export const getSkillDetails = async (
  skillName: string
): Promise<SkillDetailsResponse> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "get_skill_details",
    {
      p_skill_name: skillName,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return {
    skill: data?.skill ?? null,
    mentors: data?.mentors ?? [],
  };
};