import {  getDoctorAppointments } from '@/actions/appointments'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import {  User } from 'lucide-react'
import React, { ReactNode } from 'react'
import NotAuthorized from '@/components/NotAuthorized'
import PatientPanel from '@/components/dashboard/Doctor/PatientPanel'

export interface PatientProps {
  patientId: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  gender: string;
  occupation: string;
  dob: string;
}

export interface DoctorProps {
  doctorId: string;
  doctorName:string;
  
}

const PatientLayout = async({
    children
  }:{children:ReactNode}
 ) => {
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

console.log(patients)
  return (
    <div>
    {/* Header */}
    <PanelHeader title="Patients" count={(patients.length ?? 0).toString()} icon={User} />
    {/* 2 panels */}
    <div className='grid grid-cols-12 gap-4'>
       <div className='col-span-12 md:col-span-4 '>
         <PatientPanel patients={patients} role={user?.role} />
       </div>
       <div className='col-span-12 md:col-span-8'>
          {
            children
          }
       </div>
    </div>
</div>
  )
}

export default PatientLayout