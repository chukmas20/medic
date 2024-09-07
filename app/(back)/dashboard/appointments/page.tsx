import { getAppointments } from '@/actions/appointments';
import React from 'react';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateInitials } from '@/utils/genrateInitials';
import { AppointmentProps } from '@/types/type';
import { cn } from '@/lib/utils';
import { AlarmClock, Calendar } from 'lucide-react';



const page = async() => {
  const appointments = (await getAppointments()).data || []
  console.log(appointments)
  console.log(appointments.length)
  // const uniquePatientsMap = new Map();

// appointments.forEach((app)=>{
//    if(!uniquePatientsMap.has(app.patientId)){
//      uniquePatientsMap.set(app.patientId,{
//        patientId:app.patientId,
//       name: `${app.firstName} ${app.lastName}`,
//       email: app.email,
//       phone: app.phone,
//       location: app.location,
//       gender: app.gender,
//       occupation: app.occupation,
//       dob: app.dob,
      
//    })
//   }
// })

// const appoints = Array.from(uniquePatientsMap.values()) as AppointmentProps[]

  return (
    <div className="">
        <div className='border-b flex gap-2'>
        <AlarmClock  />
         <h2 className="scroll-m-20 text-yellow-600  pb-2  text-1xl font-semibold tracking-tight first:mt-0">
            Appointments
         </h2>
         <span className='rounded'>
           {appointments.length.toString().padStart(2,"0")}
         </span>
        </div>
        <div   className='grid md:grid-cols-3 grid-cols-1 p-3 gap-4'>
        {appointments && appointments.map((appoint)=>{
           return(
                  <div  key={appoint.id} className='border-solid border-2  border-r-2 p-1 '>
                    <div className=' text-xs'>
                     <div className='flex items-center justify-between '> 
                       Dr {appoint.doctorName} {" "} 
                         {appoint.appointmentFormattedDate}
                         <AlarmClock className='h-4 w-4' />
                     </div> 
                      <p>{appoint.email}</p>
                   </div>
                    <div className='flex items-center text-xs font-semibold justify-between'>
                        <p> Patient No:</p>
                        <p className='mr-2'>{appoint.phone}</p>
                    </div>
                    <p className='text-xs text-green-600 font-semibold'> ₦ {appoint.charge}</p>
                    <p className='text-xs  font-semibold'> {appoint.status}</p>

                  </div>
           )
        })}
        </div>
    </div>
  )
}

export default page