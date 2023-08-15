import Image from 'next/image'
import { getCurrentUser } from './actions/getCurrentUser'
import Heading from './components/Heading';
import getListings, { ListingsParams } from './actions/getListings';
import Card from './components/Card';


interface HomeProps {
  searchParams: ListingsParams
};


const Home = async ({ searchParams }: HomeProps) => {
  const user = await getCurrentUser();
  const listings = await getListings(searchParams);

  return (
    <div>
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
