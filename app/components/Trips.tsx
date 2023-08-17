"use client"
import React, { useCallback, useState } from 'react';
import { SafeReservation, SafeUser } from './types';
import Card from './Card';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface TripsProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const Trips: React.FC<TripsProps> = ({ reservations, currentUser }) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [router]);

    return (
        <div className='mx-auto md:px-6 sm:px-2 mt-10'>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {reservations.map((reservation: any) => (
                    <div className='flex-col' key={reservation.id}>
                        <Card
                            data={reservation.listing}
                            actionId={reservation.id}
                            actionLabel="Cancel reservation"
                        />
                        <div>
                            <button
                                className='w-full flex justify-center orange_gradient font-semibold mt-3 border-2 rounded-lg px-2 py-1 cursor-pointer'
                                onClick={() => onCancel(reservation.id)}
                            >
                                Delete this booking
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Trips;
