import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeSkill } from "@/lib/profile";

export const useRemoveSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeSkill,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-skills"],
      });
    },
  });
};
