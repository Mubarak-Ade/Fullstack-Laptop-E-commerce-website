import type { LucideIcon } from 'lucide-react';
import type { FieldError as FE } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';

interface Props {
    label: string;
    type?: string;
    errors?: FE;
    icon?: LucideIcon;
}
export const CheckboxField = ({
    label,
    icon,
    errors,
    ...props
}: Props) => {
    return (
        <Field className="mt-5">
            <div className="flex gap-4">
                <input
                    type="checkbox"
                    {...props}
                    className="appearance-none size-4 ring-1 ring-secondary rounded-xs relative checked:before:content-['✓'] before:text-primary before:absolute before:-translate-x-1/2 before:-translate-y-1/2 before:top-1/2 before:left-1/2 before:text-xl cursor-pointer before:p-2"
                />
                <FieldLabel className="dark:text-white">{label}</FieldLabel>
            </div>
            {errors && <FieldError>{errors.message}</FieldError>}
        </Field>
    );
};
