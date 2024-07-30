import { getAppointments } from '@/actions/appointments'
import HomeDisplayCard from '@/components/dashboard/Doctor/HomeDisplayCard'
import ListPanel from '@/components/dashboard/Doctor/ListPanel'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import { Calendar } from 'lucide-react'
import React, { ReactNode } from 'react'

const layout = async({
    children
  }:{children:ReactNode}
 ) => {
    const appointments = (await getAppointments()).data || []
  return (
    <div>
    {/* Header */}
    <PanelHeader title="Appointments" count={(appointments.length ?? 0).toString()} icon={Calendar} />
    {/* 2 panels */}
    <div className='grid grid-cols-12'>
       <div className='col-span-4 space-x-4'>
         <ListPanel appointments={appointments} />
       </div>
       <div className='col-span-8'>
          {
            children
          }
       </div>
    </div>
   
</div>
  )
}

export default layout