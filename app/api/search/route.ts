import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getListing from "@/app/actions/getListing";

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
        
        const listings = await getListing({
            roomCount,
            guestCount,
            bathroomCount,
            locationValue,
            startDate,
            endDate,
            category
        });

        return NextResponse.json(listings);


    } catch (error: any) {
        throw new Error(error);
    }
}
