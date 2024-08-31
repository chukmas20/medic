import { DataProps, getDoctorsBySearch, getDoctorsByServiceSlug } from '@/actions/doctors'
import DoctorCard from '@/components/DoctorCard'
import { Doctor } from '@/types/type'
import Link from 'next/link'
import React from 'react'
import ServiceList from '../services/ServiceList'
import LinkCards from '../doctors/LinkCards'
import SymptomCard from "../doctors/SymptomCard";
import { getServices } from '@/actions/services'


const page =async ({
    searchParams
}:{
 searchParams:{[key:string]:string | string[] | undefined}
}) => {
    const {query} = searchParams;
    const data = await getDoctorsBySearch(query as string) 
    const doctors = data?.doctors || []
    const searchServices = data?.services || []
    const specialties = data?.specialties || []
    const symptoms = data?.symptoms || []
    const allServices =   (await getServices()).data || []
    const services = searchServices.length > 0 ?searchServices : allServices

    console.log(data);
  return (
    <div className='container p-8'>
          <h1 className='scroll-m-20 lg:text-3xl py-4 pb-6 capitalize text-2xl font-extrabold tracking-tight'>
            {query} 
            {/* ({doctors.length?.toString().padStart(2,"0" )}) */}
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
                              <Link key={i} href={`/service/${service.slug}`} className='hover:text-yellow-600'>
                               {service.title} 
                               ({service._count.doctorProfiles.toString().padStart(2,"0")})
                            </Link>
                             ) 
                            })
                          }  
                        </div>                    
                      )
                    }
            </div>
            <div className=' md:col-span-9 col-span-12 '>
                {searchServices && searchServices.length > 0 &&
                  (<div className='py-6 border-b'>
                    <h2 className='pb-3'>Search results for {query} in services</h2>
                        <ServiceList data={searchServices} />
                  </div>
                  ) 
                  }
                   {specialties && specialties.length > 0 &&
                  (<div className='py-6 border-b'>
                    <h2 className='pb-3'>Search results for {query} in specialties </h2>
                    <LinkCards className='bg-yellow-600'  specialties={specialties}     />
                  </div>) 
                  }
                  {symptoms && symptoms.length > 0 && (
                     <div className='py-6 border-b'>
                     <h2 className='pb-3'>Search results for {query} in symptoms </h2>
                     <SymptomCard className="bg-yellow-500"  symptoms={symptoms}/>
                      </div>
                  )}
                {
                    doctors && doctors.length > 0 && (
                      <div className='py-6'>
                        <h2 className='pb-3'>Results for {query} in doctors</h2>
                           <div className='grid grid-cols-1  md:grid-cols-2 gap-3 '>
                         {
                            doctors.map((doctor:Doctor)=>{
                                return(
                                    <DoctorCard key={doctor.id} doctor={doctor} />
                                )
                            })
                         }
                      </div>
                      </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default page