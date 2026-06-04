import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "admin" | "clinician" | "analyst" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  organizationId?: string;
  sub?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token = "static-token") =>
        set({ user: { ...user, sub: user.id }, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    { name: "bisharod-auth" },
  ),
);
