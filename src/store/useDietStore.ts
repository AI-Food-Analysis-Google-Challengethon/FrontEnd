import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DietStore {
    type: string | null;
    photoData: string | null;
    breakfastKcal: number;
    lunchKcal: number;
    dinnerKcal: number;
    praise: string | null;
    date: string | null;
    advice: string | null;
    setType: (type: string) => void;
    setPhotoData: (data: string) => void;
    setBreakfastKcal: (Kcal: number) => void;
    setLunchKcal: (Kcal: number) => void;
    setDinnerKcal: (Kcal: number) => void;
}



export const useDietStore = create<DietStore>()(persist(
    (set)=>({
    type: null,
    photoData: null,
    breakfastKcal: 0,
    lunchKcal: 0,
    dinnerKcal: 0,
    praise: null,
    date: null,
    advice: null,
    setType: (type)=> set({type}),
    setBreakfastKcal: (Kcal)=> set({breakfastKcal: Kcal}),
    setLunchKcal: (Kcal)=> set({lunchKcal: Kcal}),
    setDinnerKcal: (Kcal)=> set({dinnerKcal: Kcal}),
    setPhotoData: (data)=> set({photoData: data})
    }), 
    {
        name: 'photo-store',
    }
));