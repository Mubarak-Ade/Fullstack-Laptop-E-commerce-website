import { useStore } from '@/store/store';
import { PersonStanding, XCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router';
import { Icon } from '../shared/Icon';
export const LoginModal = () => {
    const closeModal = useStore(s => s.closeModal);

    const navigate = useNavigate();

    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
            }}
            transition={{
                duration: 0.5,
            }}
            className="w-full h-screen fixed z-50 top-0 left-0 bg-slate-800/20 backdrop-blur-sm flex items-center justify-center"
        >
            <motion.div
                initial={{
                    scale: 0,
                }}
                animate={{
                    scale: 1,
                }}
                exit={{
                    scale: 0,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    duration: 0.2,
                }}
                className="bg-light-fg relative dark:bg-dark-fg max-w-xl w-full rounded-xl shadow-[0_0_25px] shadow-light-fg/20 dark:shadow-dark-surface p-10 flex flex-col items-center"
            >
                <button onClick={closeModal} className="absolute top-0 right-0 text-primary m-2">
                    <Icon icon={XCircle} size={25} />
                </button>
                <h1 className="text-xl text-black dark:text-white font-bold my-5">
                    <span className="text-primary">Login or Register</span> an Account To Start
                    Ordering
                </h1>
                <div className="dark:text-white text-black mb-5">
                    <Icon icon={PersonStanding} size={100} />
                </div>
                <motion.button
                    onClick={() => navigate('/login')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-primary w-full py-3 rounded-xl text-white font-bold mb-5 cursor-pointer"
                >
                    Login
                </motion.button>
                <motion.button
                    onClick={() => navigate('/signup')}
                    whileHover={{ scale: 1.05, backgroundColor: '#0b66fe20' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-full border border-primary text-primary py-3 font-bold rounded-xl cursor-pointer"
                >
                    Register
                </motion.button>
            </motion.div>
        </motion.div>
    );
};
