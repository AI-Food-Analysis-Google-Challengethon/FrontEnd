// stores/authStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
    name: string | null;
    email: string | null;
    profileImage: string | null;
    height: number | null;
    weight: number | null;
    age: number | null;
    gender: string | null;
    schoolName: string | null;
    schoolCode: string | null;
    setInfo: (height: number, weight: number, age: number, gender: string, schoolName: string, schoolCode:string) => void;
    setAuth: (name:string, email:string, profileImage:string) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
      (set) => ({
        name: null,
        email: null,
        profileImage: null,
        height: null,
        weight: null,
        age: null,
        gender: null,
        schoolName: null,
        schoolCode: null,
        setInfo: (height, weight, age, gender, schoolName, schoolCode) => set({height, weight, age, gender, schoolName, schoolCode}),
        setAuth: (name, email , profileImage) => set({ name, email, profileImage}),
        clearAuth: () => set({ name: null, email:null, profileImage: null})
      }),
      {
        name: 'auth-store',
      }
    )
  );