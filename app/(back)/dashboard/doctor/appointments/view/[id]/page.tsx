import { getAppointmentById } from '@/actions/appointments'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async({params:{id}}:{params:{id:string}}) => {
  const appointment = await getAppointmentById(id)
  return (
    <div>
       <div className='flex items-center justify-between px-4 py-4'>
           <div className=''>
           <h2 className='text-2xl font-bold border border-y-1 px-2 py-2'>
               {appointment?.firstName} --
               {appointment?.lastName}
              </h2>
              <div className='flex  items-center space-x-4 divide-x-2 text-sm'>
              <p className='px-2'>{appointment?.gender}</p>
              <p className='px-2'>{appointment?.phone}</p>
              </div>
             
           </div>
           <div className=''>
              <h2 className='text-2xl font-bold border border-y-1 px-2 py-2'>
                {appointment?.appointmentFormattedDate}
              </h2>
              <div className='flex mt-2 items-center justify-center font-semibold'>
                 <Calendar  className='mr-2 w-4 h-4'/>
                 <span className=''>{appointment?.appointmentTime}</span>
              </div>
           </div>
       </div>
       <div className='py-4'>
           <div className='flex divide-x-2 divide-gray-200 px-4 py-3 border-b'>
               <p className='px-3 text-sm font-semibold'> Consultation Reason</p>
               <p className='px-3'>{appointment?.appointmentReason}</p>
           </div>
           <div className='flex divide-x-2 divide-gray-200 px-4 py-3 border-b'>
               <p className='px-3 text-sm font-semibold'> Date of Birth</p>
               <p className='px-3'>{appointment?.dob?.toISOString().split("T")[0]}</p>
           </div>
           <div className='flex divide-x-2 divide-gray-200 px-4 py-3 border-b'>
               <p className='px-3 text-sm font-semibold'> Email</p>
               <p className='px-3'>{appointment?.email}</p>
           </div>
           <div className='flex divide-x-2 divide-gray-200 px-4 py-3 border-b'>
               <p className='px-3 text-sm font-semibold'> Location</p>
               <p className='px-3'>{appointment?.location}</p>
           </div>
           <div className='flex divide-x-2 divide-gray-200 px-4 py-3 border-b'>
               <p className='px-3 text-sm font-semibold'> Medical Docs</p>
               <div className='grid grid-cols-4'>
               {appointment?.medicalDocuments.map((item,i)=>{
                 return(
                  <Button key={i} variant={'outline'} asChild>
                     <Link target='_blank' href={item} download>
                       {`Doc-${i+1}`}
                     </Link>
                  </Button>
                 )
               })}

               </div>
           </div>
       </div>
    </div>
  )
}

export default page