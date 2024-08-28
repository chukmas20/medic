import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  Bell,
  CreditCard,
  DollarSign,
  LayoutGrid,
  Stethoscope,
  User,
  Users,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { getAdminAnalytics,} from "@/actions/stats"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import AnalyticsCard from "../AnalyticsCard"
import { getDoctors } from "@/actions/users"
import { generateInitials } from "@/utils/genrateInitials"
import ApproveBtn from "./ApproveBtn"

export default async function DashBoard() {
  const analytics = await getAdminAnalytics()
  const session = await getServerSession(authOptions)
  const user = session?.user
  const doctors = await getDoctors() || []

  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
   
       <h1 className='text-2xl'>Hello, {user?.name}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
         {analytics.map((item,i)=>{
           return(
            <AnalyticsCard  key={i} data={item}/>
           )
         })}
       </div>
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 grid-cols-1">
      <Card x-chunk="dashboard-01-chunk-5">
        <CardHeader>
           <div className="flex items-center justify-between">
             <CardTitle>Recent Doctors</CardTitle>
             <Button asChild>
                <Link href="/dashboard/doctors"> View All</Link>
             </Button>
           </div>
        </CardHeader>
        <CardContent className="grid gap-8">
          {
            doctors && doctors.slice(0,5).map((doctor)=>{
              const initials = generateInitials(doctor.name)
              return(
                <div key={doctor.id} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={doctor.doctorProfile?.profilePicture??""} alt="Avatar" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                     {doctor.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {doctor.email}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <ApproveBtn 
                    status={doctor?.doctorProfile?.status ?? "PENDING"}
                    profileId ={doctor?.doctorProfile?.id ??""}
                  />
                </div>
              </div>
              
              )
            })
          }
        </CardContent>
      </Card>
        
    </div>
  </main>     
  )
}
