import { useCreateProduct } from '@/features/product/hooks';
import { ProductFormSchema, type ProductFormData } from '@/schema/product.schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Icon } from '../shared/Icon';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const ProductForm = () => {
    const brands = ["Hp", "Dell", "Acer", "Apple"];
    const ramOptions = ["4GB", "8GB", "16GB", "32GB", "64GB"];
    const storageOptions = ["128GB", "256GB", "512GB", "1TB", "2TB"];

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: {
            name: "",
            brand: "",
            price: "",
            discountPrice: "",
            stocks: "",
            cpu: "",
            ram: "",
            storage: "",
            screenSize: "",
            gpu: "",
            os: "",
            battery: "",
            images: undefined,
        }
    });

    const createProduct = useCreateProduct();

    const onSubmit = (data: ProductFormData) => {
        const formData = new FormData();

        // Append simple fields
        formData.append("name", data.name);
        formData.append("brand", data.brand);
        formData.append("price", data.price);
        formData.append("discountPrice", data.discountPrice || "0");
        formData.append("stocks", data.stocks);

        // Append specs as individual fields
        formData.append("cpu", data.cpu);
        formData.append("ram", data.ram);
        formData.append("storage", data.storage);
        formData.append("screenSize", data.screenSize);
        formData.append("gpu", data.gpu || "");
        formData.append("os", data.os || "");
        formData.append("battery", data.battery || "");

        // Append images
        if (data.images) {
            Array.from(data.images).forEach((file) => {
                formData.append("images", file);
            });
        }

        createProduct.mutate(formData);
    };

    return (
        <div className="p-5 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className='flex lg:flex-row flex-col gap-10'>
                <div className="space-y-5 max-w-xl w-full">
                    {/* Basic Information */}
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <Field>
                                <FieldLabel className='dark:text-white'>Product Name</FieldLabel>
                                <Input
                                    {...register("name")}
                                    placeholder="e.g., Dell Inspiron 15"
                                    className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                />
                                {errors.name && <FieldError>{errors.name.message}</FieldError>}
                            </Field>

                            <Field>
                                <FieldLabel className='dark:text-white'>Brand</FieldLabel>
                                <Select onValueChange={(value) => setValue("brand", value)} value={watch("brand")}>
                                    <SelectTrigger className='border-none outline-none focus-visible:ring-primary focus-visible:ring-1 py-5 rounded-sm dark:text-white bg-light-fg dark:bg-dark-fg'>
                                        <SelectValue placeholder="Select brand" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-light-fg border-none dark:bg-dark-fg">
                                        {brands.map((brand) => (
                                            <SelectItem key={brand} className='px-4 py-2 m-0.5 rounded-md hover:bg-primary text-secondary cursor-pointer' value={brand}>
                                                {brand}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.brand && <FieldError>{errors.brand.message}</FieldError>}
                            </Field>
                        </CardContent>
                    </Card>

                    {/* Pricing & Inventory */}
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Pricing & Inventory</CardTitle>
                        </CardHeader>
                        <CardContent className='grid grid-cols-3 gap-4'>
                            <Field>
                                <FieldLabel className='dark:text-white'>Base Price (₦)</FieldLabel>
                                <Input
                                    {...register("price")}
                                    type='number'
                                    placeholder='0.00'
                                    className='rounded-sm py-5 bg-light-fg text-secondary dark:bg-dark-fg border-none'
                                />
                                {errors.price && <FieldError>{errors.price.message}</FieldError>}
                            </Field>

                            <Field>
                                <FieldLabel className='dark:text-white'>Discount Price (₦)</FieldLabel>
                                <Input
                                    {...register("discountPrice")}
                                    type='number'
                                    placeholder='0.00'
                                    className='rounded-sm py-5 bg-light-fg text-secondary dark:bg-dark-fg border-none'
                                />
                                {errors.discountPrice && <FieldError>{errors.discountPrice.message}</FieldError>}
                            </Field>

                            <Field>
                                <FieldLabel className='dark:text-white'>Stock Quantity</FieldLabel>
                                <Input
                                    {...register("stocks")}
                                    type='number'
                                    placeholder='0'
                                    className='rounded-sm py-5 bg-light-fg text-secondary dark:bg-dark-fg border-none'
                                />
                                {errors.stocks && <FieldError>{errors.stocks.message}</FieldError>}
                            </Field>
                        </CardContent>
                    </Card>

                    {/* Technical Specifications */}
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Technical Specifications</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel className='dark:text-white'>Processor</FieldLabel>
                                    <Input
                                        {...register("cpu")}
                                        placeholder="e.g., Intel Core i7"
                                        className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                    />
                                    {errors.cpu && <FieldError>{errors.cpu.message}</FieldError>}
                                </Field>

                                <Field>
                                    <FieldLabel className='dark:text-white'>RAM</FieldLabel>
                                    <Select onValueChange={(value) => setValue("ram", value)} value={watch("ram")}>
                                        <SelectTrigger className='border-none outline-none focus-visible:ring-primary focus-visible:ring-1 py-5 rounded-sm dark:text-white bg-light-fg dark:bg-dark-fg'>
                                            <SelectValue placeholder="Select RAM" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-light-fg border-none dark:bg-dark-fg">
                                            {ramOptions.map((ram) => (
                                                <SelectItem key={ram} className='px-4 py-2 m-0.5 rounded-md hover:bg-primary text-secondary cursor-pointer' value={ram}>
                                                    {ram}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.ram && <FieldError>{errors.ram.message}</FieldError>}
                                </Field>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel className='dark:text-white'>Screen Size</FieldLabel>
                                    <Input
                                        {...register("screenSize")}
                                        placeholder="e.g., 15.6 inches"
                                        className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                    />
                                    {errors.screenSize && <FieldError>{errors.screenSize.message}</FieldError>}
                                </Field>

                                <Field>
                                    <FieldLabel className='dark:text-white'>Storage</FieldLabel>
                                    <Select onValueChange={(value) => setValue("storage", value)} value={watch("storage")}>
                                        <SelectTrigger className='border-none outline-none focus-visible:ring-primary focus-visible:ring-1 py-5 rounded-sm dark:text-white bg-light-fg dark:bg-dark-fg'>
                                            <SelectValue placeholder="Select storage" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-light-fg border-none dark:bg-dark-fg">
                                            {storageOptions.map((storage) => (
                                                <SelectItem key={storage} className='px-4 py-2 m-0.5 rounded-md hover:bg-primary text-secondary cursor-pointer' value={storage}>
                                                    {storage}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.storage && <FieldError>{errors.storage.message}</FieldError>}
                                </Field>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel className='dark:text-white'>GPU (Optional)</FieldLabel>
                                    <Input
                                        {...register("gpu")}
                                        placeholder="e.g., NVIDIA GTX 1650"
                                        className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel className='dark:text-white'>OS (Optional)</FieldLabel>
                                    <Input
                                        {...register("os")}
                                        placeholder="e.g., Windows 11"
                                        className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                    />
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel className='dark:text-white'>Battery (Optional)</FieldLabel>
                                <Input
                                    {...register("battery")}
                                    placeholder="e.g., 56Wh Li-ion"
                                    className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-5 bg-light-fg dark:bg-dark-fg'
                                />
                            </Field>
                        </CardContent>
                    </Card>

                    {/* Product Media */}
                    <Card className='dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg'>
                        <CardHeader>
                            <CardTitle className='dark:text-white text-lg'>Product Media</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Field>
                                <FieldLabel className='dark:text-white'>Images (Max 5)</FieldLabel>
                                <Input
                                    type='file'
                                    multiple
                                    accept='image/*'
                                    {...register("images")}
                                    className='rounded-sm dark:border-dark-border border-light-border focus-visible:ring-primary focus-visible:ring-1 dark:text-white outline-none py-2 bg-light-fg dark:bg-dark-fg'
                                />
                                {errors.images && <FieldError>{errors.images.message as string}</FieldError>}
                            </Field>
                        </CardContent>
                    </Card>
                </div>

                {/* Publish Card */}
                <div className="w-full max-w-sm">
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
                            <button type='button' className='flex gap-2 text-lg font-bold items-center justify-center text-primary border border-primary p-3 rounded-md w-full'>
                                <Icon icon={Eye} />
                                Preview
                            </button>
                            <button type='submit' className='flex gap-2 text-lg font-bold items-center justify-center text-white bg-primary p-3 rounded-md w-full'>
                                Publish Product
                            </button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </div>
    );
};