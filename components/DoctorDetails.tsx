"use client";
import React, { useState } from 'react'
import { DoctorDetail  } from '@/types/type';

import { Calendar } from './ui/calendar';
import { getDayFromDate } from '@/utils/getDayFromDate';
import { getLongDate } from '@/utils/getLongDate';
import { CreditCard, MoveRight } from 'lucide-react';
import { Button } from './ui/button';

const DoctorDetails = ({doctor}:{doctor:DoctorDetail}) => {
    const [isActive, setIsActive] = useState("availability")
    const [step, setStep] = useState(1)
   const [selectedTime, setSelectedTime] =  useState("")
   const [date, setDate] = React.useState<Date | undefined>(new Date())
   const day = getDayFromDate(date?.toDateString());
   const longDate = getLongDate(date!.toDateString());

   console.log(day)
   console.log(longDate)

   const times = doctor.doctorProfile?.availability?.[day] ?? null

  return (
    <>
      {step === 1 ? (
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
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
             <div className=''>
             <Calendar
                   mode="single"
                   selected={date}
                   onSelect={setDate}
                   className="rounded-md border"
                 />
             </div>
             <div className=''>
              <h2 className='text-2xl font-bold border border-y-1 px-2 py-2'>{longDate}</h2>
             {times && times.length > 0 && (
              <div>
                    {times.map((item: any,i:number)=>{
             return(
                <button 
                  key={i} 
                  className=
                   {selectedTime === item? 
                     "bg-yellow-500 p-2 rounded-md ml-1 mt-3 text-white":"bg-yellow-100 p-2 mt-3 ml-1 rounded-md"}
                     onClick={()=>setSelectedTime(item)}>
                    {item} 
                </button>
               )
               })}
               </div>
             )} 
              <div className='mt-4'>
              <button
                 onClick={()=>setStep(currStep=>currStep + 1)}
                type="button" className="text-white bg-yellow-600 hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">
                 Book Doctor
                 (<CreditCard  className='w-4 h-4 mr-1'/> ₦ {doctor.doctorProfile?.hourlyWage}) 
                  <MoveRight className='w-4 h-4 ml-3'  /> 
               </button>  
              </div>   
        </div>
      </div>      
         ):(
         <div className='' >
             Service Details Component
        </div>
         )}
         </div>  
     </div>
      ):(
      <div className='p-8 bg-yellow-100'>
        <h1> This is step 2</h1>
         <div className='flex items-center space-x-6 py-4 '>
             <Button variant={'outline'}  type='button' onClick={()=>setStep(currStep=>currStep - 1)}>
                Previous
              </Button>
             <Button className='bg-yellow-500 hover:bg-yellow-700' >Submit</Button>
         </div>
      </div>
    )}
    </>
    
  )
}

export default DoctorDetails