import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PhotoStore {
    photoData: string | null;
    setPhotoData: (data: string) => void;
}



export const usePhotoStore = create<PhotoStore>()(persist(
    (set)=>({
    photoData: null,
    setPhotoData: (data)=> set({photoData: data})
    }), 

    {
        name: 'photo-store',
    }
));