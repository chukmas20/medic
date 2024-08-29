import {   getPatientAppointments } from '@/actions/appointments'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import {  User } from 'lucide-react'
import React, { ReactNode } from 'react'
import NotAuthorized from '@/components/NotAuthorized'
import DoctorPanel from '@/components/dashboard/Doctor/DoctorPanel'

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
  doctorName: string;
  
}

const PatientLayout = async({
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
  const uniquePatientsMap = new Map();

appointments.forEach((app)=>{
   if(!uniquePatientsMap.has(app.doctorId)){
     uniquePatientsMap.set(app.doctorId, {
      doctorId:app.doctorId,
      doctorName: app.doctorName??"Name not found",
   })
  }
})

const doctors = Array.from(uniquePatientsMap.values()) as DoctorProps[]
  return (
    <div>
    {/* Header */}
    <PanelHeader title="Doctors" count={(doctors.length ?? 0).toString()} icon={User} />
    {/* 2 panels */}
    <div className='grid grid-cols-12 gap-2'>
       <div className='col-span-12 md:col-span-4'>
         <DoctorPanel doctors={doctors} role={user?.role} />
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