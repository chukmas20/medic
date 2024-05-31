import React from 'react'
import ServiceCard from './ServiceCard';
import { ServiceProps } from '@/types/type';


const ServiceList = ({data}:{data: ServiceProps[]}) => {
  return (
    <div className='grid lg:grid-cols-5  md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-6'>
         {
            data.map((service, i)=>{
                return  <ServiceCard key={i} service={service} />
            })
         }
    </div>
  )
}

export default ServiceList