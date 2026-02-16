import { create } from 'zustand';
interface StoreState {

   
    visible: boolean;
    showModal: () => void;
    closeModal: () => void;
}

export const useStore = create<StoreState>((set) => ({
    visible: false,
    showModal: () => set({ visible: true }),
    closeModal: () => set({ visible: false }),
}));
