import type { MentorRating, MentorReview } from "@/lib/mentorProfile";

export interface SkillDiscoveryItem {
  id: string;
  user_id: string;
  auth_user_id: string;

  skill_name: string;
  skill_type: "offered" | "wanted";

  proficiency_level: "Beginner" | "Intermediate" | "Advanced" | "Expert";

  category: string;
  description: string | null;
  token_rate: number;

  mentor_name: string;
  mentor_profile_img: string | null;

  average_rating: number;
  total_ratings: number;
}

export interface SkillDiscoveryResponse {
  items: SkillDiscoveryItem[];
  total: number;
}

export interface SkillDetails {
  skill_name: string;
  category: string;
  description: string | null;
  token_rate: number;
}

export interface SkillMentor {
  id: string;
  auth_user_id: string;
  skill_name: string;

  proficiency_level: "Beginner" | "Intermediate" | "Advanced" | "Expert";

  description: string | null;
  token_rate: number;

  name: string;
  bio: string | null;
  profile_img: string | null;

  rating: number;
}

export interface SkillDetailsResponse {
  skill: SkillDetails | null;
  mentors: SkillMentor[];
}

export interface MentorProfile {
  auth_user_id: string;
  name: string;
  bio: string | null;
  profile_img: string | null;
}

export interface MentorSkill {
  id: string;
  skill_name: string;
  category: string;

  proficiency_level: "Beginner" | "Intermediate" | "Advanced" | "Expert";

  description: string | null;
  token_rate: number;

  skill_type: "offered" | "wanted";
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
