import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSkill } from "@/lib/profile";

export const useAddSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSkill,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-skills"],
      });
    },
  });
};
