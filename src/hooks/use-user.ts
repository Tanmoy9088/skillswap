import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/user";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};