"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createAvailability,
  deleteAvailability,
  getMyAvailability,
  updateAvailability,
  updateAvailabilityStatus,
} from "@/lib/mentorAvailability";

const availabilityQueryKey = ["mentor-availability"];

export const useMentorAvailability = () => {
  const queryClient = useQueryClient();

  const availabilityQuery = useQuery({
    queryKey: availabilityQueryKey,
    queryFn: getMyAvailability,
    staleTime: 30_000,
  });

  const createMutation = useMutation({
    mutationFn: createAvailability,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: availabilityQueryKey,
      });
    },
  });

  const statusMutation = useMutation({
    mutationFn: updateAvailabilityStatus,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: availabilityQueryKey,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateAvailability,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: availabilityQueryKey,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAvailability,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: availabilityQueryKey,
      });
    },
  });

  return {
    ...availabilityQuery,

    createAvailability: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    updateAvailabilityStatus: statusMutation.mutateAsync,
    isUpdating: statusMutation.isPending,
    updateAvailability: updateMutation.mutateAsync,
    isEditing: updateMutation.isPending,

    deleteAvailability: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
