import type { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import type { FieldError as FE } from 'react-hook-form';
import { Icon } from '../shared/Icon';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Textarea } from '../ui/textarea';
import type { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<'textarea'> {
    label: string;
    type?: string;
    placeholder: string;
    errors?: FE;
    icon?: LucideIcon;
}

// const TextArea = motion.create(Textarea);

export const TextField = ({
    label,
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
                    <Textarea
                        // whileFocus={{ border: '1px solid var(--color-primary)' }}
                        {...props}
                        placeholder={placeholder}
                        className=" rounded-l-none border-none outline-none h-full w-full py-3 focus-visible:ring-0"
                    />
                </motion.div>
            ) : (
                <Textarea
                    {...props}
                    placeholder={placeholder}
                    className="rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-2 bg-light-fg dark:bg-dark-fg min-h-40"
                />
            )}
            {errors && <FieldError>{errors.message}</FieldError>}
        </Field>
    );
};
