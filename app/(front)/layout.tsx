import MegaMenu from '@/components/frontend/MegaMenu'
import Navbar from '@/components/frontend/Navbar'
import React from 'react'

export default function Layout ({children}:{children:React.ReactNode}) {
  return (
    <div> 
       <Navbar />
       <div className="max-w-5xl mx-auto py-2 fixed top-20 left-3 z-50">
           {/* <MegaMenu  /> */}
         </div>
        <div className='mt-[85px]'>
          {children}
        </div>
     </div>
  )
}
