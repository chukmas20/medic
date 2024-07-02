import { Button } from '@/components/ui/button'
import { Calendar, Layout, Plus } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'

const PanelHeader = () => {
  return (
    <div className='py-3 px-6 border-b border-gray-200 flex items-center justify-between' >
        <div className='flex items-center gap-1'>
            <Calendar className='text-yellow-600' />
            <span className='text-yellow-600 '>Appointments</span>
            <span
              className='bg-white w-6 h-6
               rounded-full flex items-center 
               justify-center shadow-sm border'>
              11
            </span>
        </div>  
    </div>
  )
}

export default PanelHeader