import { getDoctorBySlug } from '@/actions/users'
import DoctorDetails from '@/components/DoctorDetails'
import React from 'react'

const page = async({
  params:{slug},
  
   }:{
  params:{slug:string}}) => {
  //fetch doctor
  const doctor = (await getDoctorBySlug(slug)) || null;
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
               <DoctorDetails doctor={doctor}  />
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