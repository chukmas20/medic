import { ServiceProps } from '@/types/type'
import Link from 'next/link'
import React from 'react'

const ServiceCard = ({service}:{service:ServiceProps}) => {
  return (
    <Link href={`/services/${service.slug}`}
      className='rounded-md bg-yellow-600 overflow-hidden hover:bg-yellow-700 duration-300 flex gap-4'>
         <img
           src={service.image}
             alt={service.title}
           className='w-1/3 object-cover aspect-video'  
           width={1170}  
           height={848}     
         />
         <div className='flex flex-col w-2/3 text-white py-4 '>
            <h2> {service.title} </h2>
            <p className='text-[0.6rem]'>560 Doctors available</p>
         </div>
    </Link>
  )
}

export default ServiceCard