import type { MentorRating, MentorReview } from "@/lib/mentorProfile";

export type SkillProficiency =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert";

export type SkillType = "offered" | "wanted";

/**
 * Master skill from `skills` table
 */
export interface MasterSkill {
  id: string;
  name: string;
  category: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
}

/**
 * Skill returned by the skill discovery RPC
 */
export interface SkillDiscoveryItem {
  id: string; // user_skills.id
  skill_id: string; // skills.id
  user_id: string;
  auth_user_id: string;

  skill_name: string;
  skill_type: SkillType;
  proficiency_level: SkillProficiency;

  category: string;
  description: string | null;

  token_rate: number;

  /**
   * User course image if available,
   * otherwise master skill image.
   */
  image_url: string | null;

  mentor_name: string;
  mentor_profile_img: string | null;

  average_rating: number;
  total_ratings: number;
}

export interface SkillDiscoveryResponse {
  items: SkillDiscoveryItem[];
  total: number;
}

/**
 * Skill information displayed on the
 * `/skills/[skillName]` details page.
 *
 * Data comes from the `skills` master table.
 */
export interface SkillDetails {
  id: string;
  skill_name: string;
  category: string;
  description: string | null;
  token_rate: number;
  image_url?: string | null;
}

/**
 * Mentor shown on a skill details page.
 */
export interface SkillMentor {
  id: string; // user_skills.id
  auth_user_id: string;

  skill_id?: string;
  skill_name: string;

  proficiency_level: SkillProficiency;

  description: string | null;
  token_rate: number;

  name: string;
  bio: string | null;
  profile_img: string | null;

  rating: number;
  total_ratings?: number;

  /**
   * User's course/teaching image.
   */
  image_url?: string | null;

  /**
   * Master skill image.
   */
  skill_image_url?: string | null;
}

export interface SkillDetailsResponse {
  skill: SkillDetails | null;
  mentors: SkillMentor[];
}

/**
 * Basic mentor profile.
 */
export interface MentorProfile {
  auth_user_id: string;
  name: string;
  bio: string | null;
  profile_img: string | null;
}

/**
 * Skills displayed on a mentor profile.
 *
 * `skill_name`, `category`, and master image come
 * from the related `skills` record.
 */
export interface MentorSkill {
  id: string;
  skill_id?: string;

  skill_name: string;
  category: string;

  proficiency_level: SkillProficiency;

  description: string | null;

  token_rate: number;

  skill_type: SkillType;

  // User's personal course image
  image_url?: string | null;

  // Admin/master skill image
  skill_image_url?: string | null;

  // Master skill relationship
  skills?: {
    id: string;
    name: string;
    category: string | null;
    description: string | null;
    image_url: string | null;
    is_active: boolean;
  } | null;
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

/**
 * Data used by MentorCard.
 */
export interface MentorCardData {
  id: string;
  auth_user_id: string;

  name: string;
  profile_img: string | null;

  skill_id?: string;
  skill_name: string;

  proficiency_level: SkillProficiency;

  description: string | null;
  token_rate: number;

  rating: number;
  total_ratings: number;

  /**
   * User course image.
   */
  image_url?: string | null;

  /**
   * Admin/master skill image.
   */
  skill_image_url?: string | null;
}
