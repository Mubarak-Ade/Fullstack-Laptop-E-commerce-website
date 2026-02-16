import { useStore } from '@/store/store';
import { AnimatePresence, motion } from 'motion/react';
import { Outlet } from 'react-router';
import { Navbar } from '../shared/Navbar';
import { Footer } from './Footer';
import { LoginModal } from './LoginModal';
import { Moon, Star } from 'lucide-react';
import { Icon } from '../shared/Icon';
import { useThemeStore } from '@/store/ThemeStore';

const ToggleIcon = motion.create(Icon);

export const MainLayout = () => {
    const visible = useStore(s => s.visible);
    const { theme, toggleTheme } = useThemeStore();
    return (
        <>
            <Navbar />
            <main className="relative">
                {/* <CartSkeleton /> */}
                <AnimatePresence>{visible && <LoginModal />}</AnimatePresence>
                <div className="fixed bottom-30 z-50 right-10">
                    <button onClick={toggleTheme} className="p-5 cursor-pointer rounded-full bg-primary text-white">
                        {theme === 'light' ? (
                            <ToggleIcon size={25} icon={Moon} />
                        ) : (
                            <ToggleIcon icon={Star} size={25} />
                        )}
                    </button>
                </div>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
