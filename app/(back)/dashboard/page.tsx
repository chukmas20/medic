import DashBoard from '@/components/dashboard/DashBoard'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async() => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  return (
    <div>
        <p>Role {user?.role}</p>
        <DashBoard />
    </div>
  )
}

export default page