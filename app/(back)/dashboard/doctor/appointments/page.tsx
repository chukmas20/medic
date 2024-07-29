import { getAppointments } from '@/actions/appointments'
import HomeDisplayCard from '@/components/dashboard/Doctor/HomeDisplayCard'
import ListPanel from '@/components/dashboard/Doctor/ListPanel'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import { Calendar } from 'lucide-react'
import React from 'react'

const page = async() => {
  const appointments = (await getAppointments()).data || []
  return (
    <div>
         {/* Header */}
         <PanelHeader title="Appointments" count={(10).toString()} icon={Calendar} />
         {/* 2 panels */}
         <div className='grid grid-cols-12'>
            <div className='col-span-4'>
              <ListPanel appointments={appointments} />
            </div>
            <div className='col-span-8'>
              <HomeDisplayCard   />
            </div>
         </div>
        
    </div>
  )
}

export default page