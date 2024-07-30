import { getAppointments } from '@/actions/appointments'
import HomeDisplayCard from '@/components/dashboard/Doctor/HomeDisplayCard'
import ListPanel from '@/components/dashboard/Doctor/ListPanel'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import { Calendar } from 'lucide-react'
import React from 'react'

const page = async() => {
  const appointments = (await getAppointments()).data || []
  return (
    <div>
          <div className='col-span-8'>
              <HomeDisplayCard  count={appointments.length}  />
            </div>
        
    </div>
  )
}

export default page