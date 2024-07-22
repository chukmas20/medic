"use client";
import React, { useState } from 'react'
import Availability from './Availability';
import { DoctorDetail } from '@/types/type';

const DoctorDetails = ({doctor}:{doctor:DoctorDetail}) => {
    const [isActive, setIsActive] = useState("availability")
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
           <div className='' >
             <Availability />
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