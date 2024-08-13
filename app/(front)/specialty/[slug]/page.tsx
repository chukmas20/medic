import { DataProps, getDoctorsBySpecialtySlug } from '@/actions/doctors'
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
    const {type} = searchParams;
    console.log(type)
    const title = slug.split("-").join(" ")
    const data = await getDoctorsBySpecialtySlug(slug) as DataProps
    const doctors = data?.doctors as Doctor[];
    const services = data.services
  return (
    <div className='container p-8'>
          <h1 className='scroll-m-20 lg:text-3xl py-4 pb-6 capitalize text-2xl font-extrabold tracking-tight'>
            {title} ({doctors.length?.toString().padStart(2,"0")})
        </h1>
        <div className='max-w-6xl mx-auto grid grid-cols-12 gap-6 lg:gap-10'>
            <div className='col-span-3 shadow border border-gray-200/50 rounded p-6'>
              <h2 className='capitalize font-semibold'>Other Services</h2>
                    {
                      services && services.length > 0 && (
                        <div className='py-3 flex  flex-col text-sm space-y-2'>
                          {
                            services.map((service, i)=>{
                             return(
                              <Link key={i}
                                href={`/specialty/${service.slug}`}
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
            <div className='col-span-9 '>
                {
                    doctors && doctors.length > 0 ? (
                      <div className='grid grid-cols-2 gap-6'>
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