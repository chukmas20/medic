import { Stethoscope, Video } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const DoctorCard = ({isInperson = false}:{isInperson?: boolean}) => {
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
        <div
     className="border border-gray-200
      bg-white py-8 rounded-md inline-flex 
      flex-col items-start justify-start px-3
       hover:border-yellow-600 duration-500 transition-all dark:bg-slate-800  " 
     >
        <Link href="#">
        <h2 className='uppercase font-bold text-2xl tracking-widest'>Odilon kossonou, PA-C</h2>
        {isInperson && (
           <p className='py-3'>3250 Lincoln Highway, Kendall Park, NJ 08824</p>

        )}
        <div className="flex items-center gap-6 py-4">
            <div className='relative'>
            <img 
                src="https://images.pexels.com/photos/4177656/pexels-photo-4177656.jpeg?auto=compress&cs=tinysrgb&w=600"
                width={120} height={80} alt='' className='w-24 h-24 rounded-full object-cover'/>
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
                        Available Today
                    </p>
                </div>
        </div>
        </Link>
       
        <div className="pt-8 border-t border-yellow-600">
            <h3 className='flex gap-4 justify-between items-center'>
               <span className='text-gray-600 dark:text-gray-400' >Tues, May 28</span> price<span className='font-bold'>₦5000</span>
            </h3>
            <div className='py-3 grid grid-cols-3 gap-2'>
                     {timeStamps.slice(0,5).map((item,i)=>{
                      return(
                         <Link href="/doctors/slug" key={i} className='bg-yellow-700 text-white text-center py-2 px-3 '>
                           {item.time} 
                           {item.period}
                        </Link>
                      )
                     })}
                     <Link href="/doctors/slug"
                      className='bg-yellow-900 text-center truncate text-sm text-white py-2 px-3'>
                        More Slots
                      </Link>
                 </div>
        </div>
    </div>
    
  )
}

export default DoctorCard