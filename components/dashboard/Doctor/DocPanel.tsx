"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { DoctorDetail } from "@/types/type"
import { generateInitials } from "@/utils/genrateInitials"
import {  UserRole } from "@prisma/client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import ApproveBtn from "../ApproveBtn"
 
// const tags = Array.from({ length: 50 },(_, i)=>({
//     id:i + 1,
//     name: `name-${i+1}`,
// }))


const DocPanel=({
     doctors,
     role
    }:{
      doctors:DoctorDetail[] | any;
      role: UserRole
  }) => {
   const pathname = usePathname()
  return (
    <div className="p-6 ">
      <ScrollArea className="h-96  py-4 px-2 rounded-md w-full grid gap-4 border bg-yellow-100 ">
     {
         doctors && doctors.map((doctor : any)=>{
            const initials = generateInitials(doctor.name)
            const status = doctor?.doctorProfile?.status??"PENDING"
            return(
              <Link href={`/dashboard/doctors/view/${doctor.id}`} key={doctor.id} className="flex items-center gap-4 w-full mb-6">
              <Avatar className="hidden h-6 w-6 sm:flex">
                <AvatarImage src={doctor.doctorProfile?.profilePicture??""} alt="Avatar" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-xs font-medium leading-none">
                   {doctor.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {doctor.email}
                </p>
              </div>
              <div className="ml-auto font-medium text-xs">
                <ApproveBtn  status={doctor?.doctorProfile?.status ?? "PENDING"}
                    profileId ={doctor?.doctorProfile?.id ??""}  />
              </div>
            </Link>
            
            )
          })
     }
         </ScrollArea>
    </div>
    
  )
}

export default DocPanel