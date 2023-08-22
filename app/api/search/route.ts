import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const queryParams = new URLSearchParams(request.url.split("?")[1]);

        var roomCount = parseInt(queryParams.get("roomCount") || '0', 10);
        var guestCount = parseInt(queryParams.get("guestCount") || '0', 10);
        var bathroomCount = parseInt(queryParams.get("bathroomCount") || '0', 10);
        var locationValue = queryParams.get("locationValue") || '';
        var startDate = queryParams.get("startDate") || '';
        var endDate = queryParams.get("endDate") || '';
        var category = queryParams.get("category") || '';

        let query: any = {};

        if (category) {
            query.category = category;
        }

        if (roomCount) {
            query.roomCount = {
                gte: +roomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                gte: +guestCount
            }
        }

        if (bathroomCount) {
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));

        return NextResponse.json(safeListings);

    } catch (error: any) {
        throw new Error(error);
    }
}
