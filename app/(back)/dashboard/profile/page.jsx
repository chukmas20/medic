
import { getLoggedInUserId } from '@/actions/users'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const page = async() => {
    const user =  await getLoggedInUserId()
  return (
    <div className='p-8'>
        <div className='flex items-start justify-between'>
          <h3 className="scroll-m-20 text-md text-yellow-500 font-semibold tracking-tight lg:text-md">
            {user.role}
         </h3>
         <Button asChild className='bg-yellow-500 hover:bg-yellow-500'>
           <Link href={`/dashboard/profile/update/${user.id}`}>
               Edit Profile
           </Link>
         </Button>
        </div> 
      <div className='grid grid-cols-1'>
         <div>
              <h3> Name: <span className='text-yellow-400 font-semibold'>{user?.name}</span></h3>
              <p> Email: <span className='text-yellow-400 font-semibold'>{user?.email}</span></p>
              <p>Phone Number: <span className='text-yellow-400 font-semibold'>{user?.phone}</span></p>
         </div>
      </div>
    </div>
  )
}

export default page