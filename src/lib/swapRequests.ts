import { createClient } from "@/lib/supabase/client";

import type { SwapRequest } from "@/types/types/swaps";

interface CreateSwapRequestParams {
  mentorAuthUserId: string;
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

export const getMySwapRequests = async (): Promise<SwapRequest[]> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_my_swap_requests");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as SwapRequest[];
};

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

export const getMySwaps = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_my_swaps");

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
};

export const scheduleSwapSession = async (
  swapId: string,
  scheduledAt: string,
) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("schedule_swap_session", {
    p_swap_id: swapId,
    p_scheduled_at: scheduledAt,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const startSwapSession = async (
  swapId: string
) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "start_swap_session",
    {
      p_swap_id: swapId,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const completeSwapSession = async (swapId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "complete_swap_session",
    {
      p_swap_id: swapId,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const createSwapRating = async (
  swapId: string,
  rating: number,
  review?: string
) => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc(
    "create_swap_rating",
    {
      p_swap_id: swapId,
      p_rating: rating,
      p_review: review ?? null,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
};