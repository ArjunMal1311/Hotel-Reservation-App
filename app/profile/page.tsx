import React from 'react';

const Page = () => {
    const user = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '123-456-7890',
        reservationCount: 3,
        upcomingReservations: [
            {
                id: 1,
                hotelName: 'Example Hotel 1',
                checkInDate: '2023-08-20',
                checkOutDate: '2023-08-25',
            },
            {
                id: 2,
                hotelName: 'Example Hotel 2',
                checkInDate: '2023-09-10',
                checkOutDate: '2023-09-15',
            },
        ],
    };

    return (
            <div className="flex items-center justify-center w-screen mt-3">
            <div className="w-1/2 p-6 rounded-lg bg-white">
                <h1 className="text-3xl font-semibold text-gray-800 mb-2">Welcome, {user.firstName}!</h1>
                <p className="text-gray-600 mb-6">Your Profile Details</p>
                <div className="mb-6">
                    <p className="text-gray-700">
                        <strong className="text-purple-600">Name:</strong> {user.firstName} {user.lastName}
                    </p>
                    <p className="text-gray-700">
                        <strong className="text-purple-600">Email:</strong> {user.email}
                    </p>
                    <p className="text-gray-700">
                        <strong className="text-purple-600">Phone:</strong> {user.phoneNumber}
                    </p>
                </div>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Reservations</h2>
                    <p className="text-gray-600 mb-4">Upcoming and Past Reservations</p>
                    <p className="text-gray-700">
                        <strong className="text-purple-600">Total Reservations:</strong> {user.reservationCount}
                    </p>
                    {user.upcomingReservations.length > 0 ? (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Upcoming Reservations</h3>
                            <ul className="list-disc pl-6">
                                {user.upcomingReservations.map(reservation => (
                                    <li key={reservation.id} className="text-gray-700 mb-2">
                                        <p className="text-gray-700">
                                            <strong className="text-purple-600">Hotel:</strong> {reservation.hotelName}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong className="text-purple-600">Check-in:</strong> {reservation.checkInDate}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong className="text-purple-600">Check-out:</strong> {reservation.checkOutDate}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-gray-700">You don't have any upcoming reservations.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
