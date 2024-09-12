import { getBlogById, getBlogBySlug } from '@/actions/blog'
import { getDoctorBySlug } from '@/actions/users';
import { Blog } from '@prisma/client';
import React from 'react'

const page =async ({
    params:{slug}
}:{
  params:{slug:string}
}) => {
  const blog = (await getBlogBySlug(slug)) || null;
  console.log(blog?.data?.title)
  return (
     <div className='grid grid-cols-1 md:p-16 py-10 px-2'>
         <div className='flex items-center justify-between'>
         <h1 className="scroll-m-20 text-2xl font-bold mb-8 tracking-tight lg:text-5xl">
             {blog?.data?.title}
           </h1>
           <p className='lg:text-sm text-xs font-light shadow-lg shadow-slate-200 object-cover'>
             {blog?.data?.createdAt.toDateString()}
          </p>
         </div> 
          <p><img src={blog?.data?.imageUrl} className='rounded-lg w-full h-60 '/></p>
          <p className='mt-8'>{blog?.data?.body}</p>
     </div>
    
  )
}

export default page