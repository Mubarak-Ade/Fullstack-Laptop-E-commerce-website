import { InputField } from '@/components/Form/InputField';
import { TextField } from '@/components/Form/TextField';
import { Icon } from '@/components/shared/Icon';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/context/ToastContext';
import { useEditUser, useUserProfile } from '@/features/auth/hooks';
import { PrimaryBtnVariant, SecondaryBtnVariant } from '@/motion/button';
import { ProfileSchema, type Profile } from '@/schema/user.schema';
import { formatImage } from '@/utils/imageFormat';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';

export const ProfilePage = () => {
    const imageRef = useRef<HTMLInputElement | null>(null);

    const { data: user } = useQuery(useUserProfile());
    const editUser = useMutation(useEditUser());
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<Omit<Profile, 'isVerified'>>({
        resolver: zodResolver(ProfileSchema.omit({ isVerified: true })),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            bio: '',
            avatar: undefined,
        },
    });

    const showToast = useToast().showToast;

    const image = useWatch({ control, name: 'avatar' });
    const file = image?.[0];

    useEffect(() => {
        if (user) {
            reset({
                firstName: user?.firstName ?? '',
                lastName: user?.lastName ?? '',
                email: user?.email ?? '',
                phone: user?.phone ?? '',
                bio: user?.bio ?? '',
            });
        }
    }, [user, reset]);

    const onSubmit = (data: Omit<Profile, 'isVerified'>) => {
        const fd = new FormData();
        fd.append('firstName', data.firstName);
        fd.append('lastName', data.lastName);
        fd.append('email', data.email);
        fd.append('phone', data.phone);
        if (data.avatar && data.avatar[0]) {
            fd.append('avatar', data.avatar[0]);
        }
        fd.append('bio', data.bio);

        editUser.mutate(fd, {
            onSuccess: () => showToast('success', 'profile editted successfully'),
            onError: error => {
                showToast('error', error.message);
            },
        });

        console.log(data);
    };

    console.log(errors);

    return (
        <div className="px-6 py-10">
            <div className="">
                <h1 className="text-3xl font-semibold font-technical dark:text-white text-black">
                    Profile Information
                </h1>
                <h4 className="text-secondary mt-1">
                    Manage your personal details and public presence on the platform
                </h4>
            </div>
            <Card className="bg-light-bg dark:bg-dark-surface max-w-2xl">
                <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader>
                        <div className="flex gap-10 p-4">
                            <div className="relative">
                                <div className="aspect-square size-30 border border-secondary/50 shadow-2xl rounded-full overflow-hidden">
                                    {file ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            className="size-full object-cover aspect-square"
                                        />
                                    ) : user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            className="size-full object-cover aspect-square"
                                        />
                                    ) : null}
                                </div>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    {...register('avatar')}
                                    ref={e => {
                                        register('avatar').ref(e);
                                        imageRef.current = e;
                                    }}
                                    className="hidden"
                                />
                            </div>
                            <div className="p-2">
                                <h1 className="text-2xl font-bold text-black dark:text-white">
                                    {user?.firstName
                                        ? `${user.firstName} ${user.lastName}`
                                        : 'User Name'}
                                </h1>
                                <h4 className="text-sm text-secondary mt-2">
                                    JPG, GIF, PNG. Max size of 800K
                                </h4>
                                <div className="mt-4 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => imageRef.current?.click()}
                                        className="px-5 py-2.5 bg-light-fg dark:bg-dark-fg text-black dark:text-white rounded-xl font-semibold"
                                    >
                                        Upload Now
                                    </button>
                                    <button className="px-5 py-2.5 text-error font-semibold">
                                        Remove Photo
                                    </button>
                                </div>
                            </div>
                        </div>
                        <hr className="border-light-border dark:border-dark-border" />
                    </CardHeader>
                    <CardContent>
                        <div className="p-5">
                            <div className="flex gap-5">
                                <InputField
                                    {...register('firstName')}
                                    errors={errors.firstName}
                                    label="First Name"
                                    placeholder="John"
                                />
                                <InputField
                                    {...register('lastName')}
                                    errors={errors.lastName}
                                    label="Last Name"
                                    placeholder="Doe"
                                />
                            </div>
                            <div className="flex gap-5">
                                <InputField
                                    {...register('email')}
                                    errors={errors.email}
                                    label="Email Address"
                                    placeholder="user@gmail.com"
                                />
                                <InputField
                                    {...register('phone')}
                                    errors={errors.phone}
                                    label="Phone Number"
                                    placeholder="+1 (124) 456789"
                                />
                            </div>
                            <span className="flex items-center gap-1 text-green-800 mt-2 mb-5 font-bold uppercase text-sm">
                                <Icon icon={CheckCircle2} className="fill-green-800 text-white" />{' '}
                                Verified
                            </span>
                            <TextField
                                {...register('bio')}
                                errors={errors.bio}
                                label="Bio / Personal Statement"
                                placeholder="Tell us about yourself, your interest, or shopping style.."
                            />
                        </div>
                        <hr className="border-light-border dark:border-dark-border" />
                    </CardContent>
                    <CardFooter>
                        <div className="flex items-center mr-0 ml-auto  p-5 gap-5">
                            <motion.button
                                variants={SecondaryBtnVariant}
                                whileHover="hover"
                                whileTap="tap"
                                className="px-8 py-3 rounded-xl cursor-pointer font-bold text-secondary"
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                type="submit"
                                form="profile-form"
                                variants={PrimaryBtnVariant}
                                whileHover="hover"
                                whileTap="tap"
                                className="px-6 py-3 bg-primary font-bold cursor-pointer shadow-[0_0_10px] text-white rounded-xl"
                            >
                                Save Changes
                            </motion.button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};
