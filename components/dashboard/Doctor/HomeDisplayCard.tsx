import { Calendar } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'

const HomeDisplayCard = () => {
  return (
     <div className='flex justify-center items-center h-1/2'>
     <div className='text-center flex flex-col text-sm items-center gap-1 border border-yellow-200 px-3 py-3 shadow-md'>
       <Calendar />
        <div className='py-3'>
        <p> 12 Patients are on your appointment list today</p>
        </div>
       
        <NewButton title='New Appointment'  href='#'/>

     </div>
    </div>
  )
}

export default HomeDisplayCard