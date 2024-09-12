import { getBlogBySlug } from '@/actions/blog'
import { getServiceBySlug } from '@/actions/services'
import BlogsForm from '@/components/dashboard/BlogsForm'
import ServiceForm from '@/components/dashboard/ServiceForm'
import React from 'react'

const page = async({
   params:{slug}
    }:{
  params:{slug:string}
  }) => {
  const blog =( await getBlogBySlug(slug))?.data
  return (
    <div>
        {blog && blog.id && <BlogsForm  title='Update Blog'  initialData={blog}   />}
    </div>
  )
}

export default page