"use client";

import { useQuery } from "@tanstack/react-query";

import { getMentorProfile } from "@/lib/mentorProfile";

export const useMentorProfile = (authUserId: string) => {
  return useQuery({
    queryKey: ["mentor-profile", authUserId],

    queryFn: () => getMentorProfile(authUserId),

    enabled: Boolean(authUserId),

    staleTime: 30 * 1000,
  });
};
