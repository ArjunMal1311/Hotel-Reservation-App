"use client"
import React, { useCallback, useState } from 'react'
import { SafeUser } from '../types';
import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from "react-icons/ai"
import Avatar from './Avatar';
import Link from 'next/link';

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className='flex flex-row items-center justify-between gap-4 md:gap-0 mx-6 my-2 border-b-2 py-2'>
            <h4 className='purple_gradient font-extrabold leading-[1.15] text-black text-2xl'>WanderStay</h4>
            <div className='relative'>
                <div className='flex flex-row items-center gap-3'>
                    <div className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                        <h4 className='purple_gradient'>"Wander, Stay, Experience, Enjoy."</h4>
                    </div>

                    <div onClick={toggleOpen} className='p-4 md:py-2 md:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition' >
                        <AiOutlineMenu />
                        <div className="hidden md:block">
                            <Avatar src={currentUser?.image} />
                        </div>
                    </div>
                    {isOpen && (
                        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm hover:cursor-pointer border-2'>
                            <div>
                                {currentUser ? (
                                    <>
                                        <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => router.push('/profile')}>Hello, {currentUser.name}</div>
                                        <div className='px-4 py-3 hover:bg-neutral-300 transition font-semibold cursor-pointer' onClick={() => router.push('/addListing')}>Add a property</div>
                                    </>

                                ) : (
                                    <>
                                        <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer' onClick={() => router.push('/login')}>Login</div>
                                        <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer' onClick={() => router.push('/register')}>SignUp</div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar