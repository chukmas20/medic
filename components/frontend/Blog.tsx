import { getBlogs } from '@/actions/blog'
import React from 'react'
import BlogCardFrontend from './BlogCardFrontend'

const Blog = async() => {
  const blogs = (await getBlogs()).data || []

  return (
    <div className='grid md:grid-cols-3 grid-cols-1'>
         {blogs?.map((blog) => (
            <BlogCardFrontend  key={blog.title} blog={blog}  />
        ))}
    </div>
  )
}

export default Blog