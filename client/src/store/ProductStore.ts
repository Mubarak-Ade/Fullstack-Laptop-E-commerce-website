import type { Cart } from '@/features/cart/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
    cart: Cart[];
    guestId: null | string;
    setGuestId: () => void;
    clearGuestId: () => void;
}

export const useProductStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            guestId: null,
            setGuestId: () => {
                if (get().guestId) return;
                const id = crypto.randomUUID();
                set({ guestId: id });
            },
            clearGuestId: () => {
                set({ guestId: null });
            },
        }),
        {
            name: 'guest',
        }
    )
);
