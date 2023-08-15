"use client"

import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from '../components/Input';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';
import Link from 'next/link';
import axios from 'axios';

const LoginPage = () => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true)
        axios.post('/api/register', data)
            .then(() => {
                toast.success('Registered!');
                router.refresh();
                router.push("/login")
            })
            .catch((error) => {
                toast.error(error);
            })
            .finally(() => {
                setisLoading(false);
            })

    }

    return (
        <div className="flex mt-10 items-center justify-center ">
            <div className="bg-white px-4 py-4 sm:px-8 sm:py-16 rounded w-2/5 flex justify-center">
                <div className='w-3/5'>
                    <h2 className="text-2xl font-semibold mb-4 head_text purple_gradient">Register Here!</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <Input
                                id="name"
                                label='Nmail'
                                disabled={isLoading}
                                type="text"
                                register={register}
                                required
                                errors={errors}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <Input
                                id="email"
                                label='Email'
                                disabled={isLoading}
                                type="email"
                                register={register}
                                required
                                errors={errors}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <Input
                                id="password"
                                label='Password'
                                disabled={isLoading}
                                type="password"
                                register={register}
                                required
                                errors={errors}
                            />
                        </div>
                        <Button outline label='Submit' onClick={() => handleSubmit(onSubmit)} />
                    </form>
                    <hr />

                    <div className='flex gap-4 mt-3'>
                        <Button
                            outline
                            label="Google"
                            onClick={() => signIn('google')}
                        />
                        <Button
                            outline
                            label="Github"
                            onClick={() => signIn('github')}
                        />
                    </div>
                    <div className="text-neutral-500 text-center mt-4 font-light">
                        <p>Already have an account?
                            <Link href="login" className="text-dark-600 cursor-pointer hover:text-purple-900"> Login!</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default LoginPage;
