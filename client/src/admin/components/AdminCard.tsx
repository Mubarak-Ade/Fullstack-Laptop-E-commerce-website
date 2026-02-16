import { Icon } from '@/components/shared/Icon';
import { priceFormat } from '@/utils/format';
import { Banknote, type LucideIcon } from 'lucide-react';
import React from 'react'

interface Props {
    icon: {
        type: LucideIcon,
        color: string
    },
    title: string,
    value?: number | string
}

export const AdminCard = ({icon, title, value} : Props) => {
  return (
    <div  className='border border-light-border block rounded-xl dark:border-dark-border bg-light-bg dark:bg-dark-surface p-5'>
        <div className={`size-15 rounded-full flex items-center justify-center ${icon.color}`}>
            <Icon icon={icon.type} size={30} />
        </div>

        <h4 className='mt-5 font-bold font-technical text-secondary'>{title}</h4>
        <h2 className='text-2xl mt-2 text-white font-bold'>{value}</h2>
    </div>
  )
}
