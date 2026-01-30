import type { FieldError as FE } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';

interface Props {
    label: string;
    type?: string,
    placeholder: string,
    errors?: FE;
}
export const InputField = ( { label, type="text", placeholder, errors, ...props }: Props ) => {
    return (
        <Field>
            <FieldLabel className='dark:text-white'>{ label }</FieldLabel>
            <Input
                type='text'
                {...props}
                placeholder={placeholder}
                className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
            />
            { errors &&
                ( <FieldError>
                    { errors.message }
                </FieldError> ) }
        </Field>
    );
};
