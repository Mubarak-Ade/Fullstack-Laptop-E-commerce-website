import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface AuthState {
    guestId: string;

}

export const useAuthStore = create<AuthState>()(
    persist(
        () => ({
            guestId: "guest_" + Date.now() + Math.floor(Math.random() * 1000)
        }),
        {
            name: "user",
            partialize: (state): AuthState => ({
                guestId: state.guestId
            })
        }
    )
);