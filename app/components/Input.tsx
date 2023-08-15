"use client"

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({ id, label, type = "text", disabled, register, required, errors }) => {
    return (
        <div className='w-full relative'>
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder={label}
                type={type}
                className={`w-full mt-1 border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-0 focus:border-blue-300 
                    ${errors[id] ? 'border-rose-500' : 'border-neutral-300'}
                    ${errors[id] ? 'focus:border-rose-500' : 'focus:border-black'}
                `}
            />
        </div>
    )
}

export default Input;
