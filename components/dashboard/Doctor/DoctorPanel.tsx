"use client"
import { DoctorProps } from "@/app/(back)/dashboard/user/doctors/layout"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import generateSlug from "@/utils/generateSlug"
import {  UserRole } from "@prisma/client"
import {  Check,  Mail,  MapPin, User, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
 
// const tags = Array.from({ length: 50 },(_, i)=>({
//     id:i + 1,
//     name: `name-${i+1}`,
// }))


const DoctorPanel=({
    doctors,
     role
    }: {
      doctors: DoctorProps[];
      role: UserRole
  }) => {
   const pathname = usePathname()
  return (
    <div className="p-6 ">
      <ScrollArea className="h-96  px-4 py-6 rounded-md w-full border bg-yellow-100 ">
        {doctors.map((item, i) =>{
           const slug = generateSlug(item.doctorName)
           return(
            <Link
             key={item.doctorId} 
             href={`/doctors/${slug}?id=${item.doctorId}`}
            className={cn(
               "border border-gray-300 rounded-md   bg-white shadow-sm text-sm w-full dark:text-yellow-500 inline-block py-3 px-2",
              pathname === `/dashboard/doctor/patients/view/${item.doctorId}` && "border-green-700 border-2 bg-green-100")}
            >
              <div  className="flex justify-between items-center pb-2 text-xs ">
                 <h2>{item.doctorName} </h2>
              </div> 
          </Link>
           )
        })}
         </ScrollArea>
    </div>
    
  )
}

export default DoctorPanel