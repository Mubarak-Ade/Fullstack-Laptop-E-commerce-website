import { cn } from '@/lib/utils';
import { Check, Minus } from 'lucide-react';
import { type ChangeEvent, useEffect, useId, useRef } from 'react';

interface CheckboxProps {
    checked: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    className?: string;
    ariaLabel?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ checked, indeterminate = false, disabled = false, className, ariaLabel, onChange }: CheckboxProps) => {
    const id = useId();
    const checkboxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!checkboxRef.current) return;
        checkboxRef.current.indeterminate = !checked && indeterminate;
    }, [checked, indeterminate]);

    return (
        <div className={cn('relative inline-flex h-5 w-5 items-center justify-center', className)}>
            <input
                ref={checkboxRef}
                type="checkbox"
                id={id}
                checked={checked}
                disabled={disabled}
                aria-label={ariaLabel}
                className="peer sr-only"
                onChange={onChange}
            />
            <label
                htmlFor={id}
                className={cn(
                    'flex h-5 w-5 cursor-pointer items-center justify-center rounded-md border-2 border-slate-300 bg-transparent text-transparent shadow-sm transition-all duration-200',
                    'peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-2',
                    'peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white',
                    'peer-disabled:cursor-not-allowed peer-disabled:opacity-50'
                )}
            >
                {indeterminate && !checked ? <Minus size={13} strokeWidth={3} /> : <Check size={13} strokeWidth={3} />}
            </label>
        </div>
    );
};
