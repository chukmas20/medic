import { DataProps, getDoctorsBySymptomId } from '@/actions/doctors'
import DoctorCard from '@/components/DoctorCard'
import { Doctor } from '@/types/type'
import Link from 'next/link'
import React from 'react'

const page =async ({
    params:{slug},
    searchParams
}:{
 params:{slug:string}
 searchParams:{[key:string]:string | string[] | undefined}
}) => {
    const {id} = searchParams;
    const title = slug.split("-").join(" ")
    const data = await getDoctorsBySymptomId(id as string) as DataProps
    const doctors = data?.doctors as Doctor[];
    const services = data.services
  return (
    <div className='container p-8'>
          <h1 className='scroll-m-20 lg:text-3xl py-4 pb-6 capitalize text-2xl font-extrabold tracking-tight'>
            {title} ({doctors.length?.toString().padStart(2,"0")})
        </h1>
        <div className='max-w-6xl mx-auto grid grid-cols-12 gap-6 lg:gap-10'>
            <div className='col-span-3 hidden md:block shadow border border-gray-200/50 rounded p-6'>
              <h2 className='capitalize font-semibold'>Other Services</h2>
                    {
                      services && services.length > 0 && (
                        <div className='py-3 flex  flex-col text-sm space-y-2'>
                          {
                            services.map((service, i)=>{
                             return(
                              <Link key={i}
                                href={`/symptoms/${service.slug}?id=${service.id}`}
                                className='hover:text-yellow-600'>
                               {service.title}
                            </Link>
                             ) 
                            })
                          }  
                        </div>                    
                      )
                    }
            </div>
            <div className='md:col-span-9 col-span-12 '>
                {
                    doctors && doctors.length > 0 ? (
                      <div className='grid grid-cols-1  md:grid-cols-2 gap-3'>
                         {
                            doctors.map((doctor:Doctor)=>{
                                return(
                                    <DoctorCard key={doctor.id} doctor={doctor} />
                                )
                            })
                         }
                      </div>
                    ):(
                        <div className=''>
                           <h2>No Doctors for this category</h2>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default page