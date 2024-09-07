import { getAppointments } from '@/actions/appointments';
import React from 'react';
import { PatientProps } from "@/app/(back)/dashboard/doctor/patients/layout"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { generateInitials } from '@/utils/genrateInitials';
import { User, User2 } from 'lucide-react';


const page = async() => {
  const appointments = (await getAppointments()).data || []
  const uniquePatientsMap = new Map();

appointments.forEach((app)=>{
   if(!uniquePatientsMap.has(app.patientId)){
     uniquePatientsMap.set(app.patientId,{
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

  return (
    <div className="">
        <div className='border-b flex gap-2'>
        <User2  />
         <h2 className="scroll-m-20 text-yellow-600  pb-2  text-1xl font-semibold tracking-tight first:mt-0">
            Patients
         </h2>
         <span className='rounded'>
           {patients.length.toString().padStart(2,"0")}
         </span>
        </div>
        <div   className='grid md:grid-cols-3 grid-cols-1 p-3 gap-4'>
        {patients && patients.map((pat)=>{
           return(
                  <div  key={pat.patientId} className='border-solid border-2  border-r-2 p-1 '>
                    <div className=' text-xs'>
                     <div className='flex items-center justify-between '> 
                        {pat.name} {" "} 
                         {pat.phone}
                         <User2 className='h-4 w-4' />
                     </div> 
                      <p>{pat.email}</p>
                   </div>
                    <div className='flex items-center text-xs font-semibold justify-between'>
                        <p> Patient No:</p>
                        <p className='mr-2'>{pat.location}</p>
                    </div>
                    <p className='text-xs text-green-600 font-semibold'> ₦ {pat.gender}</p>
                    <p className='text-xs  font-semibold'> {pat.occupation}</p>

                  </div>
           )
        })}
        </div>
    </div>
  )
}

export default page