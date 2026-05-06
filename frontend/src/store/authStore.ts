import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Role = 'admin' | 'clinician' | 'analyst' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  organizationId: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'bisharod-auth' }
  )
)
