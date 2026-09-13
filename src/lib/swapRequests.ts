// lib/swapRequests.ts

import { createClient } from "@/lib/supabase/client";

import type { Swap, SwapRequest } from "@/types/types/swaps";

/*
============================================================
CREATE SWAP REQUEST
============================================================
*/

interface CreateSwapRequestParams {
  mentorAuthUserId: string;

  /*
   * This is the mentor's user_skills.id.
   */
  skillId: string;

  message?: string;
}

export interface CreateSwapRequestResponse {
  success: boolean;

  request_id: string;

  status: string;

  skill_name: string;
}

export const createSwapRequest = async ({
  mentorAuthUserId,
  skillId,
  message,
}: CreateSwapRequestParams): Promise<CreateSwapRequestResponse> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("create_swap_request", {
    p_mentor_auth_user_id: mentorAuthUserId,

    p_skill_id: skillId,

    p_message: message ?? null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as CreateSwapRequestResponse;
};

/*
============================================================
GET MY SWAP REQUESTS
============================================================
*/

export const getMySwapRequests = async (): Promise<SwapRequest[]> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_my_swap_requests");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as SwapRequest[];
};

/*
============================================================
GET MY SWAPS
============================================================
*/

export const getMySwaps = async (): Promise<Swap[]> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_my_swaps");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Swap[];
};

/*
============================================================
UPDATE SWAP REQUEST STATUS
============================================================
*/

export const updateSwapRequestStatus = async ({
  requestId,
  status,
}: {
  requestId: string;

  status: "accepted" | "rejected" | "cancelled";
}) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("update_swap_request_status", {
    p_request_id: requestId,

    p_status: status,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/*
============================================================
ACCEPT SWAP REQUEST
============================================================
*/

export const acceptSwapRequest = async (requestId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("accept_swap_request", {
    p_request_id: requestId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/*
============================================================
REQUEST SESSION TIME
============================================================

ONLY THE LEARNER SHOULD CALL THIS.

IMPORTANT:

We intentionally DO NOT send:

durationMinutes
tokenRate

The database gets both values from:

user_skill_sessions
*/

export interface RequestScheduleSwapParams {
  swapId: string;

  sessionOptionId: string;

  scheduledAt: string;

  note?: string;
}

export interface RequestScheduleSwapResponse {
  success: boolean;

  swap_id: string;

  status: "schedule_requested";

  session_option_id: string;

  duration_minutes: number;

  session_token_rate: number;

  proposed_scheduled_at: string;

  session_end_at: string;
}

export const requestScheduleSwap = async ({
  swapId,
  sessionOptionId,
  scheduledAt,
  note,
}: RequestScheduleSwapParams): Promise<RequestScheduleSwapResponse> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("request_schedule_swap", {
    p_swap_id: swapId,

    p_session_option_id: sessionOptionId,

    p_scheduled_at: scheduledAt,

    p_note: note ?? null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as RequestScheduleSwapResponse;
};

/*
============================================================
CONFIRM SESSION
============================================================

ONLY MENTOR.
*/

export interface ConfirmScheduleSwapResponse {
  success: boolean;

  swap_id: string;

  status: "scheduled";

  scheduled_at: string;

  duration_minutes: number;

  session_token_rate: number | null;

  session_end_at: string;
}

export const confirmScheduleSwap = async (
  swapId: string,
): Promise<ConfirmScheduleSwapResponse> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("confirm_schedule_swap", {
    p_swap_id: swapId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as ConfirmScheduleSwapResponse;
};

/*
============================================================
MENTOR PROPOSES ANOTHER TIME
============================================================
*/

export interface ProposeSwapRescheduleParams {
  swapId: string;

  proposedAt: string;

  note?: string;
}

export interface ProposeSwapRescheduleResponse {
  success: boolean;

  swap_id: string;

  status: "mentor_reschedule_proposed";

  proposed_scheduled_at: string;

  duration_minutes: number;

  session_end_at: string;
}

export const proposeSwapReschedule = async ({
  swapId,
  proposedAt,
  note,
}: ProposeSwapRescheduleParams): Promise<ProposeSwapRescheduleResponse> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("propose_swap_reschedule", {
    p_swap_id: swapId,

    p_proposed_at: proposedAt,

    p_note: note ?? null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as ProposeSwapRescheduleResponse;
};

/*
============================================================
LEARNER RESPONDS TO RESCHEDULE
============================================================
*/

export interface RespondToRescheduleResponse {
  success: boolean;

  swap_id: string;

  status: "scheduled" | "accepted";

  scheduled_at?: string;
}

export const respondToReschedule = async ({
  swapId,
  accept,
}: {
  swapId: string;

  accept: boolean;
}): Promise<RespondToRescheduleResponse> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("respond_to_reschedule", {
    p_swap_id: swapId,

    p_accept: accept,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data as RespondToRescheduleResponse;
};

/*
============================================================
START SESSION
============================================================

ONLY MENTOR.
*/

export const startSwapSession = async (swapId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("start_swap_session", {
    p_swap_id: swapId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/*
============================================================
COMPLETE SESSION
============================================================

ONLY MENTOR.

Database also checks that the scheduled session duration
has elapsed.
*/

export const completeSwapSession = async (swapId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("complete_swap_session", {
    p_swap_id: swapId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

/*
============================================================
CREATE RATING
============================================================
*/

export const createSwapRating = async (
  swapId: string,

  rating: number,

  review?: string,
) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("create_swap_rating", {
    p_swap_id: swapId,

    p_rating: rating,

    p_review: review ?? null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getMySwapRating = async (swapId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_my_swap_rating", {
    p_swap_id: swapId,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateSwapRating = async (
  swapId: string,
  rating: number,
  review?: string,
) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("update_swap_rating", {
    p_swap_id: swapId,
    p_rating: rating,
    p_review: review ?? null,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getSwapById = async (swapId: string): Promise<Swap> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_swap_by_id", {
    p_swap_id: swapId,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Swap not found.");
  }

  return data as Swap;
};
