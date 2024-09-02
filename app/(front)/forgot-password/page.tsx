import ForgotPassword from '@/components/Auth/ForgotPassword'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
    const session = await getServerSession(authOptions)
    if(session){
      redirect("/")
    }
  return (
    <div className="text-center">
         <ForgotPassword  />
    </div>
  )
}

export default page