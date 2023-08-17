'use client';

import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation, SafeUser } from "./types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import ListingReservation from "./ListingReservation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { categories } from "./Categories";
import axios from "axios";
import { toast } from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface ListingClientProps {
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser;
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ listing, currentUser, reservations = [] }) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
        });

        return dates;
    }, [reservations]);

    const category = useMemo(() => {
        return categories.find((items) =>
            items.label === listing.category);
    }, [listing.category]);

    const onCreateReservation = useCallback(() => {
        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(() => {
            toast.success('Listing reserved!');
            setDateRange(initialDateRange);
            router.push('/mytrips');
        }).catch(() => {
            toast.error('Something went wrong.');
        }).finally(() => {
            setIsLoading(false);
        })
    }, [totalPrice, dateRange, listing?.id, router, currentUser]);

    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price);
            }
        }
    }, [dateRange, listing.price]);
    return (
        <div className="min-h-screen flex flex-col items-center w-full">
            <div className=" p-6 bg-white rounded-lg shadow-md w-full border-2">
                <img src={listing.imageSrc} alt={listing.title} className="object-cover w-full h-64 rounded-t-lg" />
                <div className="flex justify-between items-center sm:flex-row flex-col">
                    <h1 className="mt-4 text-4xl font-bold">{listing.title}</h1>
                    <p className="mt-2 text-lg ">{listing.category}</p>
                </div>
                <p className="mt-2 text-sm">{listing.description}</p>
                <div className="mt-6 text-center flex sm:flex-row flex-col items-center justify-around">
                    <div>
                        <svg className="w-10 h-10 mx-auto text-purple-800 mt-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        <p className="mt-2 text-xl font-semibold">{listing.roomCount} Rooms</p>
                    </div>
                    <div>
                        <svg className="w-10 h-10 mx-auto text-purple-800 mt-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12a6 6 0 016-6V2a6 6 0 016 6v4a6 6 0 01-6 6v4a6 6 0 01-6-6v-4z" />
                        </svg>
                        <p className="mt-2 text-xl font-semibold">{listing.bathroomCount} Bathrooms</p>
                    </div>
                    <div>
                        <svg className="w-10 h-10 mx-auto text-purple-800 mt-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

                <div className="mt-2">
                    <div className="mt-4 text-lg font-bold my-2">
                        Reserve this Place?
                    </div>
                    <div className="order-first mb-10 md:order-last md:col-span-3">
                        <ListingReservation
                            price={listing.price}
                            totalPrice={totalPrice}
                            onChangeDate={(value) => setDateRange(value)}
                            dateRange={dateRange}
                            onSubmit={onCreateReservation}
                            disabled={isLoading}
                            disabledDates={disabledDates}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingClient