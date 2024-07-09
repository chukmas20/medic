import HomeDisplayCard from '@/components/dashboard/Doctor/HomeDisplayCard'
import ListPanel from '@/components/dashboard/Doctor/ListPanel'
import NewButton from '@/components/dashboard/Doctor/NewButton'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import { Calendar } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div>
         {/* Header */}
         {/* 2 panels */}
         <div className='grid grid-cols-12'>
            <div className='col-span-4'>
            <PanelHeader title='Appointments' count={(10).toString().padStart(2,"0")} icon={Calendar}/>
              <ListPanel  />
            </div>
            <div className='col-span-8'>
            <div className='py-3 px-6 border-b border-gray-200 flex items-center justify-end' >
        <div className='flex items-center gap-1'>
          <NewButton title='New Appointment'  href='#'/>
        </div>
       </div>
        <div className=''>
            <h2>Patient Details Page</h2>
        </div>
        </div>
        </div> 
    </div>
  )
}

export default page