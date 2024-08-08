import { getAppointments, getPatientAppointments, } from '@/actions/appointments'
import HomeDisplayCard from '@/components/dashboard/Doctor/HomeDisplayCard'
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
          <div className='col-span-8'>
              <HomeDisplayCard  count={appointments.length}  />
            </div>
        
    </div>
  )
}

export default page