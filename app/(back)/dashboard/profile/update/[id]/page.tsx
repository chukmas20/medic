import { getUserById } from '@/actions/users'
import UserProfileForm from '@/components/dashboard/UserProfileForm'
import React from 'react'

const page = async({
  params:{id}
   }:{
 params:{id:string}
 }) => {
  const user = await getUserById(id)
  return (
     <div>
        {user && user.id && <UserProfileForm  title='Edit Profile'  initialData={user}   />}
     </div>
  )
}

export default page