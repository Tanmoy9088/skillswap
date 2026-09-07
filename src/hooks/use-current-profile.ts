"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentProfile } from "@/lib/profile";

export const useCurrentProfile = () => {
  return useQuery({
    queryKey: ["current-profile"],
    queryFn: getCurrentProfile,
  });
};
