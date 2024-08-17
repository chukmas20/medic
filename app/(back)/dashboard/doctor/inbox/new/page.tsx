import { getDoctorAppointments } from '@/actions/appointments'
import InboxForm from '@/components/dashboard/InboxForm'
import NotAuthorized from '@/components/NotAuthorized'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import { PatientProps } from '../../patients/layout'

const page = async() => {
  const session = await getServerSession(authOptions)
  const user = session?.user

  if(user?.role !== "DOCTOR"){
     return(
       <NotAuthorized  />
     )
  }

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
const users = patients.map((patient)=>{
  return{
    label:patient.name,
    value:patient.patientId
  }
})

console.log(patients)
  return (
    <div>
       <InboxForm users={users} title='New Message' session={session}  />
    </div>
  )
}

export default page