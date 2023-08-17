import { getCurrentUser } from './actions/getCurrentUser'
import Heading from './components/Heading';
import getListings from './actions/getListings';
import Card from './components/Card';
import Link from 'next/link';

const Home = async () => {
  const listings = await getListings();
  const user = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <div className='m-6'>
        <h2 className='text-4xl purple_gradient font-bold mb-8'>No properties are listed</h2>
        <Link href="/addListing" className='mt-8 border-2 p-4 rounded-lg'>Add a property</Link>
      </div>
    );
  }

  return (
    <div className='m-4'>
      <div className='mx-auto md:px-6 sm:px-2 mt-10'>
        <h4 className='purple_gradient text-4xl font-bold mb-3'>Travel your plan with us!</h4>
        <Heading title="Trending Properties" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: any) => (
            <Card
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Home;
