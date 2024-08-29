import { Session } from "next-auth"
import AnalyticsCard from "../AnalyticsCard"
import { getDoctorAnalytics } from "@/actions/stats";
import { getDoctorAppointments } from "@/actions/appointments";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Calendar } from "lucide-react";
import { timeAgo } from "@/utils/timeAgo";
import { PatientProps } from "@/app/(back)/dashboard/doctors/layout";
import { generateInitials } from "@/utils/genrateInitials";


const DoctorDashboard = async ({session}:{session:Session | null}) => {
  const user = session?.user;
  const analytics = await getDoctorAnalytics() || []
  const appointments = (await getDoctorAppointments(user?.id??"")).data || []
  const uniquePatientsMap = new Map();

appointments.forEach((app)=>{
   if(!uniquePatientsMap.has(app.patientId)){
     uniquePatientsMap.set(app.patientId, {
       patientId:app.patientId,
      name: `${app.firstName} ${app.lastName}`,
      email: app.email,
      phone: app.phone,
      location: app.location,
      gender: app.gender,
      occupation: app.occupation,
      dob: app.dob
   })
  }
})

const patients = Array.from(uniquePatientsMap.values()) as PatientProps[]

console.log(patients)

  return (
    <div className="p-8 py-4">
        <p className='bg-yellow-500 text-white mb-2  px-2 flex rounded-md shadow-md w-20'>
             {user?.role}
         </p>
       <h1 className='text-2xl'>Hello, Dr. {user?.name}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
         {analytics.map((item,i)=>{
           return(
            <AnalyticsCard  key={i} data={item}/>
           )
         })}
       </div>
       <div className="grid gap-4 md:gap-8 lg:grid-cols-2 grid-cols-1 mt-10">
      <Card x-chunk="dashboard-01-chunk-5">
        <CardHeader>
           <div className="flex items-center justify-between">
             <CardTitle>Recent Appointments</CardTitle>
             <Button asChild className="bg-yellow-500 hover:bg-yellow-600 ">
                <Link href="/dashboard/doctor/appointments"> View All</Link>
             </Button>
           </div>
        </CardHeader>
        <CardContent className="grid gap-8">
          {
            appointments && appointments.slice(0,5).map((appointment)=>{
              return(
                <Link href={`dashboard/doctor/appointments/view/${appointment.id}`} key={appointment.id} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarFallback><Calendar className="h-4 w-4"/></AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                <p className="text-xs font-medium leading-none">
                     {appointment?.firstName} - {appointment.lastName}
                  </p>
                  <p className="text-xs font-medium leading-none">
                     {appointment?.email}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {appointment?.appointmentDate?.toDateString()}, {appointment?.appointmentTime}
                  </p>
                </div>
                <div className="ml-auto font-medium text-xs">
                    {appointment?.status}
                </div>
                <div className="ml-auto font-medium text-xs">
                    {/* {appointment?.createdAt?.toDateString()} */}
                    {timeAgo(appointment?.createdAt)}
                </div>
              </Link>
              
              )
            })
          }
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-5">
        <CardHeader>
           <div className="flex items-center justify-between">
             <CardTitle>Recent Patients</CardTitle>
             <Button asChild className="bg-yellow-500 hover:bg-yellow-600 ">
                <Link href="/dashboard/doctor/patients"> View All</Link>
             </Button>
           </div>
        </CardHeader>
        <CardContent className="grid gap-8">
          {
            patients && patients.slice(0,9).map((patient)=>{
              const initials = generateInitials(patient?.name)
              return(
                <Link href={`/dashboard/doctor/patients/view/${patient?.patientId}`} key={patient?.patientId} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-xs font-medium leading-none">
                     {patient?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {patient?.email}
                  </p>
                </div>
                <div className="ml-auto text-xs font-medium">
                    {patient.phone}
                </div>
                <div className="ml-auto text-xs font-medium">
                    {patient.location}
                </div>
              </Link>
              
              )
            })
          }
        </CardContent> 
        </Card> 
    </div>
    </div>
  )
}

export default DoctorDashboard