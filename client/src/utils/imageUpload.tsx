import { Input } from '@/components/ui/input';
import React from 'react';
import { Controller, type Control } from 'react-hook-form';

interface Props {
    control: Control<any>,
    name: string
}
export const ImageUpload = ( { control, name } : Props ) => {
    return (
        <Controller
            control={ control }
            name={name}
        render={({field}) => (
                <Input type='file' multiple accept='image/*' onChange={(e) => field.onChange(Array.from(e.target.files!))} />
            )}
        />
    );
};
