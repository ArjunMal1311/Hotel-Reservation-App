import React from 'react'
import { SafeListing, SafeUser } from './types';

interface ListingCardProps {
    data: SafeListing;
    // reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
};

const ListingCard: React.FC<ListingCardProps> = ({ data: listing, onAction, disabled, actionLabel, actionId = '' }) => {
    return (
        <div>
            <img src={listing.imageSrc} alt={listing.title} className="object-cover w-full h-64 rounded-t-lg" />
            <div className="flex justify-between items-center">
                <h1 className="mt-4 text-4xl font-bold purple_gradient">{listing.title}</h1>
                <p className="mt-2 text-lg purple_gradient">{listing.category}</p>
            </div>
            <p className="mt-2 text-sm">{listing.description}</p>
            <div className="mt-6 grid grid-cols-3 gap-6 text-center">
                <div>
                    <svg className="w-10 h-10 mx-auto text-purple-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <p className="mt-2 text-xl font-semibold">{listing.roomCount} Rooms</p>
                </div>
                <div>
                    <svg className="w-10 h-10 mx-auto text-purple-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12a6 6 0 016-6V2a6 6 0 016 6v4a6 6 0 01-6 6v4a6 6 0 01-6-6v-4z" />
                    </svg>
                    <p className="mt-2 text-xl font-semibold">{listing.bathroomCount} Bathrooms</p>
                </div>
                <div>
                    <svg className="w-10 h-10 mx-auto text-purple-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 16v4h-4M22 12h-4M22 8h-4M18 4L6 4" />
                    </svg>
                    <p className="mt-2 text-xl font-semibold">{listing.guestCount} Guests</p>
                </div>
            </div>
            <div className="mt-8 text-center mb-4">
                <p className="text-3xl font-extrabold">
                    ${listing.price.toLocaleString()}
                </p>
                <p className="text-sm">Per Night</p>
            </div>

            <hr />

            
        </div>
    )
}

export default ListingCard