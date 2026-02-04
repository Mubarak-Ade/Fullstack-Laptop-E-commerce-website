import { useAuthStore } from '@/store/AuthStore';
import { useStore } from '@/store/store';
import { AnimatePresence } from 'motion/react';
import { Outlet } from 'react-router';
import { Navbar } from '../shared/Navbar';
import { Footer } from './Footer';
import { LoginModal } from './LoginModal';

export const MainLayout = () => {
    const visible = useStore(s => s.visible);
    return (
        <>
            <Navbar />
            <main className="relative">
               {/* <CartSkeleton /> */}
                <AnimatePresence>{ visible && <LoginModal />}</AnimatePresence>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
