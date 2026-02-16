import { AlertCircle, AlertTriangle, Check, Info, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from './shared/Icon';
import { memo } from 'react';

interface ToastProps {
    type: string;
    message: string;
    onClose: () => void;
}

const Toast = ({ type, message, onClose }: ToastProps) => {
    const getIcon = () => {
        switch (type) {
            case 'success':
                return <Icon icon={Check} />;
            case 'error':
                return <Icon icon={AlertCircle} />;
            case 'info':
                return <Icon icon={Info} />;
            case 'warning':
                return <AlertTriangle />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'success':
                return 'border-green-500';
            case 'error':
                return 'border-red-500';
            case 'info':
                return 'border-blue-500';
            case 'warning':
                return 'border-yellow-500';
        }
    };

    const getTextColor = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500';
            case 'error':
                return 'bg-red-500';
            case 'info':
                return 'bg-blue-500';
            case 'warning':
                return 'bg-yellow-500';
        }
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
                <h4 className="capitalize font-extrabold text-lg">{type}</h4>
                <p className="text-sm text-secondary flex-1">{message}</p>
            </div>
            <button onClick={onClose} className={`text-secondary transition`}>
                <Icon icon={X} />
            </button>
        </motion.div>
    );
};

export default memo(Toast)
