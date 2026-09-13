// types/types/swaps.ts

export type SwapRequestStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "completed";

export type SwapStatus =
  | "accepted"
  | "schedule_requested"
  | "mentor_reschedule_proposed"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

export type SessionDuration = 30 | 45 | 60 | 90 | 120;

/*
============================================================
SESSION OPTION
============================================================

Created by the mentor for one offered skill.

Example:

30 minutes → 10 tokens
60 minutes → 18 tokens
90 minutes → 25 tokens
*/

export interface UserSkillSession {
  id: string;

  user_skill_id: string;

  duration_minutes: SessionDuration;

  token_rate: number;

  is_active: boolean;

  created_at: string;
}

/*
============================================================
SWAP REQUEST
============================================================
*/

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

/*
============================================================
SWAP
============================================================

A swap stores the selected session option as a snapshot.

Even if the mentor later changes:

30 min → 10 tokens

to:

30 min → 15 tokens

an already-created booking remains at its original price.
*/

export interface Swap {
  id: string;

  request_id: string;

  learner_auth_user_id: string;

  mentor_auth_user_id: string;

  /*
   * IMPORTANT:
   *
   * This is the mentor's user_skills.id.
   */
  skill_id: string;

  skill_name: string;

  /*
   * The mentor session option selected by learner.
   */
  session_option_id: string | null;

  /*
   * Snapshot of duration at booking time.
   */
  duration_minutes: SessionDuration | null;

  /*
   * Snapshot of token price at booking time.
   */
  session_token_rate: number | null;

  /*
   * Legacy/current token_rate.
   *
   * Keep this for compatibility with existing UI.
   */
  token_rate: number;

  status: SwapStatus;

  scheduled_at: string | null;

  proposed_scheduled_at: string | null;

  schedule_requested_at: string | null;

  reschedule_proposed_at: string | null;

  schedule_note: string | null;

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

/*
============================================================
BOOKING SESSION OPTION
============================================================

Useful for the booking page.
*/

export interface BookingSessionOption {
  id: string;

  user_skill_id: string;

  duration_minutes: SessionDuration;

  token_rate: number;

  is_active: boolean;

  created_at: string;
}
