import { createClient } from "@/lib/supabase/client";

import type {
  AdminMasterSkill,
  CreateAdminSkillPayload,
  UpdateAdminSkillPayload,
} from "./adminTypes";

import {
  getAdminProfile,
  removeSkillImage,
  uploadSkillImage,
} from "./adminUtils";

const ADMIN_SKILL_SELECT = `
  id,
  name,
  category,
  description,
  image_url,
  is_active,
  created_at,
  created_by
`;

export const getAdminSkills = async (): Promise<AdminMasterSkill[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("skills")
    .select(ADMIN_SKILL_SELECT)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AdminMasterSkill[];
};

export const createAdminSkill = async (payload: CreateAdminSkillPayload) => {
  const supabase = createClient();

  const profile = await getAdminProfile(supabase);

  let imageUrl: string | null = null;
  let uploadedFilePath: string | null = null;

  try {
    if (payload.image) {
      const uploadedImage = await uploadSkillImage(supabase, payload.image);

      imageUrl = uploadedImage.publicUrl;
      uploadedFilePath = uploadedImage.filePath;
    }

    const { data, error } = await supabase
      .from("skills")
      .insert({
        name: payload.name.trim(),
        category: payload.category.trim(),
        description: payload.description?.trim() || null,
        image_url: imageUrl,
        is_active: true,
        created_by: profile.id,
      })
      .select(ADMIN_SKILL_SELECT)
      .single();

    if (error) {
      if (uploadedFilePath) {
        await removeSkillImage(supabase, uploadedFilePath);
      }

      throw new Error(error.message);
    }

    return data as AdminMasterSkill;
  } catch (error) {
    if (uploadedFilePath) {
      await removeSkillImage(supabase, uploadedFilePath);
    }

    throw error;
  }
};

export const updateAdminSkill = async (payload: UpdateAdminSkillPayload) => {
  const supabase = createClient();

  await getAdminProfile(supabase);

  const updateData: Record<string, unknown> = {};

  if (payload.name !== undefined) {
    updateData.name = payload.name.trim();
  }

  if (payload.category !== undefined) {
    updateData.category = payload.category.trim();
  }

  if (payload.description !== undefined) {
    updateData.description = payload.description.trim() || null;
  }

  if (payload.is_active !== undefined) {
    updateData.is_active = payload.is_active;
  }

  let uploadedFilePath: string | null = null;

  try {
    if (payload.image) {
      const uploadedImage = await uploadSkillImage(supabase, payload.image);

      uploadedFilePath = uploadedImage.filePath;
      updateData.image_url = uploadedImage.publicUrl;
    }

    const { data, error } = await supabase
      .from("skills")
      .update(updateData)
      .eq("id", payload.skillId)
      .select(ADMIN_SKILL_SELECT)
      .single();

    if (error) {
      if (uploadedFilePath) {
        await removeSkillImage(supabase, uploadedFilePath);
      }

      throw new Error(error.message);
    }

    return data as AdminMasterSkill;
  } catch (error) {
    if (uploadedFilePath) {
      await removeSkillImage(supabase, uploadedFilePath);
    }

    throw error;
  }
};

export const deleteAdminSkill = async (skillId: string) => {
  const supabase = createClient();

  await getAdminProfile(supabase);

  const { data, error } = await supabase
    .from("skills")
    .update({
      is_active: false,
    })
    .eq("id", skillId)
    .select(ADMIN_SKILL_SELECT)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AdminMasterSkill;
};
