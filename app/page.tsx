import Image from 'next/image'
import { getCurrentUser } from './actions/getCurrentUser'

export default async function Home() {
  const user = await getCurrentUser();
  return (
    <main className="">
      Hello, {user?.name}
    </main>
  )
}
