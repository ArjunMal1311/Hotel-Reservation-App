"use client"
import React from 'react'

interface HeadingProps {
    title: string;
    center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, center }) => {
    return (
        <div className={center ? 'text-center' : 'text-start'}>
            <div className="text-2xl font-bold mb-3">
                {title}
            </div>
        </div>
    )
}

export default Heading