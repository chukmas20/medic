import { getAppointments, getPatientAppointments, } from '@/actions/appointments'
import HomeDisplayCard from '@/components/dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/dashboard/Doctor/NewButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import React from 'react'

const page = async() => {
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
          <div className='py-2 border-b border-gray-200 flex items-center justify-end px-4'>
            <div className='flex items-center gap-4'>
              <NewButton title='New Appointment'  href='/dashboard/user/appointments/new'/>
            </div>
          </div>
          <div className='col-span-8'>
              <HomeDisplayCard  newAppointmentLink='/dashboard/user/appointments/new' count={appointments.length}  />
            </div>
    </div>
  )
}

export default page