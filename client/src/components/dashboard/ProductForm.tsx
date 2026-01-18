import { useCreateProduct } from '@/features/product/hooks';
import { ProductSchema, type Product } from '@/schema/product.schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye } from 'lucide-react';
import { Controller, useForm } from "react-hook-form";
import { Icon } from '../shared/Icon';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ImageUpload } from '@/utils/imageUpload';



const ErrorField = ( error: any ) => {
    return error && (
        <FieldError>{ error.message }</FieldError>
    );
};


export const ProductForm = () => {
    const category = [ "Hp", "Dell", "Acer", "Apple" ];
    const { register, handleSubmit, control, formState: { errors } } = useForm<Product>( {
        resolver: zodResolver( ProductSchema ), defaultValues: {
            name: "",
            brand: "",
            price: 0,
            discountPrice: 0,
            stocks: 0,
            specs: {
                ram: "",
                storage: "",
                cpu: "",
                gpu: "",
                screenSize: "",
                battery: "",
            },
            image: [],
        }
    } );
    const createProduct = useCreateProduct();
    const onSubmit = ( data: Product ) => {
        const formData = new FormData();

        formData.append( "name", data.name );
        formData.append( "brand", data.brand );
        formData.append( "price", data.price.toString() );
        formData.append( "discountPrice", data.discountPrice?.toString() ?? ")" );
        formData.append( "stocks", data.stocks.toString() );

        formData.append( "specs", data.specs );

        data.image.forEach( ( file: File ) => formData.append( "image", file ) );

        createProduct.mutate( formData );
        console.log( formData );
    };

    console.log( errors );

    return (
        <div className="p-5 w-full">
            <form onSubmit={ handleSubmit( onSubmit ) } className='flex gap-10'>
                <div className="space-y-5 max-w-xl w-full">
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel className='dark:text-white'>Product Name</FieldLabel>
                                    <Input { ...register( "name" ) } className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg' />
                                    <ErrorField error={ errors.name } />
                                </Field>
                                <div className="flex justify-between gap-4">
                                    {/* <Field>
                                        <FieldLabel className='dark:text-white'>SKU</FieldLabel>
                                        <Input {...register("sku")} className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg' />
                                    </Field> */}
                                    <Field>
                                        <FieldLabel className='dark:text-white'>Brand</FieldLabel>
                                        <Controller name='brand' control={ control } render={ ( { field } ) => (
                                            <Select onValueChange={ field.onChange }>
                                                <SelectTrigger className='border-none outline-none focus-visible:ring-primary focus-visible:ring-1 py-5 rounded-sm dark:text-white bg-light-fg dark:bg-dark-fg '>
                                                    <SelectValue placeholder={ "Select category" } />
                                                </SelectTrigger>
                                                <SelectContent className="bg-light-fg border-none dark:bg-dark-fg">
                                                    { category?.map( ( cat ) => (
                                                        <SelectItem className='px-4 py-2 m-0.5 rounded-md hover:bg-primary text-secondary cursor-pointer' value={ cat }>
                                                            { cat }
                                                        </SelectItem>
                                                    ) ) }
                                                </SelectContent>
                                            </Select> ) } />
                                    </Field>
                                </div>
                            </FieldGroup>
                        </CardContent>
                    </Card>

                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-;g'>Pricing & Inventory</CardTitle>
                        </CardHeader>
                        <CardContent className='flex gap-5'>
                            <Field>
                                <FieldLabel className='dark:text-white'>Base Price (₦)</FieldLabel>
                                <Input { ...register( "price", { valueAsNumber: true } ) } type='number' placeholder='0.00' className='rounded-sm py-5 bg-light-fg text-secondary dark:bg-dark-fg  border-none' />
                            </Field>
                            <Field>
                                <FieldLabel className='dark:text-white'>Discount Price (₦)</FieldLabel>
                                <Input { ...register( "discountPrice", { valueAsNumber: true } ) } type='number' placeholder='0.00' className='rounded-sm py-5 bg-light-fg text-secondary dark:bg-dark-fg  border-none' />
                            </Field>
                            <Field>
                                <FieldLabel className='dark:text-white'>Stock Quantity</FieldLabel>
                                <Input { ...register( "stocks", { valueAsNumber: true } ) } type='number' placeholder='0' className='rounded-sm py-5 bg-light-fg text-secondary dark:bg-dark-fg  border-none' />
                            </Field>
                        </CardContent>
                    </Card>

                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Technical Specification</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup>
                                <div className="flex justify-between gap-4">
                                    <Field>
                                        <FieldLabel className='dark:text-white'>Processor</FieldLabel>
                                        <Input { ...register( "specs.cpu" ) } className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg' />
                                    </Field>
                                    <Field>
                                        <FieldLabel className='dark:text-white'>RAM</FieldLabel>
                                        <Controller name='specs.ram' control={ control } render={ ( { field } ) => (
                                            <Select onValueChange={ field.onChange }>
                                                <SelectTrigger className='border-none outline-none focus-visible:ring-primary focus-visible:ring-1 py-5 rounded-sm dark:text-white bg-light-fg dark:bg-dark-fg '>
                                                    <SelectValue placeholder={ "Select category" } />
                                                </SelectTrigger>
                                                <SelectContent className="bg-light-fg border-none dark:bg-dark-fg">
                                                    { category?.map( ( cat ) => (
                                                        <SelectItem className='px-4 py-2 m-0.5 rounded-md hover:bg-primary text-secondary cursor-pointer' value={ cat }>
                                                            { cat }
                                                        </SelectItem>
                                                    ) ) }
                                                </SelectContent>
                                            </Select> ) } />
                                    </Field>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <Field>
                                        <FieldLabel className='dark:text-white'>Screen Size</FieldLabel>
                                        <Input { ...register( "specs.screenSize" ) } className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg' />
                                    </Field>
                                    <Field>
                                        <FieldLabel className='dark:text-white'>Storage</FieldLabel>
                                        <Controller name='specs.storage' control={ control } render={ ( { field } ) => (
                                            <Select onValueChange={ field.onChange }>
                                                <SelectTrigger className='border-none outline-none focus-visible:ring-primary focus-visible:ring-1 py-5 rounded-sm dark:text-white bg-light-fg dark:bg-dark-fg '>
                                                    <SelectValue placeholder={ "Select category" } />
                                                </SelectTrigger>
                                                <SelectContent className="bg-light-fg border-none dark:bg-dark-fg">
                                                    { category?.map( ( cat ) => (
                                                        <SelectItem className='px-4 py-2 m-0.5 rounded-md hover:bg-primary text-secondary cursor-pointer' value={ cat }>
                                                            { cat }
                                                        </SelectItem>
                                                    ) ) }
                                                </SelectContent>
                                            </Select> ) } />
                                    </Field>
                                </div>
                            </FieldGroup>
                        </CardContent>
                    </Card>
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-;g'>Product Media</CardTitle>
                        </CardHeader>
                        <CardContent className='flex gap-5'>
                            <ImageUpload control={ control } name='image' />
                        </CardContent>
                    </Card>
                </div>
                <div className="w-full max-w-sm">
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Publish</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Field>
                                <FieldLabel className='dark:text-white text-lg'>Status</FieldLabel>
                                <RadioGroup>
                                    <div className="flex items-center gap-2 dark:text-white">
                                        <RadioGroupItem id='active' value='active' />
                                        <Label id='active'>Active</Label>
                                    </div>
                                    <div className="flex items-center gap-2 dark:text-white">
                                        <RadioGroupItem id='draft' value='draft' />
                                        <Label id='draft'>Draft</Label>
                                    </div>
                                </RadioGroup>
                            </Field>
                        </CardContent>
                        <CardFooter className='flex-col gap-2'>
                            <button className='flex gap-2 text-lg font-bold items-center justify-center text-primary border border-primary p-3 rounded-md w-full'>
                                <Icon icon={ Eye } />
                                Preview
                            </button>
                            <button className='flex gap-2 text-lg font-bold items-center justify-center text-white bg-primary p-3 rounded-md w-full'>
                                Publish Product
                            </button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </div>
    );
};
