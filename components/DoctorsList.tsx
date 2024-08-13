import React from 'react'
import SectionHeading from './SectionHeading'
import ToggleButton from './ToggleButton'
import Link from 'next/link'
import { Map } from 'lucide-react'
import DoctorsListCarousel from './DoctorsListCarousel'
import { Button } from './ui/button'
import { User } from '@prisma/client'
import { Doctor } from '@/types/type'

const DoctorsList = (
   {title = "TeleHealth Visit",
     isInperson, 
    className="bg-yellow-100 py-8 lg:py-24 dark:bg-yellow-800",
    doctors
    }:{
      title?:string,
      isInperson?:boolean,
      className?:string,
      doctors: Doctor[]
    }) => {
  return (
    <div className={className}>
         <div className="max-w-6xl mx-auto">
         <SectionHeading title={title}     />
          <div className="py-4 flex items-center justify-between">
             {isInperson ? (
               <Link href="#" className='text-yellow-800 font-semibold text-sm flex items-center'>
                  <Map className='mr-2 flex-shrink-0 w-4 h-4' />
                  <span> Map View </span>
               </Link>
             ):(
              <ToggleButton  />
             )}
             <Button asChild>
               <Link href={`/category?mode=${title}`} className=''>
                  Expand
                </Link>
             </Button>
          </div>
          <div className="py-6">
              <DoctorsListCarousel doctors={doctors}  isInperson={isInperson} />
          </div>
         </div>
    </div>
  )
}

export default DoctorsList