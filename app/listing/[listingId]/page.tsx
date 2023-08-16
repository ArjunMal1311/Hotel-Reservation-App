import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingId";
import getReservations from "@/app/actions/getReservations";
import ListingInformation from "@/app/components/ListingInformation";

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    return (
        <div className="min-h-screen flex flex-col items-center w-screen sm:w-full">
            <div className="max-w-3xl p-6 bg-white rounded-lg shadow-md w-full">
                {listing ? <ListingInformation
                    listing={listing}
                    currentUser={currentUser}
                    reservations={reservations}
                /> : <div>
                    <h4 className="text-4xl purple_gradient m-2">No Listings Found!</h4>
                </div>}
            </div>
        </div>
    );
}

export default ListingPage;


