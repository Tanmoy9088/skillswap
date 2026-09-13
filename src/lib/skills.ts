import { createClient } from "@/lib/supabase/client";

import type {
  SkillDiscoveryItem,
  SkillDiscoveryResponse,
} from "@/types/types/skills";

interface GetSkillDiscoveryParams {
  search: string;
  category: string;
  skillLevel: string;
  rating: number;
  sortBy: string;
  page: number;
  pageSize: number;
}

interface RawSkillDiscoveryResponse {
  items?: SkillDiscoveryItem[];
  total?: number | string;
}

export const getSkillDiscovery = async ({
  search,
  category,
  skillLevel,
  rating,
  sortBy,
  page,
  pageSize,
}: GetSkillDiscoveryParams): Promise<SkillDiscoveryResponse> => {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_skill_discovery", {
    p_search: search,
    p_category: category,
    p_level: skillLevel,
    p_min_rating: rating,
    p_sort: sortBy,
    p_page: page,
    p_page_size: pageSize,
  });

  if (error) {
    console.error("get_skill_discovery RPC error:", error);
    throw new Error(error.message);
  }

  const response = (data ?? {}) as RawSkillDiscoveryResponse;

  return {
    items: Array.isArray(response.items) ? response.items : [],
    total: Number(response.total ?? 0),
  };
};
