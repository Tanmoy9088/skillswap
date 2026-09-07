import { createClient } from "@/lib/supabase/client";
import { MentorSkill } from "@/types/types/skills";

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

  return data as MentorProfileResponse;
};
