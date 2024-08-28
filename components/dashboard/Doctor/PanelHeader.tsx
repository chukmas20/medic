import {  LucideIcon  } from 'lucide-react'
import React from 'react'




const PanelHeader = ({title,count, icon}:{title:string, count: string, icon: LucideIcon}) => {
  const Icon = icon
  return (
    <div className='py-3 px-6 border-b border-gray-200 flex items-center justify-between' >
        <div className='flex items-center gap-1'>
            <Icon className='text-yellow-600' />
            <span className='text-yellow-600 '>{title}</span>
            <span
              className='bg-white w-6 h-6
               rounded-full flex items-center 
               justify-center shadow-sm border'>
               {count.toString().padStart(2,"0")}
            </span>
        </div>  
    </div>
  )
}

export default PanelHeader