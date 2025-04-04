"use client"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { timeAgo } from "@/utils/timeAgo"
import { Appointment, UserRole } from "@prisma/client"
import {  CalendarCheck2, Check, CircleEllipsis, Dot, History, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
 
// const tags = Array.from({ length: 50 },(_, i)=>({
//     id:i + 1,
//     name: `name-${i+1}`,
// }))


const ListPanel = ({
    appointments,
     role
    }: {
      appointments:Appointment[];
      role: UserRole
  }) => {
   const pathname = usePathname()
  return (
    <div className="p-6 ">
       <ScrollArea className="h-96 px-4 py-6 rounded-md w-full border bg-yellow-100 ">
        {appointments.map((item) => (
            <Link key={item.id}  href={`/dashboard/${role==="USER"?"user":"doctor"}/appointments/view/${item.id}`}
              className={cn("border border-gray-300 rounded-md   bg-white shadow-sm text-sm w-full dark:text-yellow-500 inline-block py-3 px-2",
                pathname === `/dashboard/doctor/appointments/view/${item.id}` && "border-green-700 border-2 bg-green-100")}
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
        ))}
         </ScrollArea>
    </div>
    
  )
}

export default ListPanel