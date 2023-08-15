import React from 'react';
import Image from 'next/image';
import useCountries from './useCountries';
import { SafeListing } from './types';
import Link from 'next/link';

interface ListingCardProps {
    data: SafeListing;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
}

const Card: React.FC<ListingCardProps> = ({ data, disabled, actionLabel, actionId = '' }) => {
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);

    return (
        <div className="bg-purple-100 rounded-lg shadow-md p-4 transform hover:scale-105 transition cursor-pointer">
            <Link href={`/listing/${data.id}`}>
                <Image
                    src={data.imageSrc}
                    alt="Listing"
                    className="object-cover h-48 w-full rounded-t-lg"
                    width={500}
                    height={500}
                />
                <div className="mt-4">
                    <p className="text-purple-900 font-semibold text-lg">
                        {location?.region}, {location?.label}
                    </p>
                    <p className="mt-1 text-purple-500 font-light">
                        {data.title}
                    </p>
                    <p className="mt-1 text-purple-700 font-semibold">
                        $ {data.price}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default Card;
