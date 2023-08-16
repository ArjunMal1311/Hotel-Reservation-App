import React from 'react';
import { getCurrentUser } from '../actions/getCurrentUser';
import Link from 'next/link';

const Page = async () => {
    const user = await getCurrentUser()

    if (!user) {
        return (
            <>
                <h2 className='text-4xl purple_gradient font-bold mb-8'>Login to view your profile!</h2>
                <Link href="/login" className='mt-8 border-2 p-4 rounded-lg'>Login</Link>
            </>
        )
    }

    return (
        <div className="flex items-center justify-center w-screen mt-3">
            <div className="w-1/2 p-6 rounded-lg bg-white">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome, {user.name}!</h1>
                <p className="text-gray-600 mb-6">Your Profile Details</p>
                <div className="mb-6">
                    <p className="text-gray-700">
                        <strong className="text-purple-600">Name:</strong> {user.name}
                    </p>
                    <p className="text-gray-700">
                        <strong className="text-purple-600">Email:</strong> {user.email}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
