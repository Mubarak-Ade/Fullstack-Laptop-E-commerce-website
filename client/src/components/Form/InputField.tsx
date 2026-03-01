import { Eye, EyeOff, type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import type { FieldError as FE } from 'react-hook-form';
import { Icon } from '../shared/Icon';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { useState, type ComponentPropsWithoutRef } from 'react';

const iconWrapperAnimation = {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1 },
} as const;

interface Props extends ComponentPropsWithoutRef<'input'> {
    label: string;
    type?: string;
    placeholder: string;
    errors?: FE;
    icon?: LucideIcon;
}

export const InputField = ({
    label,
    type = 'text',
    placeholder,
    icon,
    errors,
    ...props
}: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;

    const hasIcon = Boolean(icon);

    const fieldControl = hasIcon ? (
        <motion.div
            initial={iconWrapperAnimation.initial}
            animate={iconWrapperAnimation.animate}
            transition={iconWrapperAnimation.transition}
            className="flex flex-row rounded-sm dark:border-dark-border border-light-border group-focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none bg-light-fg dark:bg-dark-fg overflow-hidden items-center justify-center"
        >
            <div className="dark:bg-dark-surface h-full p-3">
                <Icon icon={icon!} />
            </div>
            <Input
                // whileFocus={{ border: '1px solid var(--color-primary)' }}
                type={inputType}
                {...props}
                placeholder={placeholder}
                className=" rounded-l-none border-none outline-none h-full w-full py-3 focus-visible:ring-0"
            />
            {isPasswordField && (
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="p-2"
                >
                    <Icon icon={showPassword ? EyeOff : Eye} />
                </button>
            )}
        </motion.div>
    ) : (
        <div className="relative">
            <Input
                type={inputType}
                {...props}
                placeholder={placeholder}
                className="rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg"
            />
            {isPasswordField && (
                <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                >
                    <Icon icon={showPassword ? EyeOff : Eye} />
                </button>
            )}
        </div>
    );

    return (
        <Field className="mt-2">
            <FieldLabel className="dark:text-white">{label}</FieldLabel>
            {fieldControl}
            {errors && <FieldError>{errors.message}</FieldError>}
        </Field>
    );
};
