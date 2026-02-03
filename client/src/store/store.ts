import { create } from 'zustand';
interface AuthState {
   
    visible: boolean;
    showModal: () => void;
    closeModal: () => void;
}

export const useStore = create<AuthState>((set, get) => ({
    visible: false,
    showModal: () => set({ visible: true }),
    closeModal: () => set({ visible: false }),
}));
