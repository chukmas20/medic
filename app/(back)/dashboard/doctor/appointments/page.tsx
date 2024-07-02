import HomeDisplayCard from '@/components/dashboard/Doctor/HomeDisplayCard'
import ListPanel from '@/components/dashboard/Doctor/ListPanel'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import React from 'react'

const page = () => {
  return (
    <div>
         {/* Header */}
         <PanelHeader  />
         {/* 2 panels */}
         <div className='grid grid-cols-12'>
            <div className='col-span-4'>
              <ListPanel  />
            </div>
            <div className='col-span-8'>
              <HomeDisplayCard  />
            </div>
         </div>
        
    </div>
  )
}

export default page