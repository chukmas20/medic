import { DataProps, getDoctorsBySearch, getDoctorsByServiceSlug } from '@/actions/doctors'
import DoctorCard from '@/components/DoctorCard'
import { Doctor } from '@/types/type'
import Link from 'next/link'
import React from 'react'
import ServiceList from '../services/ServiceList'
import LinkCards from '../doctors/LinkCards'
import SymptomCard from "../doctors/SymptomCard";


const page =async ({
    searchParams
}:{
 searchParams:{[key:string]:string | string[] | undefined}
}) => {
    const {query} = searchParams;
    const data = await getDoctorsBySearch(query as string) 
    const doctors = data?.doctors || []
    const services = data?.services || []
    const specialties = data?.specialties || []
    const symptoms = data?.symptoms || []

    console.log(data);
  return (
    <div className='container p-8'>
          <h1 className='scroll-m-20 lg:text-3xl py-4 pb-6 capitalize text-2xl font-extrabold tracking-tight'>
            {query} 
            {/* ({doctors.length?.toString().padStart(2,"0" )}) */}
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
                              <Link key={i} href={`/service/${service.slug}`} className='hover:text-yellow-600'>
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
                {services && services.length > 0 &&
                  (<div className='py-6 border-b'>
                    <h2>Search results for {query} in services</h2>
                        <ServiceList data={services} />
                  </div>) 
                  }
                
                <div className='py-6 border-b'>
                  <h2>Search results for {query} in specialties</h2>
                  <LinkCards className='bg-yellow-600'  specialties={specialties}     />
                </div>
                <div className='py-6 border-b'>
                  <h2>Search results for {query} in symptoms</h2>
                  <SymptomCard className="bg-yellow-500"  symptoms={symptoms}/>
                   </div>
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