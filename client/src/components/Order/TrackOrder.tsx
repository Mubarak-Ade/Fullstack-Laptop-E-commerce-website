import { PrimaryBtnVariant } from '@/motion/button';
import { format } from 'date-fns';
import { Box, Check, HandCoins, Hourglass, LocateFixedIcon, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { Icon } from '../shared/Icon';

const progressSteps = [
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
] as const;

interface Props {
    status: 'PENDING_PAYMENT' | 'PAID' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    date: string;
}

export const TrackOrder = ({ status, date }: Props) => {
    const currentStatusIndex = progressSteps.findIndex(step => step.status === status);

    return (
        <div className="bg-light-bg p-5 max-w-2xl w-full dark:bg-dark-surface rounded-xl shadow-lg shadow-light-fg dark:shadow-dark-bg">
            <div className="flex md:flex-row flex-col gap-2 justify-between items-center">
                <h2 className="text-xl font-bold text-black dark:text-white">Track Your Package</h2>
                <h4 className="px-4 py-1 md:text-base text-sm bg-primary/10 rounded-full text-primary">
                    Expected By Friday, June 25th
                </h4>
            </div>
            <div className="flex w-full max-w-xl overflow-auto items-center mt-10">
                {progressSteps.map((step, index) => {
                    const isCompleted = index <= currentStatusIndex;
                    const connectorIsActive =
                        index < progressSteps.length - 1 && isCompleted;

                    return (
                    <div className="flex w-full items-center relative">
                        <div key={index} className="flex-1 flex flex-col items-center z-40">
                            <span
                                className={`size-12 ${isCompleted ? 'bg-primary' : 'bg-light-fg dark:bg-dark-fg'} flex items-center justify-center rounded-full`}
                            >
                                <Icon
                                    icon={step.icon}
                                    size={24}
                                    className={
                                        isCompleted ? 'text-white' : 'text-gray-400'
                                    }
                                />
                            </span>
                            <div className="flex items-center mt-2 flex-col">
                                <h6
                                    className={`text-sm font-bold ${isCompleted ? 'text-primary' : 'text-gray-400'}`}
                                >
                                    {step.label}
                                </h6>
                                {isCompleted ? (
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {format(date, 'PP')}
                                    </p>
                                ) : (
                                    <p className="text-xs text-gray-400 italic">Pending</p>
                                )}
                            </div>
                        </div>
                        <div
                            className={`h-1 ${index < progressSteps.length - 1 ? 'bg-gray-200 w-full' : ''} ${connectorIsActive ? 'bg-primary' : ''} absolute top-6 inset-1/2 z-0`}
                        />
                    </div>
                )})}
            </div>
        </div>
    );
};
