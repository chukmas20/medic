import LoginForm from '@/components/Auth/LoginForm'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async() => {
  const session = await getServerSession(authOptions)
  if(session){
    redirect("/dashboard")
  }
  return (
    <div className='bg-yellow-100 min-h-screen py-8'>
        <div className="grid md:grid-cols-2 grid-cols-1 w-full  bg-white border border-gray-200 
           max-w-5xl mx-auto rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
            <div className='hidden  md:flex linear-bg '>
                {/* image */}
            </div>
            <div className=''>
                <LoginForm  />
            </div>
        </div>
    </div>
  )
}

export default page