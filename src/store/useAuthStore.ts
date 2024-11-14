// stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
    name: string | null;
    email: string | null;
    setAuth: (name:string, email:string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
      (set) => ({
        name: null,
        email: null,
        setAuth: (name, email ) => set({ name, email  }),
        clearAuth: () => set({ name: null, email:null})
      }),
      {
        name: 'auth-store',
      }
    )
  );