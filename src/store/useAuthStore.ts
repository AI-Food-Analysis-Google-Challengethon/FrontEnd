// stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
    name: string | null;
    email: string | null;
    age: number | null;
    height: number | null;
    weight: number | null;
    setInfo: (age: number, height: number, weight: number) => void;
    setAuth: (name:string, email:string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
      (set) => ({
        name: null,
        email: null,
        age: null,
        height: null,
        weight: null,
        setInfo: (age, height, weight) => set({ age, height, weight }),
        setAuth: (name, email ) => set({ name, email  }),
        clearAuth: () => set({ name: null, email:null})
      }),
      {
        name: 'auth-store',
      }
    )
  );