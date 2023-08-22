"use client"
import React, { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import axios from 'axios';
import Card from '../components/Card';
import { ListingsParams } from '../actions/getAllListings';
import { GetServerSidePropsContext } from 'next';

interface ListingParams {
    listing: ListingsParams[];
}

const Page = () => {
    const [listing, setListing] = useState<ListingParams[]>([]);
    const [searchParams, setSearchParams] = useState({
        userId: '',
        roomCount: '',
        guestCount: '',
        bathroomCount: '',
        locationValue: '',
        startDate: '',
        endDate: '',
        category: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const queryParams: { [key: string]: string } = {};

        for (const key in searchParams) {
            if (searchParams[key as keyof typeof searchParams]) {
                queryParams[key] = searchParams[key as keyof typeof searchParams];
            }
        }

        try {
            const apiUrl = "/api/search/";

            const response = await axios.get(apiUrl, {
                params: queryParams
            });

            console.log(response.data)

            setListing(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    return (
        <div className='m-4'>
            <div className='flex justify-center'>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        placeholder="User ID"
                        value={searchParams.userId}
                        onChange={(e) => setSearchParams({ ...searchParams, userId: e.target.value })}
                    />
                    <input
                        type="text"
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        placeholder="Room Count"
                        value={searchParams.roomCount}
                        onChange={(e) => setSearchParams({ ...searchParams, roomCount: e.target.value })}
                    />
                    <input
                        type="text"
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        placeholder="Guest Count"
                        value={searchParams.guestCount}
                        onChange={(e) => setSearchParams({ ...searchParams, guestCount: e.target.value })}
                    />
                    <input
                        type="text"
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        placeholder="Bathroom Count"
                        value={searchParams.bathroomCount}
                        onChange={(e) => setSearchParams({ ...searchParams, bathroomCount: e.target.value })}
                    />
                    <input
                        type="text"
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        placeholder="Location"
                        value={searchParams.locationValue}
                        onChange={(e) => setSearchParams({ ...searchParams, locationValue: e.target.value })}
                    />
                    <input
                        type="text"
                        className="flex-1 p-1 mr-2 rounded-lg focus:border-none"
                        placeholder="Category"
                        value={searchParams.category}
                        onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                    />
                    <button type="submit">
                        <IoSearch className="text-gray-600 text-xl cursor-pointer" />
                    </button>

                </form>
            </div>

            {listing ? (
                <div>
                    <div className='mx-auto md:px-6 sm:px-2 mt-10'>
                        <h4 className='purple_gradient text-4xl font-bold mb-5'>
                            Here are the results!
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                            {listing.map((listing: any) => (
                                <Card key={listing.id} data={listing} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};


export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const queryParams = context.query;
        const response = await axios.get("/api/search/", {
            params: queryParams
        });

        const listing: ListingsParams[] = response.data as ListingsParams[];

        return {
            props: {
                listing,
            },
        };
    } catch (error) {
        console.error("Error fetching data:", error);
        return {
            props: {},
        };
    }
}



export default Page;