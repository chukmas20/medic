"use client";
import React, { useState } from 'react'
import Availability from './Availability';
import { DoctorDetail, DoctorProfileAvailability,  } from '@/types/type';
import { getDayName } from '@/utils/getDayName';
import { getFormattedDate } from '@/utils/getFormattedShortDay';
import Link from 'next/link';
import { Button } from './ui/button';

const DoctorDetails = ({doctor}:{doctor:DoctorDetail}) => {
    const [isActive, setIsActive] = useState("availability")
    const today: keyof DoctorProfileAvailability = getDayName();
   const times = doctor.doctorProfile?.availability?.[today] ?? null
   const formattedDate = getFormattedDate()
   const [selectedTime, setSelectedTime] =  useState("")
   console.log(selectedTime)
   // const slug = generateSlug(doctor.slug)
   console.log(times)
  return (
    <div className=''>
       <div className='flex items-center justify-between uppercase tracking-widest ' >
             <button 
             onClick={()=> setIsActive("details")}
             className={isActive === "details"  ? 
             ('bg-yellow-600 py-4 w-full px-8 text-white')
             :('bg-yellow-100 text-gray-800 w-full py-4 px-8 ')}> 
               Service Details 
            </button>
             <button 
               onClick={()=> setIsActive("availability")} 
               className={isActive === "availability"  ? 
               ('bg-yellow-600 py-4 w-full px-8 text-white'):('bg-yellow-100 text-gray-800 w-full py-4 px-8')}>
                  Availability
            </button>
        </div>
        <div className='py-8 px-6'>
        {isActive === "availability" ? (
           
           <div className='py-3 grid grid-cols-4 gap-2'>
            {times && times.length > 0 }
           {times.map((item: any,i:number)=>{
            return(
               <Button key={i} variant="outline" onClick={()=>setSelectedTime(item)}>
                   {item} 
               </Button>
            )
           })}
       </div>
        ):(
        <div className='' >
            Service Details Component
       </div>
        )}
        </div>  
    </div>
  )
}

export default DoctorDetails