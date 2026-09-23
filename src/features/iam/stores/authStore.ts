import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BasicUser {
  identityId: string;
  email: string;
  username: string;
  displayName: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: BasicUser | null;
  login: (accessToken: string, refreshToken: string, user: BasicUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      login: (accessToken, refreshToken, user) =>
        set({ accessToken, refreshToken, user }),

      logout: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
      name: "auth-storage", // key in localStorage
    },
  ),
);
