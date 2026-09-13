"use client";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { getSkillDiscovery } from "@/lib/skills";

import { useSkillDiscovery as useSkillDiscoveryStore } from "@/store/skillDiscovery";

export const useSkillDiscovery = () => {
  const search = useSkillDiscoveryStore((state) => state.search);

  const category = useSkillDiscoveryStore((state) => state.category);

  const skillLevel = useSkillDiscoveryStore((state) => state.skillLevel);

  const rating = useSkillDiscoveryStore((state) => state.rating);

  const sortBy = useSkillDiscoveryStore((state) => state.sortBy);

  const pageSize = useSkillDiscoveryStore((state) => state.pageSize);

  return useInfiniteQuery({
    queryKey: [
      "skill-discovery",
      search,
      category,
      skillLevel,
      rating,
      sortBy,
      pageSize,
    ],

    queryFn: ({ pageParam }) =>
      getSkillDiscovery({
        search,
        category,
        skillLevel,
        rating,
        sortBy,
        page: pageParam,
        pageSize,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const loadedItems = allPages.reduce(
        (total, page) => total + page.items.length,
        0,
      );

      if (loadedItems >= lastPage.total) {
        return undefined;
      }

      return allPages.length + 1;
    },

    placeholderData: keepPreviousData,

    staleTime: 30 * 1000,
  });
};
