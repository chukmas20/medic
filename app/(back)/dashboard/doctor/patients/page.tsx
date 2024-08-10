import {  getDoctorAppointments } from '@/actions/appointments'
import HomeDisplayCard from '@/components/dashboard/Doctor/HomeDisplayCard'
import NewButton from '@/components/dashboard/Doctor/NewButton'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

import React from 'react'
import { PatientProps } from './layout'
import generateSlug from '@/utils/generateSlug'

const page = async() => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if(user?.role !== "DOCTOR"){
     return(
       <NotAuthorized  />
     )
  }

  const slug = generateSlug(user?.name??"")
  const appointments = (await getDoctorAppointments(user?.id)).data || []
  const uniquePatientsMap = new Map();

appointments.forEach((app)=>{
   if(!uniquePatientsMap.has(app.patientId)){
     uniquePatientsMap.set(app.patientId, {
       patientId:app.patientId,
      name: `${app.firstName} ${app.lastName}`,
      email: app.email,
      phone: app.phone,
      location: app.location,
      gender: app.gender,
      occupation: app.occupation,
      dob: app.dob
   })
  }
})

const patients = Array.from(uniquePatientsMap.values()) as PatientProps[]

console.log(patients)
  return (
    <div>
         <div className='py-2 border-b border-gray-200 flex items-center justify-end px-4'>
            <div className='flex items-center gap-4'>
              <NewButton title='New Patient'
                href={`/doctors/${slug}`}
              />
            </div>
          </div>
          <div className='col-span-8'>
              <HomeDisplayCard
               newAppointmentLink={`/doctors/${slug}`} 
               count={patients.length}
               title='Patient' 
                />
           </div>
        
    </div>
  )
}

export default page