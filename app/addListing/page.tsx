"use client"
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../components/Button';
import Heading from '../components/Heading';
import CountrySelect from '../components/CountrySelect';
import CategoryItem, { categories } from '../components/Categories';
import Counter from '../components/Counter';
import ImageUpload from '../components/ImageUpload';
import Input from '../components/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const Page = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY);

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });


    const location = watch('location');
    const category = watch('category');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const onBack = () => {
        setStep((value) => Math.max(value - 1, STEPS.CATEGORY));
    }

    const onNext = () => {
        setStep((value) => Math.min(value + 1, Object.keys(STEPS).length - 1));
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        axios.post('/api/listing', data).then(() => {
            toast.success('Property Added Successfully!')
            router.push("/")
            setStep(STEPS.CATEGORY)
        }).catch(() => {
            toast.error('Something went wrong.');
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }


    return (
        <div className="flex justify-center mt-6 h-screen">
            <div className="w-4/5 max-w-screen-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {step === STEPS.CATEGORY && (
                        <div>
                            <Heading title="Step 1: Select Category" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[65vh] overflow-y-auto">
                                {categories.map((item) => (
                                    <div key={item.label} className="col-span-1">
                                        <CategoryItem
                                            onClick={(category) => setCustomValue('category', category)}
                                            selected={category === item.label}
                                            label={item.label}
                                            icon={item.icon}
                                            description={item.description}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {step === STEPS.LOCATION && (
                        <div>
                            <Heading title="Step 2: Select Location" />
                            <CountrySelect
                                value={location}
                                onChange={(value) => setCustomValue('location', value)}
                            />
                        </div>
                    )}
                    {step === STEPS.INFO && (
                        <div>
                            <Heading title="Step 3: About your place!" />
                            <Counter
                                onChange={(value) => setCustomValue('guestCount', value)}
                                value={guestCount}
                                title="Number of Guests"
                            />
                            <hr />
                            <Counter
                                onChange={(value) => setCustomValue('roomCount', value)}
                                value={roomCount}
                                title="Number of Rooms"
                            />
                            <hr />
                            <Counter
                                onChange={(value) => setCustomValue('bathroomCount', value)}
                                value={bathroomCount}
                                title="Number of Bathrooms"
                            />
                        </div>
                    )}
                    {step === STEPS.IMAGES && (
                        <div>
                            <Heading title="Step 4: Add Pictures!" />
                            <ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc} />
                        </div>
                    )}
                    {step === STEPS.DESCRIPTION && (
                        <div>
                            <Heading title="Step 5: Add Information about your Property!" />
                            <div className=''>
                                <div className="">Title</div>
                                <Input
                                    id="title"
                                    label="Title"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                                <div className="mt-2">Description</div>
                                <Input
                                    id="description"
                                    label="Description"
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                />
                            </div>

                        </div>
                    )}
                    {step === STEPS.PRICE && (
                        <div>
                            <Heading title="Step 5: Pricing!" />
                            <Input
                                id="price"
                                label="Price per night (in ₹)"
                                type="number"
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                            />
                        </div>
                    )}
                </form>
                <div className="flex justify-between mt-4">
                    <Button
                        label="Back"
                        onClick={onBack}
                        disabled={step === STEPS.CATEGORY}
                    />
                    <Button
                        label={step === STEPS.PRICE ? "Submit" : "Next"}
                        onClick={handleSubmit(onSubmit)}
                    />
                </div>
            </div>
        </div>

    );
}

export default Page;

