import { create } from "zustand";

export interface AuthState {
  showPassword: boolean;
  showConfirmPassword: boolean;

  setShowPassword: () => void;
  setShowConfirmPassword: () => void;
}

export const useAuthState = create<AuthState>((set) => ({
  showPassword: false,
  showConfirmPassword: false,

  setShowPassword: () =>
    set((state) => ({ showPassword: !state.showPassword })),

  setShowConfirmPassword() {
    set((state) => ({
      showConfirmPassword: !state.showConfirmPassword,
    }));
  },
}));
