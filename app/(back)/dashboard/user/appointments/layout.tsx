import {  getPatientAppointments } from '@/actions/appointments'
import ListPanel from '@/components/dashboard/Doctor/ListPanel'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { Calendar } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React, { ReactNode } from 'react'

const layout = async({
    children
  }:{children:ReactNode}
 ) => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if(user?.role !== "USER"){
     return(
       <NotAuthorized  />
     )
  }
  const appointments = (await getPatientAppointments(user?.id)).data || []
  return (
    <div>
    {/* Header */}
    <PanelHeader title="Appointments" count={(appointments.length ?? 0).toString()} icon={Calendar} />
    {/* 2 panels */}
    <div className='grid grid-cols-12 gap-2'>
       <div className='col-span-12 sm:col-span-4'>
         <ListPanel appointments={appointments} role={user?.role} />
       </div>
       <div className='col-span-12 sm:col-span-8 '>
          {
            children
          }
       </div>
    </div>
   
</div>
  )
}

export default layout