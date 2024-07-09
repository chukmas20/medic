import { getServices } from '@/actions/services'
import NewButton from '@/components/dashboard/Doctor/NewButton'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import ServiceCard from '@/components/dashboard/ServiceCard'
import ServiceForm from '@/components/dashboard/ServiceForm'
import { ScrollArea } from '@/components/ui/scroll-area'
import {  Briefcase, Calendar, Dot, LayoutGrid } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const services = (await getServices()).data || []
  return (
    <div>
         {/* Header */}
         {/* 2 panels */}
         <div className='grid grid-cols-12'>
            <div className='lg:col-span-4 col-span-full'>
            <div className='flex items-center justify-between'>
            <PanelHeader title='Services' count={(services.length).toString().padStart(2,"0")} icon={LayoutGrid} />
            <div className='lg:hidden'>
             <NewButton title='New Service'  href='/dashboard/services/new'/>
            </div>
            </div>
            <ScrollArea className="h-96 px-4 py-6 rounded-md w-full border bg-yellow-100 ">
        {services?.map((service) => (
            <ServiceCard  key={service.title} service={service} />
        ))}
         </ScrollArea>
            </div>
            <div className='lg:col-span-8 col-span-full hidden lg:block'>
            <div className='py-3 px-6 border-b border-gray-200 flex items-center justify-end' >
        <div className='flex items-center gap-1'>
          <NewButton title='New Service'  href='/dashboard/services/new'/>
        </div>
       </div>
       <div className='flex justify-center items-center h-1/2'>
     <div className='text-center flex flex-col text-sm items-center gap-1 border border-yellow-200 px-3 py-3 shadow-md'>
       <LayoutGrid />
        <div className='py-3'>
        <p> {(services.length).toString().padStart(2,"0")} Patients are on your appointment list today</p>
        </div>
        <NewButton title='New Service'  href='/dashboard/services/new'/>
     </div>
    </div>
        </div>
        </div> 
    </div>
  )
}

export default page