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

  console.log("RPC data:", data);
  console.log("RPC error:", error);
  console.log("RPC data type:", typeof data);
  console.log("RPC is array:", Array.isArray(data));

  if (data && typeof data === "object") {
    console.log("RPC keys:", Object.keys(data));
    // console.log("RPC items:", (data as any).items);
    // console.log("RPC total:", (data as any).total);
  }

  if (error) {
    console.error("get_skill_discovery RPC error:", error);

    throw new Error(error.message);
  }

  console.log("get_skill_discovery response:", data);
  console.log("response type:", typeof data);
  console.log("response is array:", Array.isArray(data));

  const response = (data ?? {}) as RawSkillDiscoveryResponse;

  return {
    items: Array.isArray(response.items) ? response.items : [],

    total: Number(response.total ?? 0),
  };
};
