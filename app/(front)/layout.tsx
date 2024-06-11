import Footer from '@/components/frontend/Footer'
import MegaMenu from '@/components/frontend/MegaMenu'
import Navbar from '@/components/frontend/Navbar'
import { SiteHeader } from '@/components/site-header'
import React from 'react'

export default function Layout ({children}:{children:React.ReactNode}) {
  return (
    <div> 
       <SiteHeader />
        <div>
          {children}
        </div>
        <Footer  />
     </div>
  )
}
