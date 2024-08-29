import {  getDoctorAppointments } from '@/actions/appointments'
import HomeDisplayCard from '@/components/dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/dashboard/Doctor/NewButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import React from 'react'
import { getDoctors } from '@/actions/users'

const page = async() => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if(user?.role !== "ADMIN"){
     return(
       <NotAuthorized  />
     )
  }

  const doctors = await getDoctors() || [];

  return (
    <div>
         <div className='py-2  flex items-center justify-end px-4'>
            {/* <div className='flex items-center gap-4'>
              <NewButton title='New Doctor'
                href={"#"}
              />
            </div> */}
          </div>
          <div className='col-span-8'>
              <HomeDisplayCard
               newAppointmentLink={'#'} 
               count={doctors.length}
               title='Doctors' 
                />
           </div>
        
    </div>
  )
}

export default page