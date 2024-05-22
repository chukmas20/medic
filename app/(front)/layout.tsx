import MegaMenu from '@/components/frontend/MegaMenu'
import Navbar from '@/components/frontend/Navbar'
import React from 'react'

export default function Layout ({children}:{children:React.ReactNode}) {
  return (
    <div> 
       <Navbar />
       <div className="max-w-5xl mx-auto py-3">
           <MegaMenu  />
         </div>
        {children}
     </div>
  )
}
