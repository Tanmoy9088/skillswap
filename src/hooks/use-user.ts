import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/user";

export const useUsers = (page: number, pageSize: number = 3) => {
  return useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => getUsers(page, pageSize),
    placeholderData: (previousData) => previousData,
    staleTime: 30 * 1000,
  });
};
