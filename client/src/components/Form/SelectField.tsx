import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FieldError as FE, FieldValues, Path } from 'react-hook-form';
import { Controller, type Control } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '../ui/field';


interface Props<T extends FieldValues> {
    control: Control<T>,
    placeholder: string
    data: string[],
    errors?: FE,
    name: Path<T>,
    label: string

}

export const SelectField = <T extends FieldValues>({control, placeholder, name,  data, errors, label} : Props<T>) => {
    
    return (
        <Field className=''>
            <FieldLabel className='dark:text-white'>{label}</FieldLabel>
            <Controller
                control={ control }
                name={name}
                render={ ( { field } ) => (
                    <Select onValueChange={ field.onChange } value={field.value} defaultValue={field.value}>
                        <SelectTrigger className='border-none outline-none focus-visible:ring-primary focus-visible:ring-1 rounded-sm dark:text-white bg-light-fg dark:bg-dark-fg py-5'>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent className="bg-light-fg border-none dark:bg-dark-fg rounded-xl">
                            { data.map( ( item ) => (
                                <SelectItem key={ item } className='px-4 py-2 m-0.5 rounded-md hover:bg-primary text-secondary cursor-pointer' value={ item }>
                                    { item }
                                </SelectItem>
                            ) ) }
                        </SelectContent>
                    </Select>
                ) }
            />
            { errors && <FieldError>{ errors.message }</FieldError> }
        </Field>
    );
};
