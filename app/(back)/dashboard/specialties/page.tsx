import { getSpecialties } from '@/actions/specialty'
import NewButton from '@/components/dashboard/Doctor/NewButton'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import SpecialtyCard from '@/components/dashboard/SpecialtyCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ShieldPlus } from 'lucide-react'
import React from 'react'

const page = async () => {
  const specialties = (await getSpecialties()).data || []
  return (
    <div>
         {/* Header */}
         {/* 2 panels */}
         <div className='grid grid-cols-12'>
            <div className='lg:col-span-4 col-span-full'>
            <div className='flex items-center justify-between'>
            <PanelHeader title='Specialties' count={(specialties.length).toString().padStart(2,"0")} icon={ShieldPlus} />
            <div className='lg:hidden'>
             <NewButton title='New Specialties'  href='/dashboard/specialties/new'/>
            </div>
            </div>
            <ScrollArea className="h-96 px-4 py-6 rounded-md w-full border bg-yellow-100 ">
        {specialties?.map((specialty) => (
            <SpecialtyCard  key={specialty.title} specialty={specialty} />
        ))}
         </ScrollArea>
            </div>
            <div className='lg:col-span-8 col-span-full hidden lg:block'>
            <div className='py-3 px-6 border-b border-gray-200 flex items-center justify-end' >
        <div className='flex items-center gap-1'>
          <NewButton title='New Specialty'  href='/dashboard/specialties/new'/>
        </div>
       </div>
       <div className='flex justify-center items-center h-1/2'>
     <div className='text-center flex flex-col text-sm items-center gap-1 border border-yellow-200 px-3 py-3 shadow-md'>
       <ShieldPlus />
        <div className='py-3'>
        <p> {(specialties.length).toString().padStart(2,"0")} Specialties</p>
        </div>
        <NewButton title='New Specialty'  href='/dashboard/specialties/new'/>
     </div>
    </div>
        </div>
        </div> 
    </div>
  )
}

export default page