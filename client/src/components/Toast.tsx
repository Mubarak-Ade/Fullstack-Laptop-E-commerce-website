import { AlertCircle, AlertTriangle, Check, Info, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from './shared/Icon';
import { memo } from 'react';

const toastStyles = {
    success: { icon: <Icon icon={Check} />, border: 'border-green-500', badge: 'bg-green-500' },
    error: { icon: <Icon icon={AlertCircle} />, border: 'border-red-500', badge: 'bg-red-500' },
    info: { icon: <Icon icon={Info} />, border: 'border-blue-500', badge: 'bg-blue-500' },
    warning: { icon: <AlertTriangle />, border: 'border-yellow-500', badge: 'bg-yellow-500' },
} as const;

interface ToastProps {
    type: string;
    message: string;
    onClose: () => void;
}

const Toast = ({ type, message, onClose }: ToastProps) => {
    const getIcon = () => {
        return toastStyles[type as keyof typeof toastStyles]?.icon;
    };

    const getBgColor = () => {
        return toastStyles[type as keyof typeof toastStyles]?.border;
    };

    const getTextColor = () => {
        return toastStyles[type as keyof typeof toastStyles]?.badge;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className={`flex items-center max-w-xl w-full bg-white gap-5 px-5 py-6 ${getTextColor} rounded-lg border-l-8 ${getBgColor()} backdrop-blur-sm`}
        >
            <span
                className={`${getTextColor()} rounded-full size-6 flex items-center font-bold justify-center text-white`}
            >
                {getIcon()}
            </span>
            <div className="space-y-0.5 flex-1">
                <h4 className="capitalize font-extrabold text-sm md:text-lg">{type}</h4>
                <p className="md:text-sm text-xs text-secondary flex-1">{message}</p>
            </div>
            <button onClick={onClose} className={`text-secondary transition`}>
                <Icon icon={X} />
            </button>
        </motion.div>
    );
};

export default memo(Toast)
