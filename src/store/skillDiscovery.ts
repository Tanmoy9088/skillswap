import { create } from "zustand";

export type SkillLevel =
  | "All"
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert";

interface SkillDiscoveryState {
  search: string;
  category: string;
  skillLevel: SkillLevel;
  rating: number;
  sortBy: string;

  page: number;
  pageSize: number;

  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setSkillLevel: (value: SkillLevel) => void;
  setRating: (value: number) => void;
  setSortBy: (value: string) => void;
  resetFilters: () => void;
}

export const useSkillDiscovery = create<SkillDiscoveryState>((set) => ({
  search: "",
  category: "All",
  skillLevel: "All",
  rating: 0,
  sortBy: "Most Relevant",
  page: 1,
  pageSize: 9,

  setSearch: (search) =>
    set({
      search,
    }),

  setCategory: (category) =>
    set({
      category,
    }),
  setSkillLevel: (skillLevel) =>
    set({
      skillLevel,
    }),

  setRating: (value) =>
    set({
      rating: value,
    }),

  setSortBy: (value) =>
    set({
      sortBy: value,
    }),

  resetFilters: () =>
    set({
      search: "",
      category: "All",
      skillLevel: "All",
      rating: 0,
      sortBy: "Most Relevant",
    }),
}));
