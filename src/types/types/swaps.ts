export type SwapRequestStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "completed";

export interface SwapRequest {
  id: string;

  requester_auth_user_id: string;
  mentor_auth_user_id: string;

  skill_id: string;
  skill_name: string;

  message: string | null;

  status: SwapRequestStatus;

  created_at: string;
  updated_at: string;

  requester_name: string;
  requester_profile_img: string | null;

  mentor_name: string;
  mentor_profile_img: string | null;

  token_rate: number;
  proficiency_level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export type SwapStatus =
  | "accepted"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface Swap {
  id: string;
  request_id: string;
  learner_auth_user_id: string;
  mentor_auth_user_id: string;
  skill_id: string;
  skill_name: string;
  token_rate: number;
  status: SwapStatus;

  scheduled_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  cancelled_at: string | null;

  created_at: string;
  updated_at: string;

  learner_name: string;
  learner_profile_img: string | null;

  mentor_name: string;
  mentor_profile_img: string | null;
}
