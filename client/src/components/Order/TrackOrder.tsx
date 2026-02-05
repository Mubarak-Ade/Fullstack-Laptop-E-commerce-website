import { PrimaryBtnVariant } from '@/motion/button';
import { Box, Check, Hourglass, LocateFixedIcon, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from '../shared/Icon';

export const TrackOrder = () => {
    const progress = [
        {
            label: 'Confirmed',
            date: 'June 20, 2024',
            icon: Check,
            isCompleted: true,
        },
        {
            label: 'Processing',
            date: 'June 21, 2024',
            icon: Hourglass,
            isCompleted: true,
        },
        {
            label: 'Shipped',
            date: 'June 23, 2024',
            icon: Truck,
            isCompleted: true,
        },
        {
            label: 'Delivered',
            date: 'June 25, 2024',
            icon: Box,
            isCompleted: true,
        },
    ];
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
                                className={`size-12 ${step.isCompleted ? 'bg-primary' : 'bg-light-fg dark:bg-dark-fg'} flex items-center justify-center rounded-full`}
                            >
                                <Icon
                                    icon={step.icon}
                                    size={24}
                                    className={step.isCompleted ? 'text-white' : 'text-gray-400'}
                                />
                            </span>
                            <div className="flex items-center mt-2 flex-col">
                                <h6
                                    className={`text-sm font-bold ${step.isCompleted ? 'text-primary' : 'text-gray-400'}`}
                                >
                                    {step.label}
                                </h6>
                                {step.isCompleted ? (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {step.date}
                                    </p>
                                ) : (
                                    <p className="text-xs text-gray-400 italic">Pending</p>
                                )}
                            </div>
                        </div>
                        <div
                            className={` h-1 ${index < progress.length - 1 ? 'bg-gray-200 w-full' : ''} ${step.isCompleted ? 'bg-primary' : ''} absolute top-6 left-20 z-0`}
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
