import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import {  Stethoscope, User } from 'lucide-react'
import React, { ReactNode } from 'react'
import NotAuthorized from '@/components/NotAuthorized'
import { getDoctors } from '@/actions/users'
import DocPanel from '@/components/dashboard/Doctor/DocPanel'

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

  if(user?.role !== "ADMIN"){
     return(
       <NotAuthorized  />
     )
  }
  const doctors = await getDoctors() || [];

  return (
    <div>
    {/* Header */}
    <PanelHeader title="Doctors"
      count={(doctors.length ?? 0).toString()}
      icon={Stethoscope} 
      />
    {/* 2 panels */}
    <div className='grid grid-cols-12'>
       <div className='col-span-5 space-x-4'>
         <DocPanel doctors={doctors} role={user?.role} />
       </div>
       <div className='col-span-7'>
          {
            children
          }
       </div>
    </div>
   
</div>
  )
}

export default PatientLayout