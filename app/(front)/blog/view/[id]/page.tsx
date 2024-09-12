import { getBlogById } from '@/actions/blog'
import { getDoctorById } from '@/actions/users'
import React from 'react'

const page = async({
    params:{id},
   }:{params:{id:string}}) => {
    const blog = (await getBlogById(id)) 
    console.log(blog)
    console.log(id)

  return (
    <div>
          <p> Hello Lads</p>
    </div>
  )
}

export default page