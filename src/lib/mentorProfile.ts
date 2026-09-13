import { createClient } from "@/lib/supabase/client";
import type { MentorSkill } from "@/types/types/skills";

export interface MentorRating {
  average_rating: number;
  total_ratings: number;
}

export interface MentorReview {
  id: string;
  rating: number;
  review: string | null;
  created_at: string;
  reviewer_name: string;
  reviewer_profile_img: string | null;
}

export interface MentorProfileResponse {
  profile: {
    id: string;
    auth_user_id: string;
    name: string;
    profile_img: string | null;
    role: string | null;
    bio: string | null;
  };

  skills: MentorSkill[];

  rating: MentorRating;

  reviews: MentorReview[];
}

export const getMentorProfile = async (
  authUserId: string,
): Promise<MentorProfileResponse> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_mentor_profile", {
    p_auth_user_id: authUserId,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Mentor profile not found");
  }

  /*
   * Supabase returns JSON from the RPC.
   *
   * Normalize the skills so the frontend always gets:
   *
   * skill_id
   * skill_name
   * category
   * proficiency_level
   * description
   * token_rate
   * image_url
   * skill_image_url
   */
  const response = data as MentorProfileResponse;

  const skills: MentorSkill[] = Array.isArray(response.skills)
    ? response.skills.map((skill) => ({
        ...skill,

        skill_id: skill.skill_id ?? "",

        skill_name: skill.skill_name ?? "Unknown Skill",

        category: skill.category ?? "Technology",

        proficiency_level: skill.proficiency_level ?? "Beginner",

        description: skill.description ?? null,

        token_rate: Number(skill.token_rate ?? 0),

        image_url: skill.image_url ?? null,

        skill_image_url: skill.skill_image_url ?? null,
      }))
    : [];

  return {
    ...response,
    skills,
  };
};
