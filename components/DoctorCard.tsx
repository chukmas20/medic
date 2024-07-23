import { Doctor, DoctorProfileAvailability } from '@/types/type';
import generateSlug from '@/utils/generateSlug';
import { getDayName } from '@/utils/getDayName';
import { getFormattedDate } from '@/utils/getFormattedShortDay';
import { Stethoscope, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

// interface DoctorProps extends DoctorProfile{

// }

const DoctorCard = ({
    isInperson = false,
    doctor
   }:{
 isInperson?: boolean;
 doctor: Doctor
}) => {
   console.log(doctor.slug)
  
   const today: keyof DoctorProfileAvailability = getDayName();
   const times = doctor.doctorProfile?.availability?.[today] ?? null
   const formattedDate = getFormattedDate()
   // const slug = generateSlug(doctor.slug)
   console.log(times)
 
  return (
   <>
     {
      times && times.length > 0 && (
         <div
         className="border border-gray-200
          bg-white py-8 rounded-md inline-flex 
          flex-col items-start justify-start px-3
           hover:border-yellow-600 duration-500 transition-all dark:bg-slate-800  " 
         >
            <Link href={`/doctors/${doctor.slug}`}>
            <h2 className='uppercase font-bold text-2xl tracking-widest'>
               {doctor.name}
            </h2>
            {isInperson && (
               <p className='py-3'>3250 Lincoln Highway, Kendall Park, NJ 08824</p>
    
            )}
            <div className="flex items-center gap-6 py-4">
                <div className='relative'>
                <img 
                    src={doctor.doctorProfile?.profilePicture ?? "https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600"}
                    alt={doctor.name}
                    width={120} height={80}  className='w-24 h-24 rounded-full object-cover'/>
                   {
                    !isInperson && (
                      <p className='bg-yellow-600
                      w-10 h-10 flex items-center
                       justify-center rounded-full text-white absolute bottom-2 right-3'
                       >
                       <Video className='w-6 h-6' />
                       </p>
                    )
                   }
                </div>
                    <div className='flex flex-col gap-2'>
                        <p className='flex items-center'>
                            <Stethoscope  className='w-4 h-4 mr-2 flex-shrink-0' />
                            <span> Family Medicine</span>
                        </p>
                        <p className='bg-green-200 py-3 px-6 uppercase dark:text-slate-900'>
                            Available Today {doctor.doctorProfile?.gender}
                        </p>
                    </div>
            </div>
            </Link>
           
            <div className="pt-8 border-t border-yellow-600">
                <h3 className='flex gap-4 justify-between items-center'>
                   <span className='text-gray-600 dark:text-gray-400' >
                      {formattedDate}
                     </span> 
                      <span className='text-md'> price</span> 
                     <span className='font-bold'>
                        ₦{doctor.doctorProfile?.hourlyWage}
                     </span>
                </h3>
                <div className='py-3 grid grid-cols-3 gap-2'>
                         {times.slice(0,5).map((item: any,i:number)=>{
                          return(
                             <Link href={`/doctors/${doctor.slug}`} key={i} className='bg-yellow-700 text-white text-center py-2 px-3 '>
                               {item} 
                            </Link>
                          )
                         })}
                         <Link href={`/doctors/${doctor.slug}`}
                          className='bg-yellow-900 text-center truncate text-sm text-white py-2 px-3'>
                            More Slots
                          </Link>
                </div>
            </div>
        </div>
        
      )
     }
   </>
  
  )
}

export default DoctorCard