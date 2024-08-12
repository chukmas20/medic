import { getAppointmentByPatientId } from '@/actions/appointments'
import { getDoctorById, getDoctorBySlug } from '@/actions/users'
import DoctorDetails from '@/components/DoctorDetails'
import { authOptions } from '@/lib/auth'
import { Appointment } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async({
  params:{slug},
  searchParams
}:{
params:{slug:string}
searchParams:{[key:string]:string | string[] | undefined}
}) => {
  const {id} = searchParams
  //fetch doctor
  const session = await getServerSession(authOptions)
  // const doctor = (await getDoctorBySlug(slug)) || null;
  const doctor = (await getDoctorById(id as string)) || null;

  const user = session?.user
  //fetch appointment by patientId
  const appointment = await getAppointmentByPatientId(user?.id??"")
  return (
    <>
    {doctor &&  doctor.id ? (
         <div className='bg-yellow-100  min-h-screen dark:bg-slate-800'>
         <div className='max-w-4xl border bg-white dark:bg-slate-950 shadow-2xl border-yellow-100 mx-auto rounded-md'>
             <div className='py-8 px-6'>
                 <div className='flex items-center justify-between '>
                     <div className=''>
                     <div className='flex flex-col'>
                         <h2 className='uppercase font-bold text-2xl tracking-widest'>{doctor.name}</h2>
                         <p className='text-gray-600 uppercase text-xs'> Adult Health</p>
                         <p> {doctor.doctorProfile?.operationMode}</p>
                         <p>{doctor.doctorProfile?.city},</p>
                         <p>{doctor.doctorProfile?.state}, {doctor.doctorProfile?.country},</p>


                      </div>
                     </div>
                     <img 
                         src={doctor.doctorProfile?.profilePicture ?? " "}
                         width={120} height={80} alt='' className='w-36 h-36 rounded-full object-cover'/>
                  </div>
                </div>
             <div className=''>
               <DoctorDetails appointment={appointment as Appointment | null} doctor={doctor}  />
             </div>
         </div>
         {/* <FixedBookButton  price={doctor.doctorProfile?.hourlyWage} /> */}
     </div>
    ):(
      <div className='uppercase text-yellow-500 font-bold text-4xl flex items-center justify-center min-h-screen'>
         <h1 > Doctor details not Found</h1>
      </div>
    )}
    </>
     
  )
}

export default page