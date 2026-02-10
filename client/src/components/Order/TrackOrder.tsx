import { PrimaryBtnVariant } from '@/motion/button';
import { format } from 'date-fns';
import {
    Box,
    Check,
    HandCoins,
    Hourglass,
    LocateFixedIcon,
    Truck
} from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from '../shared/Icon';

interface Props {
    status: 'PENDING_PAYMENT' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
    date: string;
}

export const TrackOrder = ({ status, date }: Props) => {
    const progress = [
        {
            label: 'Payment',
            icon: HandCoins,
            status: 'PENDING_PAYMENT',
        },
        {
            label: 'Paid',
            icon: Check,
            status: 'PAID',
        },
        {
            label: 'Processing',
            icon: Hourglass,
            status: 'PROCESSING',
        },
        {
            label: 'Shipped',
            status: 'SHIPPED',
            icon: Truck,
        },
        {
            label: 'Delivered',
            icon: Box,
            status: 'DELIVERED',
        },
    ];

    const getCurrentStatus = progress.findIndex(prog => prog.status === status)
        
    
    


    return (
        <div className="bg-light-bg p-5 max-w-2xl w-full dark:bg-dark-surface rounded-xl shadow-lg shadow-light-fg dark:shadow-dark-bg">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-black dark:text-white">Track Your Package</h2>
                <h4 className="px-4 py-1 bg-primary/10 rounded-full text-primary">
                    Expected By Friday, June 25th
                </h4>
            </div>
            <div className="flex w-full items-center mt-10">
                {progress.map((step, index) => (
                    <div className="flex w-full items-center relative">
                        <div key={index} className="flex-1 flex flex-col items-center z-40">
                            <span
                                className={`size-12 ${index <= getCurrentStatus  ? 'bg-primary' : 'bg-light-fg dark:bg-dark-fg'} flex items-center justify-center rounded-full`}
                            >
                                <Icon
                                    icon={step.icon}
                                    size={24}
                                    className={
                                        index <= getCurrentStatus ? 'text-white' : 'text-gray-400'
                                    }
                                />
                            </span>
                            <div className="flex items-center mt-2 flex-col">
                                <h6
                                    className={`text-sm font-bold ${index <= getCurrentStatus ? 'text-primary' : 'text-gray-400'}`}
                                >
                                    {step.label}
                                </h6>
                                {index <= getCurrentStatus ? (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {format(date, 'PP')}
                                    </p>
                                ) : (
                                    <p className="text-xs text-gray-400 italic">Pending</p>
                                )}
                            </div>
                        </div>
                        <div
                            className={` h-1 ${index < progress.length - 1 ? 'bg-gray-200 w-full' : ''} ${index <= getCurrentStatus ? 'bg-primary' : ''} absolute top-6 inset-1/2 z-0`}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-10 flex items-center gap-4">
                <motion.button
                    whileHover="hover"
                    whileTap="tap"
                    variants={PrimaryBtnVariant}
                    className="px-6 py-3 w-full bg-primary text-white rounded-md flex items-center justify-center gap-3 font-semibold cursor-pointer"
                >
                    <Icon icon={LocateFixedIcon} size={30} /> Track My Package
                </motion.button>
                <motion.button
                    whileHover="hover"
                    whileTap="tap"
                    variants={PrimaryBtnVariant}
                    className="px-6 py-3 w-full text-black dark:text-white border border-secondary rounded-md gap-3 font-semibold cursor-pointer"
                >
                    Track My Package
                </motion.button>
            </div>
        </div>
    );
};
