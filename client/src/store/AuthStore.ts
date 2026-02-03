import type { User } from '@/schema/user.schema';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserType = { type: 'user'; user: User } | { type: 'guest'; guestId: string };

const generateGuestId = () => `guest_${crypto.randomUUID()}`;

interface AuthState {
    identity: UserType;
    setUser: (user: User) => void;
    setGuestId: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            identity: {
                type: 'guest',
                guestId: generateGuestId(),
            },
            setUser: user => set({ identity: { type: 'user', user } }),
            setGuestId: () => {
                if (get().guestId) return;
                const id = crypto.randomUUID();
                set({ guestId: id });
            },
            logout: () => {
                set({ identity: { type: 'guest', guestId: generateGuestId() } });
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);
