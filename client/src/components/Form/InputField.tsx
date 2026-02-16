import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import type { FieldError as FE } from 'react-hook-form';
import { Icon } from '../shared/Icon';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import type { ComponentPropsWithoutRef } from 'react';

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
    return (
        <Field className="mt-2">
            <FieldLabel className="dark:text-white">{label}</FieldLabel>
            {icon ? (
                <motion.div
                initial={{
                    opacity: 0,
                    x: -40
                }}
                animate={{
                    opacity: 1,
                    x: 0
                }}
                transition={{
                    duration: 1
                }}
                className="flex flex-row rounded-sm dark:border-dark-border border-light-border group-focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none bg-light-fg dark:bg-dark-fg overflow-hidden items-center justify-center">
                    <div className="dark:bg-dark-surface h-full p-3">
                        <Icon icon={icon} />
                    </div>
                    <Input
                        // whileFocus={{ border: '1px solid var(--color-primary)' }}
                        type={type}
                        {...props}
                        placeholder={placeholder}
                        className=" rounded-l-none border-none outline-none h-full w-full py-3 focus-visible:ring-0"
                    />
                </motion.div>
            ) : (
                <Input
                    type={type}
                    {...props}
                    placeholder={placeholder}
                    className="rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg"
                />
            )}
            {errors && <FieldError>{errors.message}</FieldError>}
        </Field>
    );
};
