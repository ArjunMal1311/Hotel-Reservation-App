import React from 'react'
import { getCurrentUser } from '../actions/getCurrentUser'
import Button from '../components/Button'
import Link from 'next/link'
import getReservations from '../actions/getReservations'
import Trips from '../components/Trips'

const page = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className='m-6'>
        <h2 className='text-4xl purple_gradient font-bold mb-8'>Login to view your trips!</h2>
        <Link href="/login" className='mt-8 border-2 p-4 rounded-lg'>Login</Link>
      </div>
    )
  }

  const reservations = await getReservations({ userId: user.id });

  return (
    <>
      {reservations.length === 0 ? <div className='m-6'>
        <h2 className='text-4xl purple_gradient font-bold mb-8'>No trips found!</h2>
        <Link href="/" className='mt-8 border-2 p-4 rounded-lg'>Book a property</Link>
      </div> : <div className='m-3'>
        <Trips reservations={reservations} currentUser={user} />
      </div>}
    </>
  )
}

export default page