"use client"
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar"


const Availability = () => {
    const [bookDate, setBookDate] = useState<Date | undefined>(new Date())
    const GMT = bookDate?.toString().split("GMT")[1].split(" ")[0];
    const formattedDate = `${bookDate?.toString().split(" ").slice(0,3).join(" ")} -GMT${GMT}`;
    console.log(bookDate)
    console.log(GMT)

    const timeStamps = [
        {
         time:"8:30",
         period:"am"
        },
        {
         time:"9:30",
         period:"am"
        },
        {
         time:"10:30",
         period:"am"
        },
        {
         time:"11:30",
         period:"am"
        },
        {
         time:"12:30",
         period:"pm"
        },
        {
         time:"13:30",
         period:"pm"
        },
        {
         time:"14:30",
         period:"pm"
        },
     ]
  return (
    
    <div className='mb-[200px]'>
        <h2 className='font-bold py-4 text-2xl uppercase text-yellow-600'> Select a Date and Time</h2>
        <div className="grid grid-cols-2 gap-4 lg:gap-0">
            <div className="sm:col-span-1  col-span-full">
            <Calendar
                    mode="single"
                    selected={bookDate}
                    onSelect={setBookDate}
                    className="rounded-md border"
                />
            </div>
            <div className="sm:col-span-1 col-span-full">
                 <div className="px-4">
                   { bookDate 
                   && <h2 className='pb-4 font-semibold text-yellow-600 text-center'>
                    {formattedDate}
                 </h2>}
                 <div className='py-3 grid grid-cols-3 gap-2'>
                     {timeStamps.slice(0,5).map((item,i)=>{
                      return(
                         <button  key={i} className='bg-yellow-700 text-white text-center py-2 px-3 '>
                           {item.time} 
                           {item.period}
                        </button>
                      )
                     })}
                     <button
                      className='bg-yellow-900 text-center truncate text-sm text-white py-2 px-3'>
                        More Slots
                      </button>
                 </div>
                 </div>
            </div>

        </div>
    </div>
  )
}

export default Availability