import Navbar from '@/components/dashboard/Navbar'
import SideBar from '@/components/dashboard/SideBar'
import React, { ReactNode } from 'react'

export default function Layout({children}:{children : React.ReactNode}) {
  return (
    <div>
        <Navbar  />
        <div className='flex'>
          <SideBar  />
          <div className="p-8">
            {children}
          </div>
        </div>    
    </div>
  )
}
