"use client";

import { useQuery } from "@tanstack/react-query";
import { getSkillDetails } from "@/lib/skillDetails";

export const useSkillDetails = (skillName: string) => {
  return useQuery({
    queryKey: ["skill-details", skillName],
    queryFn: () => getSkillDetails(skillName),
    enabled: Boolean(skillName),
    staleTime: 30 * 1000,
  });
};