"use client"

import React from 'react'
import { IconType } from 'react-icons';

interface InputProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

const Button: React.FC<InputProps> = ({ label, onClick, disabled, outline, small, icon: Icon }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`w-full ${outline ? 'border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white'
                : 'bg-purple-500 text-white hover:bg-purple-600'
                } ${small ? 'py-1 px-2 text-sm' : 'py-2 px-4'} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                } flex items-center justify-center rounded-md focus:outline-none`}
        >
            {Icon && <Icon className={`mr-2 ${small ? 'text-sm' : 'text-base'}`} />}
            {label}
        </button>
    )
}

export default Button;
