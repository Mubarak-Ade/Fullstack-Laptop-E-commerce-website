import type { LucideIcon } from 'lucide-react';
import React, { type ReactNode } from 'react';
import { Icon } from '../shared/Icon';

interface Props {
    title: string;
    value: number;
    icon: {
        type: LucideIcon;
        className: string
    }
    
    info: string;
}

export const DashboardCard = ({ title, value, icon, info }: Props) => {
    return (
        <div className="bg-light-bg flex justify-between max-w-xs p-5 w-full dark:bg-dark-bg rounded-xl shadow-[0_0_15px] shadow-light-fg dark:shadow-dark-bg border border-light-border dark:border-dark-border">
          <div className="">
              <h4 className="text-secondary text-xlz">{title}</h4>
              <h2 className='mt-12 text-4xl text-black dark:text-white font-bold'>{value}</h2>
              <p className='text-sm mt-2 text-secondary'>{info}</p>
          </div>
          <Icon size={40} icon={icon.type} className={icon.className} />
        </div>
    );
};
