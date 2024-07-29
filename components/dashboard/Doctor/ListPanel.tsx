import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { timeAgo } from "@/utils/timeAgo"
import { Appointment } from "@prisma/client"
import { Briefcase, CalendarCheck2, Dot, History } from "lucide-react"
import Link from "next/link"
 
const tags = Array.from({ length: 50 },(_, i)=>({
    id:i + 1,
    name: `name-${i+1}`,
}))


const ListPanel = ({appointments}: {appointments:Appointment[]}) => {
  return (
    <div className="p-6 ">
         <ScrollArea className="h-96 px-4 py-6 rounded-md w-full border bg-yellow-100 ">
        {appointments.map((item) => (
          <>
            <Link key={item.id}  href="/dashboard/doctor/appointments/view/1" className="border rounded-md  border-yellow-600 bg-white shadow-sm text-sm w-full dark:text-yellow-500 inline-block py-3 px-2">
                <div  className="flex justify-between items-center pb-2 ">
                   <h2>{item.firstName} - {item.lastName}</h2>
                   <span>{item.appointmentTime}</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center text-sm">
                    <CalendarCheck2 className="mr-2 w-4 h-4" />
                     <span> {item.appointmentFormattedDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                    <History className="w-4 h-4 mr-2"/>
                     <span> {timeAgo(item.createdAt)}</span>
                    </div>
                </div>
            </Link>
          </>
        ))}
         </ScrollArea>
    </div>
    
  )
}

export default ListPanel