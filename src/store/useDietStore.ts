import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DietStore {
    type: string | null;
    photoData: string | null;
    morningCalorie: number;
    lunchCalorie: number;
    dinnerCalorie: number;
    setType: (type: string) => void;
    setPhotoData: (data: string) => void;
    setMorningCalorie: (calorie: number) => void;
    setLunchCalorie: (calorie: number) => void;
    setDinnerCalorie: (calorie: number) => void;
}



export const useDietStore = create<DietStore>()(persist(
    (set)=>({
    type: null,
    photoData: null,
    morningCalorie: 0,
    lunchCalorie: 0,
    dinnerCalorie: 0,
    setType: (type)=> set({type}),
    setMorningCalorie: (calorie)=> set({morningCalorie: calorie}),
    setLunchCalorie: (calorie)=> set({lunchCalorie: calorie}),
    setDinnerCalorie: (calorie)=> set({dinnerCalorie: calorie}),
    setPhotoData: (data)=> set({photoData: data})
    }), 
    {
        name: 'photo-store',
    }
));