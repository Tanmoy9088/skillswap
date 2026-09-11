"use client";

import { useQuery } from "@tanstack/react-query";

import { getMentorAvailability } from "@/lib/mentorAvailability";

export const useMentorAvailabilityForBooking = (
  mentorAuthUserId?: string,
) => {
  return useQuery({
    queryKey: [
      "mentor-availability",
      "booking",
      mentorAuthUserId,
    ],
    queryFn: () => getMentorAvailability(mentorAuthUserId!),
    enabled: Boolean(mentorAuthUserId),
    staleTime: 30_000,
  });
};