import { useCreateProduct, useProductId, useUpdateProduct } from '@/features/product/hooks';
import { ProductSchema, type ProductFormInput } from '@/schema/product.schema';
import { formatImage } from '@/utils/imageFormat';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Trash2, UploadCloud } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { InputField } from '../Form/InputField';
import { SelectField } from '../Form/SelectField';
import { Icon } from '../shared/Icon';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ProductFormSkeleton } from '../layout/skeleton/ui/ProductFormSkeleton';
import { useToast } from '@/context/ToastContext';

type ExistingImage = {
    src: string;
    removeId?: string;
};

const definedStrings = (values: Array<string | undefined>) =>
    values.filter((value): value is string => Boolean(value));

export const ProductForm = () => {
    const location = useLocation();

    const productId = (location.state as string | undefined) ?? '';
    const { data: product, isFetching } = useQuery(useProductId(productId));
    const navigate = useNavigate();
    const { showToast } = useToast();
    const createProduct = useCreateProduct();
    const updateProduct = useMutation(useUpdateProduct(product?._id as string));

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ProductFormInput>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            brand: '',
            price: '',
            discountPrice: '',
            stocks: '',
            cpu: '',
            ram: '',
            storage: '',
            screenSize: '',
            gpu: '',
            os: '',
            battery: '',
        },
    });
    const imagesRegister = register('images');
    const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
    const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    useEffect(() => {
        if (product) {
            reset({
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
            });
        }
    }, [product, reset]);

    const brands = useMemo(
        () => Array.from(new Set(definedStrings(['Hp', 'Dell', 'Acer', 'Apple', 'Asus', 'Lenovo', product?.brand]))),
        [product?.brand]
    );
    const ramOptions = useMemo(
        () => Array.from(new Set(definedStrings(['4GB', '8GB', '16GB', '32GB', '64GB', product?.ram]))),
        [product?.ram]
    );
    const storageOptions = useMemo(
        () => Array.from(new Set(definedStrings(['128GB', '256GB', '512GB', '1TB', '2TB', product?.storage]))),
        [product?.storage]
    );

    const normalizedProductImages = useMemo(() => {
        if (!product?.images) {
            return [] as ExistingImage[];
        }
        return Array.from(
            product.images as Array<string | { url?: string; public_id?: string }>
        ).map(image => {
            if (typeof image === 'string') {
                return {
                    src: formatImage(image),
                    removeId: image,
                };
            }
            const imageSrc = image.url
                ? image.url.startsWith('http')
                    ? image.url
                    : formatImage(image.url)
                : '';
            return {
                src: imageSrc,
                removeId: image.public_id,
            };
        });
    }, [product?.images]);

    useEffect(() => {
        if (product) {
            setExistingImages(normalizedProductImages);
            setRemovedImageIds([]);
            return;
        }
        setExistingImages([]);
        setRemovedImageIds([]);
    }, [normalizedProductImages, product]);

    const removeNewImage = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => {
            const image = prev[index];
            if (image?.removeId) {
                setRemovedImageIds(ids =>
                    ids.includes(image.removeId as string)
                        ? ids
                        : [...ids, image.removeId as string]
                );
            }
            return prev.filter((_, i) => i !== index);
        });
    };

    if (isFetching) {
        return <ProductFormSkeleton />;
    }

    const onSubmit = (data: ProductFormInput) => {
        const fd = new FormData();

        fd.append('name', data.name);
        fd.append('brand', data.brand);
        fd.append('price', String(Number(data.price)));
        fd.append('discountPrice', String(Number(data.discountPrice ?? 0)));
        fd.append('stocks', String(Number(data.stocks)));

        fd.append('cpu', data.cpu ?? '');
        fd.append('ram', data.ram ?? '');
        fd.append('storage', data.storage ?? '');
        fd.append('screenSize', data.screenSize ?? '');
        fd.append('gpu', data.gpu ?? '');
        fd.append('os', data.os ?? '');
        fd.append('battery', data.battery ?? '');

        selectedFiles.forEach(file => fd.append('product', file));
        removedImageIds.forEach(id => fd.append('removedImage', id));

        product
            ? updateProduct.mutate(fd, {
                      onSuccess: () => {
                          showToast('success', 'Product updated successfully');
                          navigate('/admin/products');
                      },
                      onError: error => {
                          showToast('error', error.message);
                      },
                  })
            : createProduct.mutate(fd, {
                  onSuccess: () => {
                      showToast('success', 'Product created successfully');
                      navigate('/admin/products');
                  },
                  onError: error => {
                      showToast('error', error.message);
                  },
              });
    };

    return (
        <div className="p-5 w-full">
            <form
                id="save-product"
                onSubmit={handleSubmit(onSubmit)}
                className="flex justify-center lg:items-start items-center lg:flex-row flex-col gap-10"
            >
                <div className="space-y-5 max-w-xl w-full">
                    {/* Basic Information */}
                    <Card className="dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg">
                        <CardHeader>
                            <CardTitle className="dark:text-white text-lg">
                                Basic Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <InputField
                                label="Product Name"
                                {...register('name')}
                                placeholder="e.g., Dell Inspiron 15"
                                errors={errors.name}
                            />

                            <SelectField
                                label="Brand"
                                control={control}
                                data={brands}
                                errors={errors.brand}
                                placeholder="Select Brand"
                                name="brand"
                            />
                        </CardContent>
                    </Card>

                    {/* Pricing & Inventory */}
                    <Card className="dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg">
                        <CardHeader>
                            <CardTitle className="dark:text-white text-lg">
                                Pricing & Inventory
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-3 gap-4">
                            <InputField
                                label="Base Price"
                                type="number"
                                placeholder="0.00"
                                {...register('price')}
                                errors={errors.price}
                            />

                            <InputField
                                label="Discount Price"
                                type="number"
                                placeholder="0.00"
                                {...register('discountPrice')}
                                errors={errors.discountPrice}
                            />

                            <InputField
                                label="Stock Quantity"
                                type="number"
                                placeholder="0"
                                {...register('stocks')}
                                errors={errors.stocks}
                            />
                        </CardContent>
                    </Card>

                    {/* Technical Specifications */}
                    <Card className="dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg">
                        <CardHeader>
                            <CardTitle className="dark:text-white text-lg">
                                Technical Specifications
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    label="Process"
                                    placeholder="e.g., Interl Core i7"
                                    {...register('cpu')}
                                    errors={errors.cpu}
                                />

                                <SelectField
                                    label="RAM"
                                    control={control}
                                    data={ramOptions}
                                    errors={errors.ram}
                                    placeholder="Select RAM"
                                    name="ram"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    label="Screen Size"
                                    placeholder="e.g., 15.6 inches"
                                    {...register('screenSize')}
                                    errors={errors.screenSize}
                                />
                                <SelectField
                                    label="Storage"
                                    control={control}
                                    data={storageOptions}
                                    errors={errors.storage}
                                    placeholder="Select storage"
                                    name="storage"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <InputField
                                    label="GPU (Optional)"
                                    placeholder="e.g., NVIDIA GTX 1650"
                                    {...register('gpu')}
                                    errors={errors.gpu}
                                />
                                <InputField
                                    label="OS (Optional)"
                                    placeholder="e.g., Windows 11"
                                    {...register('os')}
                                    errors={errors.os}
                                />
                                <InputField
                                    label="Battery (Optional)"
                                    placeholder="e.g., 56Wh Li-ion"
                                    {...register('battery')}
                                    errors={errors.battery}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Media */}
                    <Card className="dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg">
                        <CardHeader>
                            <CardTitle className="dark:text-white text-lg">Product Media</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Field>
                                <div className="border-dashed border-secondary relative text-black dark:text-white rounded-xl text-center justify-center flex flex-col items-center p-5 border">
                                    <Icon
                                        icon={UploadCloud}
                                        className="text-black dark:text-white"
                                        size={50}
                                    />
                                    <FieldLabel className="">
                                        Click to upload or drag && drop
                                    </FieldLabel>
                                    {errors.images ? (
                                        <FieldError>{errors.images.message as string}</FieldError>
                                    ) : (
                                        <FieldLabel>PNG, JPG or WEBP (max 50) </FieldLabel>
                                    )}
                                    <Input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        {...imagesRegister}
                                        onChange={event => {
                                            imagesRegister.onChange(event);
                                            const files = event.target.files;
                                            if (!files || files.length === 0) {
                                                return;
                                            }
                                            setSelectedFiles(prev => [
                                                ...prev,
                                                ...Array.from(files),
                                            ]);
                                            event.target.value = '';
                                        }}
                                        className="opacity-0 h-full top-0 left-0 cursor-pointer"
                                    />
                                </div>
                            </Field>
                            <div className="mt-5 flex items-center gap-4  overflow-hidden flex-wrap">
                                {existingImages.map((image, index) => (
                                    <div
                                        key={`${image.src}-${index}`}
                                        className="aspect-square relative size-30 border border-secondary/50 shadow-2xl p-2 rounded-xl"
                                    >
                                        <img
                                            src={image.src}
                                            alt=""
                                            className="size-full object-contain aspect-square"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeExistingImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <Icon icon={Trash2} size={15} />
                                        </button>
                                    </div>
                                ))}
                                {selectedFiles.map((file, index) => (
                                    <div
                                        key={`${file.name}-${index}`}
                                        className="aspect-square relative size-30 border border-secondary/50 shadow-2xl p-2 rounded-xl"
                                    >
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt=""
                                            className="size-full object-contain aspect-square"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeNewImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                                        >
                                            <Icon icon={Trash2} size={15} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className=""></div>
                        </CardContent>
                    </Card>
                </div>

                {/* Publish Card */}
                <div className="w-full max-w-xl">
                    <Card className="dark:bg-dark-surface p-5 rounded-md border-light-border bg-light-bg">
                        <CardHeader>
                            <CardTitle className="dark:text-white text-lg">Publish</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Field>
                                <FieldLabel className="dark:text-white text-lg">Status</FieldLabel>
                                <RadioGroup defaultValue="active">
                                    <div className="flex items-center gap-2 dark:text-white">
                                        <RadioGroupItem id="active" value="active" />
                                        <Label htmlFor="active">Active</Label>
                                    </div>
                                    <div className="flex items-center gap-2 dark:text-white">
                                        <RadioGroupItem id="draft" value="draft" />
                                        <Label htmlFor="draft">Draft</Label>
                                    </div>
                                </RadioGroup>
                            </Field>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <button
                                type="submit"
                                form="save-product"
                                className="flex gap-2 text-lg font-bold cursor-pointer items-center justify-center text-white bg-primary p-3 rounded-md w-full"
                            >
                                Publish Product
                            </button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </div>
    );
};
