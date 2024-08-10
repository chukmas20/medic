"use client"
import { PatientProps } from "@/app/(back)/dashboard/doctor/patients/layout"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import {  UserRole } from "@prisma/client"
import {  Check,  Mail,  MapPin, User, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
 
// const tags = Array.from({ length: 50 },(_, i)=>({
//     id:i + 1,
//     name: `name-${i+1}`,
// }))


const PatientPanel=({
    patients,
     role
    }: {
      patients:PatientProps[];
      role: UserRole
  }) => {
   const pathname = usePathname()
  return (
    <div className="p-6 ">
      <ScrollArea className="h-96  px-4 py-6 rounded-md w-full border bg-yellow-100 ">
        {patients.map((item) => (
            <Link key={item.patientId}  href={`/dashboard/doctor/patients/view/${item.patientId}`}
              className={cn("border border-gray-300 rounded-md   bg-white shadow-sm text-sm w-full dark:text-yellow-500 inline-block py-3 px-2",
                pathname === `/dashboard/doctor/patients/view/${item.patientId}` && "border-green-700 border-2 bg-green-100")}
              >
                <div  className="flex justify-between items-center pb-2 text-xs ">
                   <h2>{item.name} </h2>
                 <div className="flex items-center gap-4 justify-center border-b">
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1"/>
                     <span className="text-sm"> {item.location}</span>
                  </div>
                    <span className="text-sm"> {item.phone}</span>
                </div>
                </div>
                <div className={cn("flex items-center pt-2 text-red-600", 
                )}
                >
                   <Mail className="mr-2 w-4 h-4" />
                      <span>{item.email}</span>
                </div>
                 <div className="flex items-center justify-start">
                 <User className="mr-2 w-4 h-4" />
                 <span>{item.gender}</span>
                 </div>
                
            </Link>
        ))}
         </ScrollArea>
    </div>
    
  )
}

export default PatientPanel