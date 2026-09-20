import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AuthSession } from '../types/auth';

type AuthState = {
  accessToken: string | null;
  email: string | null;
  setAuth: (session: AuthSession) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      email: null,
      setAuth: ({ accessToken, email }) => set({ accessToken, email }),
      clearAuth: () => set({ accessToken: null, email: null }),
    }),
    {
      name: 'react-memo-auth',
      partialize: ({ accessToken, email }) => ({ accessToken, email }),
    },
  ),
);
