import { getSymptoms } from '@/actions/symptom'
import NewButton from '@/components/dashboard/Doctor/NewButton'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import SymptomCard from '@/components/dashboard/SymptomCard'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RibbonIcon, ShieldPlus } from 'lucide-react'
import React from 'react'

const page = async () => {
  const symptoms= (await getSymptoms()).data || []
  return (
    <div>
         {/* Header */}
         {/* 2 panels */}
         <div className='grid grid-cols-12'>
            <div className='lg:col-span-4 col-span-full'>
            <div className='flex items-center justify-between'>
            <PanelHeader title='Symptoms' count={(symptoms.length).toString().padStart(2,"0")} icon={RibbonIcon} />
            <div className='lg:hidden'>
             <NewButton title='New Symptom'  href='/dashboard/symptoms/new'/>
            </div>
            </div>
            <ScrollArea className="h-96 px-4 py-6 rounded-md w-full border bg-yellow-100 ">
        {symptoms?.map((symptom) => (
            <SymptomCard  key={symptom.title} symptom={symptom} />
        ))}
         </ScrollArea>
            </div>
            <div className='lg:col-span-8 col-span-full hidden lg:block'>
            <div className='py-3 px-6 border-b border-gray-200 flex items-center justify-end' >
        <div className='flex items-center gap-1'>
          <NewButton title='New Symptom'  href='/dashboard/symptoms/new'/>
        </div>
       </div>
       <div className='flex justify-center items-center h-1/2'>
     <div className='text-center flex flex-col text-sm items-center gap-1 border border-yellow-200 px-3 py-3 shadow-md'>
       <ShieldPlus />
        <div className='py-3'>
        <p> {(symptoms.length).toString().padStart(2,"0")} Symptoms</p>
        </div>
        <NewButton title='New Symptom'  href='/dashboard/symptoms/new'/>
     </div>
    </div>
        </div>
        </div> 
    </div>
  )
}

export default page