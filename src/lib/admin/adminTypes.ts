export interface AdminPlatformStats {
  total_users: number;
  total_skills: number;
  total_sessions: number;
  active_mentors: number;
}

export interface AdminUser {
  id: string;
  auth_user_id: string;
  name: string | null;
  profile_img: string | null;
  role: string | null;
  is_active: boolean | null;
  created_at: string;
}

export interface AdminMasterSkill {
  id: string;
  name: string;
  category: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  created_by: string | null;
}

export interface CreateAdminSkillPayload {
  name: string;
  category: string;
  description?: string;
  image?: File | null;
}

export interface UpdateAdminSkillPayload {
  skillId: string;
  name?: string;
  category?: string;
  description?: string;
  is_active?: boolean;
  image?: File | null;
}

export interface AdminSession {
  id: string;
  request_id: string | null;
  skill_id: string | null;
  learner_auth_user_id: string;
  mentor_auth_user_id: string;
  status: "accepted" | "scheduled" | "in_progress" | "completed" | "cancelled";
  scheduled_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;
  created_at: string;
  updated_at: string;
  skill_name: string | null;
  category: string | null;
  token_rate: number | null;
  learner_name: string | null;
  learner_profile_img: string | null;
  mentor_name: string | null;
  mentor_profile_img: string | null;
}
