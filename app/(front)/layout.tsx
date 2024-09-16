import Footer from '@/components/frontend/Footer'

import { SiteHeader } from '@/components/site-header'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
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
