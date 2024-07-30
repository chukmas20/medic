import { Calendar } from 'lucide-react'
import React from 'react'
import NewButton from './NewButton'

type HomeDisplayCardProps ={
  count: number
}
const HomeDisplayCard = ({count}:HomeDisplayCardProps) => {
  return (
     <div className='flex justify-center items-center h-1/2'>
     <div className='text-center flex flex-col text-sm items-center gap-1 border border-yellow-200 px-3 py-3 shadow-md'>
       <Calendar />
        <div className='py-3'>
        <p> {count} Patient(s) on your appointment list today</p>
        </div>
       
        <NewButton title='New Appointment'  href='#'/>

     </div>
    </div>
  )
}

export default HomeDisplayCard