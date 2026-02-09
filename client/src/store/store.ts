import { create } from 'zustand';
interface StoreState {

   
    visible: boolean;
    showModal: () => void;
    closeModal: () => void;
}

export const useStore = create<StoreState>((set, get) => ({
    visible: false,
    showModal: () => set({ visible: true }),
    closeModal: () => set({ visible: false }),
}));
