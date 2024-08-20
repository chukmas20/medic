import { getPatientAppointments } from '@/actions/appointments'
import { cn } from '@/lib/utils'
import { timeAgo } from '@/utils/timeAgo'
import { Calendar, CalendarCheck2, Check, CircleEllipsis, History, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async({
   params:{id},
  }:{params:{id:string}}
) => {
  const appointments = (await getPatientAppointments(id)).data || []
  return (
    <div className='p-4'>
        <h2 className='border-b pb-3 mb-3 '>Appointments ({appointments.length.toString().padStart(2,"0")})</h2>
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
           {appointments.map((item)=>{
             return(
              <Link key={item.id}  href={`/dashboard/doctor/appointments/view/${item.id}`}
              className={cn("border border-gray-300 rounded-md   bg-white shadow-sm text-sm w-full dark:text-yellow-500 inline-block py-3 px-2",
               )}
              >
                <div  className="flex justify-between items-center pb-2 text-sm ">
                   <h2>{item.firstName} - {item.lastName}</h2>
                   <span>{item.appointmentTime}</span>
                </div>
                <div className="flex items-center gap-4 justify-center border-b">
                    <div className="flex items-center justify-center ">
                    <CalendarCheck2 className="mr-2 w-4 h-4" />
                     <span className="text-sm"> {item.appointmentFormattedDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                    <History className="w-4 h-4 mr-2"/>
                     <span className="text-sm"> {timeAgo(item.createdAt)}</span>
                    </div>
                </div>
                <div className={cn("flex items-center pt-2 text-red-600", 
                  item.status === "approved"&&"text-green-600 font-semibold")}>
                   {item.status === "pending" ? (
                       <CircleEllipsis className="mr-2 w-4 h-4"/>
                   ):(
                     item.status === "approved"?(
                       <Check className="mr-2 w-4 h-4"/>
                     ):(
                      <X className="mr-2 w-4 h-4"/>
                     )
                   )}
                   <span>{item.status}</span>
                </div>
            </Link>
             )
           })}
        </div>
    </div>
  )
}

export default page