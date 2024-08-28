import { getDoctorAppointments } from '@/actions/appointments'
import { getDoctorById } from '@/actions/users'
import { cn } from '@/lib/utils'
import { timeAgo } from '@/utils/timeAgo'
import { Calendar, CalendarCheck2, Check, CircleEllipsis, History, X } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApproveBtn from '@/components/dashboard/ApproveBtn'
import { getDoctorProfileById } from '@/actions/onboarding'


const page = async({
   params:{id},
  }:{params:{id:string}}
) => {
  const appointments = (await getDoctorAppointments(id)).data || []
  const doctor = (await getDoctorById(id));
  const doctorProfile = await getDoctorProfileById(id)
  const status = doctor?.doctorProfile?.status??"PENDING"
  const dob = doctor?.doctorProfile?.dob;
  const expiry = await doctor?.doctorProfile?.medicalLicenseExpiry;
  return (
    <div className='p-4'>
        <div className='flex items-center justify-between'>
         <div className=''>
          <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-0">
           {doctor?.name}
          </h2>
        <h2 className='border-b pb-3 mb-3 '>
           {doctor?.email} | {doctor?.phone}
        </h2>
          </div>
          <div className=''>
          <ApproveBtn  
             status={doctor?.doctorProfile?.status ?? "PENDING"}
              profileId ={doctor?.doctorProfile?.id ??""}/>
        <h2 className='border-b pb-3 mb-3 '>
           Appointments ({appointments.length.toString().padStart(2,"0")})
        </h2>
          </div>
       
        </div>
        <Tabs defaultValue="details" className="w-full">
        <TabsList>
          <TabsTrigger value="details">Doctor Details</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className='p-4'>
             <h2 className='text-sm tracking-widest border-b pb-1 mb-2'> 
              BIO DATA
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 text-sm gap-4'>
               <div className='flex items-center '>
                  <span className='mr-3'>First Name :</span>
                  <span>{doctor?.doctorProfile?.firstName}</span>
               </div>
               <div className='flex items-center '>
                  <span className='mr-3'>Last Name :</span>
                  <span>{doctor?.doctorProfile?.lastName}</span>
               </div>
               <div className='flex items-center '>
                  <span className='mr-3'>Date of Birth :</span>
                  <span>{(dob)?.toDateString()}</span>
               </div>
               <div className='flex items-center '>
                  <span className='mr-3'>Middle Name :</span>
                  <span>{doctor?.doctorProfile?.middleName}</span>
               </div>
               <div className='flex items-center '>
                  <span className='mr-3'>Gender :</span>
                  <span>{doctor?.doctorProfile?.gender}</span>
               </div>
            </div>
          </div>
          <div className='p-4'>
             <h2 className='text-sm tracking-widest border-b pb-1 mb-2'> 
               Profile Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 text-sm gap-4'>
               <div className='flex items-center '>
               <span className='mr-3'>Years of Experience :</span>
                <span>{doctor?.doctorProfile?.yearsOfExperience}</span>
               </div>
               <div className='flex items-center '>
                  <span className='mr-3'>Medical License :</span>
                  <span>{doctor?.doctorProfile?.medicalLicense}</span>
               </div>
               <div className='flex items-center '>
                  <span className='mr-3'>Gender :</span>
                  <span>{doctor?.doctorProfile?.gender}</span>
               </div>
               <div className='flex items-center '>
                  <span className='mr-3'>Medical License expiry date :</span>
                  <span>{(expiry)?.toDateString()}</span>
               </div>
            </div>
            <div className='flex items-center w-full mt-4 text-sm font-bold '>
                  <span>{doctor?.doctorProfile?.bio}</span>
               </div>
          </div>
        </TabsContent>
        <TabsContent value="appointments">
        <div className='grid grid-cols-1 gap-2 md:grid-cols-2 p-4'>
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
        </TabsContent>
     </Tabs>
    </div>
  )
}

export default page