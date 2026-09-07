import { create } from "zustand";

export interface UserPagination {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPrev: () => void;
  setNext: () => void;
}

export const useUserPagination = create<UserPagination>((set) => ({
  page: 1,
  pageSize: 3,
  setPage: (page) =>
    set({
      page,
    }),

  setPrev: () =>
    set((state) => ({
      page: Math.max(1, state.page - 1),
      pageSize: state.pageSize * state.page,
    })),
  setNext: () =>
    set((state) => ({
      page: state.page + 1,
      pageSize: state.pageSize * state.page,
    })),
}));
