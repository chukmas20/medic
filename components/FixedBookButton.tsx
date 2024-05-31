import React from 'react'
import { Button } from './ui/button'

const FixedBookButton = () => {
  return (
    <div className="fixed bg-white z-50 bottom-0 w-full shadow-2xl py-8 px-6 rounded-md flex justify-between mx-auto  ">
            <div className='max-w-4xl mx-auto gap-12 flex items-center justify-between'>
            <div className='w-full ' >
                <p className='font-semibold text-xl'> ₦ 5000</p>
                <p className='font-bold text-sm'>Fri, May 31 - 10:00 am</p>
            </div>
            <Button className='py-3 px-6 w-full bg-yellow-800'>Book</Button>
        </div>
    </div>
  )
}

export default FixedBookButton