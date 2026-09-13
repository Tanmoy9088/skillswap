// lib/sessionOptions.ts

import { createClient } from "@/lib/supabase/client";

import type {
  BookingSessionOption,
  SessionDuration,
  UserSkillSession,
} from "@/types/types/swaps";

/**
 * ============================================================
 * GET SESSION OPTIONS FOR A USER SKILL
 * ============================================================
 *
 * Used by the booking page.
 *
 * Only active options are returned because the learner should
 * only be able to select currently available options.
 */
export const getSessionOptions = async (
  userSkillId: string,
): Promise<BookingSessionOption[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("user_skill_sessions")
    .select(
      `
      id,
      user_skill_id,
      duration_minutes,
      token_rate,
      is_active,
      created_at
    `,
    )
    .eq("user_skill_id", userSkillId)
    .eq("is_active", true)
    .order("duration_minutes", {
      ascending: true,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as BookingSessionOption[];
};

/**
 * ============================================================
 * GET MY SESSION OPTIONS
 * ============================================================
 *
 * Used by the mentor's skill/session management UI.
 *
 * If userSkillId is provided, only options belonging to that
 * user skill are returned.
 *
 * This includes inactive options so the mentor can see them
 * and potentially reactivate/edit them later.
 */
export const getMySessionOptions = async (
  userSkillId?: string,
): Promise<UserSkillSession[]> => {
  const supabase = createClient();

  let query = supabase
    .from("user_skill_sessions")
    .select(
      `
      id,
      user_skill_id,
      duration_minutes,
      token_rate,
      is_active,
      created_at
    `,
    )
    .order("duration_minutes", {
      ascending: true,
    });

  if (userSkillId) {
    query = query.eq("user_skill_id", userSkillId);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as UserSkillSession[];
};

/**
 * ============================================================
 * CREATE SESSION OPTION
 * ============================================================
 *
 * Mentor creates a predefined session option.
 *
 * Example:
 *
 * 30 minutes -> 10 tokens
 * 60 minutes -> 18 tokens
 * 90 minutes -> 25 tokens
 */
export const createSessionOption = async ({
  userSkillId,
  durationMinutes,
  tokenRate,
}: {
  userSkillId: string;
  durationMinutes: SessionDuration;
  tokenRate: number;
}): Promise<UserSkillSession> => {
  const supabase = createClient();

  // ----------------------------------------------------------
  // Validate token rate
  // ----------------------------------------------------------

  if (tokenRate < 0) {
    throw new Error("Token rate cannot be negative.");
  }

  // ----------------------------------------------------------
  // Check the currently authenticated browser user
  // ----------------------------------------------------------

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(
      `Unable to verify authenticated user: ${userError.message}`,
    );
  }

  if (!user) {
    throw new Error("You must be logged in to create a session option.");
  }

  // ----------------------------------------------------------
  // Insert session option
  // ----------------------------------------------------------

  const { data, error } = await supabase
    .from("user_skill_sessions")
    .insert({
      user_skill_id: userSkillId,
      duration_minutes: durationMinutes,
      token_rate: tokenRate,
      is_active: true,
    })
    .select(
      `
      id,
      user_skill_id,
      duration_minutes,
      token_rate,
      is_active,
      created_at
    `,
    )
    .single();

  if (error) {
    console.error("CREATE SESSION OPTION ERROR:", error);

    throw new Error(error.message);
  }

  return data as UserSkillSession;
};

/**
 * ============================================================
 * UPDATE SESSION OPTION
 * ============================================================
 */
export const updateSessionOption = async ({
  sessionOptionId,
  durationMinutes,
  tokenRate,
  isActive,
}: {
  sessionOptionId: string;
  durationMinutes?: SessionDuration;
  tokenRate?: number;
  isActive?: boolean;
}): Promise<UserSkillSession> => {
  const supabase = createClient();

  // ----------------------------------------------------------
  // Validate token rate
  // ----------------------------------------------------------

  if (tokenRate !== undefined && tokenRate < 0) {
    throw new Error("Token rate cannot be negative.");
  }

  // ----------------------------------------------------------
  // Build update object
  // ----------------------------------------------------------

  const updateData: {
    duration_minutes?: SessionDuration;
    token_rate?: number;
    is_active?: boolean;
  } = {};

  if (durationMinutes !== undefined) {
    updateData.duration_minutes = durationMinutes;
  }

  if (tokenRate !== undefined) {
    updateData.token_rate = tokenRate;
  }

  if (isActive !== undefined) {
    updateData.is_active = isActive;
  }

  // ----------------------------------------------------------
  // Update
  // ----------------------------------------------------------

  const { data, error } = await supabase
    .from("user_skill_sessions")
    .update(updateData)
    .eq("id", sessionOptionId)
    .select(
      `
      id,
      user_skill_id,
      duration_minutes,
      token_rate,
      is_active,
      created_at
    `,
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as UserSkillSession;
};

/**
 * ============================================================
 * DELETE / DEACTIVATE SESSION OPTION
 * ============================================================
 *
 * We do NOT physically delete the record.
 *
 * Existing swaps may reference this session option, so we
 * simply mark it inactive.
 */
export const deactivateSessionOption = async (
  sessionOptionId: string,
): Promise<void> => {
  const supabase = createClient();

  const { error } = await supabase
    .from("user_skill_sessions")
    .update({
      is_active: false,
    })
    .eq("id", sessionOptionId);

  if (error) {
    throw new Error(error.message);
  }
};
