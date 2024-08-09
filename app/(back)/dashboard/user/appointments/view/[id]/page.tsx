import { getAppointmentById } from '@/actions/appointments'
import UpdateAppointmentForm from '@/components/dashboard/Doctor/UpdateAppointmentForm'
import { Button } from '@/components/ui/button'
import { Calendar, Mail, Phone, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async({
   params:{id},
  }:{params:{id:string}}
) => {
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
       {appointment?.status === "approved" ? (
           <div className='p-4 border shadow rounded-md  my-4' >
           <div className="sm:col-span-4">
           <div className="flex items-center justify-between p-2">
             <h2 className='text-md font-semibold mb-3'> Appointment Approved </h2>
               <Button className='bg-yellow-500 hover:bg-yellow-500'>
                 {`${appointment?.appointmentFormattedDate} at ${appointment?.appointmentTime}`}
               </Button>
             </div> 
           </div>
           <div className='py-4 space-y-4'>
            <div className='flex items-center justify-between text-sm'>
               <h2 className='font-semibold uppercase'> {appointment?.meetingProvider} </h2> 
                <Button asChild variant={'outline'}>
                  <Link href={appointment?.meetingLink??"#"}>
                  <Video className='mr-2 w-4 h-4'  />
                   <span>Join meeting</span>
                 </Link>
                </Button>
          </div>
          <div className='flex items-center justify-between text-sm'>
               <h2 className='font-semibold uppercase'>
                 Communicate
                </h2> 
                <div className='flex space-x-3'>
                <Button asChild variant={'outline'}>
                  <Link href={appointment?.meetingLink??"#"}>
                  <Phone className='mr-2 w-4 h-4'  />
                   <span>Call Doctor</span>
                 </Link>
                </Button>
                <Button asChild variant={'outline'}>
                  <Link href={appointment?.meetingLink??"#"}>
                  <Mail className='mr-2 w-4 h-4'  />
                   <span>Mail Doctor</span>
                 </Link>
                </Button>
                </div>
          </div>    
          </div>
         </div>
       ):(
        <div className='p-4 border shadow rounded-md  my-4' >
        <div className="sm:col-span-4">
        <div className="flex items-center justify-between p-2">
          <h2 className='text-1xl font-semibold mb-3'> Appointment Status </h2>
            <Button className='bg-yellow-500 hover:bg-yellow-500'>
               {appointment?.status}
            </Button>
          </div> 
        </div>  
      </div>
       )}
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