import DoctorDetails from '@/components/DoctorDetails'
import FixedBookButton from '@/components/FixedBookButton'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = () => {
  return (
    <div className='bg-yellow-100  min-h-screen dark:bg-slate-800'>
        <div className='max-w-4xl border bg-white dark:bg-slate-950 shadow-2xl border-yellow-100 mx-auto rounded-md'>
            <div className='py-8 px-6'>
                <div className='flex items-center justify-between '>
                    <div className=''>
                    <div className='flex flex-col'>
                        <h2 className='uppercase font-bold text-2xl tracking-widest'> Odilon Kosounou</h2>
                        <p className='text-gray-600 uppercase text-xs'> Adult Health</p>
                        <p> In-person doctor visit</p>
                        <p>3250 Lincoln Highway, Kendall Park, NJ 08824</p>
                     </div>
                    </div>
                    <img 
                        src="https://images.pexels.com/photos/4177656/pexels-photo-4177656.jpeg?auto=compress&cs=tinysrgb&w=600"
                        width={120} height={80} alt='' className='w-36 h-36 rounded-full object-cover'/>
                 </div>
               </div>
            <div className=''>
              <DoctorDetails   />
            </div>
        </div>
        <FixedBookButton  />
    </div>
  )
}

export default page