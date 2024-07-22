import React from 'react'
import { Button } from './ui/button'
import { getFormattedDate } from '@/utils/getFormattedShortDay'

const FixedBookButton = ({price}:{price:number | undefined}) => {
  const formattedDate = getFormattedDate();
  return (
    <div className="fixed bg-white z-50 bottom-0 w-full shadow-2xl py-8 px-6 rounded-md flex justify-between mx-auto  ">
            <div className='max-w-4xl mx-auto gap-12 flex items-center justify-between'>
            <div className='w-full ' >
                <p className='font-semibold text-xl'>₦ {price}</p>
                <p className='font-bold text-sm'>{formattedDate}</p>
            </div>
            <Button 
              className='py-3 px-6 w-full bg-yellow-800 dark:text-slate-100 hover:bg-yellow-900 dark:hover:bg-yellow-800'
              >
                Book
              </Button>
        </div>
    </div>
  )
}

export default FixedBookButton