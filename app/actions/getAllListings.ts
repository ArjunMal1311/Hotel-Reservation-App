import prisma from "@/app/libs/prismadb";


export default async function getAllListings() {
    try {


        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing: any) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return safeListings;
    } catch (error: any) {
        throw new Error(error);
    }
}