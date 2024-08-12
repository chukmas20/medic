import React from 'react'
import ServiceCard from './ServiceCard';
import { Service } from '@prisma/client';
import { ServiceWithDoctorProfileCount } from '@/actions/services';


const ServiceList = ({data}:{data: ServiceWithDoctorProfileCount[]}) => {
  return (
    <div className='grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-3 grid-cols-1 gap-6'>
         {
            data.map((service, i)=>{
                return  <ServiceCard key={i} service={service} />
            })
         }
    </div>
  )
}

export default ServiceList