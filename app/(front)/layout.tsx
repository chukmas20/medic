import Footer from '@/components/frontend/Footer'
import MegaMenu from '@/components/frontend/MegaMenu'
import Navbar from '@/components/frontend/Navbar'
import { SiteHeader } from '@/components/site-header'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Layout ({children}:{children:React.ReactNode}) {
  const session = await  getServerSession(authOptions)

  return (
    <div> 
       <SiteHeader session={session} />
        <div>
          {children}
        </div>
        <Footer  />
     </div>
  )
}
