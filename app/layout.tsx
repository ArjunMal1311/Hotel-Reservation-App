import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/navbar/Navbar'
import { getCurrentUser } from './actions/getCurrentUser'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WanderStay',
  description: 'WanderStay: Where Every Journey Finds Its Restful Haven',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
