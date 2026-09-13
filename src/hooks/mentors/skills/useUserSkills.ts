import { useQuery } from "@tanstack/react-query";

import { getUserSkills } from "@/lib/profile";

export const useUserSkills = () => {
  return useQuery({
    queryKey: ["user-skills"],
    queryFn: getUserSkills,
    staleTime: 30 * 1000,
  });
};
