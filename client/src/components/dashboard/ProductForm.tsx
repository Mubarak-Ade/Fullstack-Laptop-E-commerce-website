import { useCreateProduct, useProduct, useUpdateProduct } from '@/features/product/hooks';
import { ProductSchema, type Product, type ProductFormInput } from '@/schema/product.schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, UploadCloud } from 'lucide-react';
import { useForm, useWatch, Controller } from "react-hook-form";
import { Icon } from '../shared/Icon';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { formatImage } from '@/utils/imageFormat';
export const ProductForm = () => {

    const location = useLocation();

    const { data: product, isFetching } = useQuery( useProduct( location.state as string ) );
    const navigate = useNavigate()
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct( product?._id as string );

    const { register, handleSubmit, control, setValue, reset, watch, formState: { errors } } = useForm<ProductFormInput>( {
        resolver: zodResolver( ProductSchema ),

    } );


    useEffect( () => {
        if ( product ) {
            reset( {
                name: product.name,
                brand: product.brand,
                price: String(product.price),
                discountPrice: String(product.discountPrice),
                stocks: String(product.stocks),
                cpu: product.cpu,
                ram: product.ram,
                storage: product.storage,
                screenSize: product.screenSize,
                gpu: product.gpu,
                os: product.os,
                battery: product.battery,
            } );
        }
    }, [ product, reset ] );

    const images = useWatch( { control, name: "images" } );
    const brands = [ "Hp", "Dell", "Acer", "Apples", "Asus", ];
    const ramOptions = [ "4GB", "8GB", "16GB", "32GB", "64GB" ];
    const storageOptions = [ "128GB", "256GB", "512GB", "1TB", "2TB" ];

    if ( isFetching ) {
        return <p>Loading...</p>;
    }
    console.log( product );

    const onSubmit = ( data: ProductFormInput ) => {
        const fd = new FormData();

        fd.append( "name", data.name );
        fd.append( "brand", data.brand );
        fd.append( "price", String( Number( data.price ) ) );
        fd.append( "discountPrice", String( Number( data.discountPrice ?? 0 ) ) );
        fd.append( "stocks", String( Number( data.stocks ) ) );

        fd.append( "cpu", data.cpu ?? "" );
        fd.append( "ram", data.ram ?? "" );
        fd.append( "storage", data.storage ?? "" );
        fd.append( "screenSize", data.screenSize ?? "" );
        fd.append( "gpu", data.gpu ?? "" );
        fd.append( "os", data.os ?? "" );
        fd.append( "battery", data.battery ?? "" );

        if ( data.images ) {
            Array.from( data.images ).forEach( ( file ) =>
                fd.append( "images", file )
            );
        }
        console.log( fd );


        product ? updateProduct.mutate( fd ) : createProduct.mutate( fd );

        navigate(-1)

    };

    return (
        <div className="p-5 w-full">
            <form id='save-product' onSubmit={ handleSubmit( onSubmit ) } className='flex justify-center lg:items-start items-center lg:flex-row flex-col gap-10'>
                <div className="space-y-5 max-w-xl w-full">
                    {/* Basic Information */ }
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <Field>
                                <FieldLabel className='dark:text-white'>Product Name</FieldLabel>
                                <Input
                                    { ...register( "name" ) }
                                    placeholder="e.g., Dell Inspiron 15"
                                    className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                />
                                { errors.name && <FieldError>{ errors.name.message }</FieldError> }
                            </Field>

                            <Field>
                                <FieldLabel className='dark:text-white'>Brand</FieldLabel>
                                <Controller
                                    control={ control }
                                    name="brand"
                                    render={ ( { field } ) => (
                                        <Select onValueChange={ field.onChange } value={ product ? product.brand : field.value }>
                                            <SelectTrigger className='border-none outline-none focus-visible:ring-primary focus-visible:ring-1 py-5 rounded-sm dark:text-white bg-light-fg dark:bg-dark-fg'>
                                                <SelectValue placeholder="Select brand" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-light-fg border-none dark:bg-dark-fg">
                                                { brands.map( ( brand ) => (
                                                    <SelectItem key={ brand } className='px-4 py-2 m-0.5 rounded-md hover:bg-primary text-secondary cursor-pointer' value={ brand }>
                                                        { brand }
                                                    </SelectItem>
                                                ) ) }
                                            </SelectContent>
                                        </Select>
                                    ) }
                                />
                                { errors.brand && <FieldError>{ errors.brand.message }</FieldError> }
                            </Field>
                        </CardContent>
                    </Card>

                    {/* Pricing & Inventory */ }
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Pricing & Inventory</CardTitle>
                        </CardHeader>
                        <CardContent className='grid grid-cols-3 gap-4'>
                            <Field>
                                <FieldLabel className='dark:text-white'>Base Price (₦)</FieldLabel>
                                <Input
                                    { ...register( "price" ) }
                                    type='number'
                                    placeholder='0.00'
                                    className='rounded-sm py-5 bg-light-fg text-secondary dark:bg-dark-fg border-none'
                                />
                                { errors.price && <FieldError>{ errors.price.message }</FieldError> }
                            </Field>

                            <Field>
                                <FieldLabel className='dark:text-white'>Discount Price (₦)</FieldLabel>
                                <Input
                                    { ...register( "discountPrice" ) }
                                    type='number'
                                    placeholder='0.00'
                                    className='rounded-sm py-5 bg-light-fg text-secondary dark:bg-dark-fg border-none'
                                />
                                { errors.discountPrice && <FieldError>{ errors.discountPrice.message }</FieldError> }
                            </Field>

                            <Field>
                                <FieldLabel className='dark:text-white'>Stock Quantity</FieldLabel>
                                <Input
                                    { ...register( "stocks" ) }
                                    type='number'
                                    placeholder='0'
                                    className='rounded-sm py-5 bg-light-fg text-secondary dark:bg-dark-fg border-none'
                                />
                                { errors.stocks && <FieldError>{ errors.stocks.message }</FieldError> }
                            </Field>
                        </CardContent>
                    </Card>

                    {/* Technical Specifications */ }
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Technical Specifications</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel className='dark:text-white'>Processor</FieldLabel>
                                    <Input
                                        { ...register( "cpu" ) }
                                        placeholder="e.g., Intel Core i7"
                                        className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                    />
                                    { errors.cpu && <FieldError>{ errors.cpu.message }</FieldError> }
                                </Field>

                                <Field>
                                    <FieldLabel className='dark:text-white'>RAM</FieldLabel>
                                    <Controller
                                        control={ control }
                                        name="ram"
                                        render={ ( { field } ) => (
                                            <Select onValueChange={ field.onChange } defaultValue={ field.value } value={ product ? product.ram : field.value }>
                                                <SelectTrigger className='border-none outline-none focus-visible:ring-primary focus-visible:ring-1 py-5 rounded-sm dark:text-white bg-light-fg dark:bg-dark-fg'> <SelectValue placeholder="Select RAM" /> </SelectTrigger>
                                                <SelectContent className="bg-light-fg border-none dark:bg-dark-fg">
                                                    { ramOptions.map( r => <SelectItem key={ r } value={ r }>{ r }</SelectItem> ) }
                                                </SelectContent>
                                            </Select>
                                        ) }
                                    />
                                    { errors.ram && <FieldError>{ errors.ram.message }</FieldError> }
                                </Field>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel className='dark:text-white'>Screen Size</FieldLabel>
                                    <Input
                                        { ...register( "screenSize" ) }
                                        placeholder="e.g., 15.6 inches"
                                        className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                    />
                                    { errors.screenSize && <FieldError>{ errors.screenSize.message }</FieldError> }
                                </Field>

                                <Field>
                                    <FieldLabel className='dark:text-white'>Storage</FieldLabel>
                                    <Controller
                                        control={ control }
                                        name="storage"
                                        render={ ( { field } ) => (
                                            <Select onValueChange={ field.onChange } value={ product ? product.storage : field.value }>
                                                <SelectTrigger className='border-none outline-none focus-visible:ring-primary focus-visible:ring-1 py-5 rounded-sm dark:text-white bg-light-fg dark:bg-dark-fg'> <SelectValue placeholder="Select storage" /> </SelectTrigger>
                                                <SelectContent >
                                                    { storageOptions.map( s => <SelectItem key={ s } value={ s }>{ s }</SelectItem> ) }
                                                </SelectContent>
                                            </Select>
                                        ) }
                                    />
                                    { errors.storage && <FieldError>{ errors.storage.message }</FieldError> }
                                </Field>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel className='dark:text-white'>GPU (Optional)</FieldLabel>
                                    <Input
                                        { ...register( "gpu" ) }
                                        placeholder="e.g., NVIDIA GTX 1650"
                                        className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel className='dark:text-white'>OS (Optional)</FieldLabel>
                                    <Input
                                        { ...register( "os" ) }
                                        placeholder="e.g., Windows 11"
                                        className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                    />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel className='dark:text-white'>Battery (Optional)</FieldLabel>
                                <Input
                                    { ...register( "battery" ) }
                                    placeholder="e.g., 56Wh Li-ion"
                                    className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                />
                            </Field>
                        </CardContent>
                    </Card>

                    {/* Product Media */ }
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Product Media</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Field>
                                <div className="border-dashed border-secondary relative text-black dark:text-white rounded-xl text-center justify-center flex flex-col items-center p-5 border">
                                    <Icon icon={ UploadCloud } className='text-black dark:text-white' size={ 50 } />
                                    <FieldLabel className=''>Click to upload or drag && drop</FieldLabel>
                                    { errors.images ? <FieldError>{ errors.images.message as string }</FieldError> : <FieldLabel>PNG, JPG or WEBP (max 50) </FieldLabel> }
                                    <Input
                                        type='file'
                                        multiple
                                        accept='image/*'
                                        { ...register( "images" ) }
                                        className='opacity-0 h-full top-0 left-0 cursor-pointer'
                                    />
                                </div>
                            </Field>
                            <div className="mt-5 flex items-center gap-4  overflow-hidden flex-wrap">
                                { product ?
                                    product.images && Array.from( product.images ).map( ( image, i ) => (
                                        <div className="aspect-square size-30 border border-secondary/50 shadow-2xl p-2 rounded-xl">
                                            <img src={ formatImage( image ) } alt="" className='size-full object-contain aspect-square' />
                                        </div>
                                    ) )
                                    : images && Array.from( images ).map( ( file, i ) => (
                                        <div className="aspect-square size-30 border border-secondary/50 shadow-2xl p-2 rounded-xl">
                                            <img src={ URL.createObjectURL( file ) } alt="" className='size-full object-contain aspect-square' />
                                        </div>
                                    ) ) }

                            </div>
                            <div className="">

                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Publish Card */ }
                <div className="w-full max-w-xl">
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Publish</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Field>
                                <FieldLabel className='dark:text-white text-lg'>Status</FieldLabel>
                                <RadioGroup defaultValue="active">
                                    <div className="flex items-center gap-2 dark:text-white">
                                        <RadioGroupItem id='active' value='active' />
                                        <Label htmlFor='active'>Active</Label>
                                    </div>
                                    <div className="flex items-center gap-2 dark:text-white">
                                        <RadioGroupItem id='draft' value='draft' />
                                        <Label htmlFor='draft'>Draft</Label>
                                    </div>
                                </RadioGroup>
                            </Field>
                        </CardContent>
                        <CardFooter className='flex-col gap-2'>

                            <button type='submit' form='save-product' className='flex gap-2 text-lg font-bold items-center justify-center text-white bg-primary p-3 rounded-md w-full'>
                                Publish Product
                            </button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </div>
    );
};