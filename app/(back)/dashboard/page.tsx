import DashBoard from '@/components/dashboard/DashBoard'
import DoctorDashboard from '@/components/dashboard/DoctorDashboard'
import PatientDashboard from '@/components/dashboard/PatientDashboard'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async() => {
  const session = await getServerSession(authOptions)
  const user = session?.user;
  const role = user?.role;

  if(role === "DOCTOR"){
    return (
      <>
        <p className='bg-yellow-500 text-white w-28 px-2 rounded-md shadow-md'>
            Role: {user?.role}
         </p>
        <DoctorDashboard />
      </>
    ) 
  }

  if(role === "USER"){
    return(
       <>
        <p className='bg-yellow-500 text-white w-28 px-2 rounded-md shadow-md' >
          Role: {user?.role}
        </p>
         <PatientDashboard />
       </>
    ) 
  }
  return (
    <div className='p-3 '>
        <p className='bg-yellow-500 text-white w-28 px-2 rounded-md shadow-md'>
           Role: {user?.role}
        </p>
        <DashBoard />
    </div>
  )
}

export default page