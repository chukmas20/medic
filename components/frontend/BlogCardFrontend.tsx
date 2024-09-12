"use client"
import {  ArrowRight  } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


import { Blog } from '@prisma/client'

const BlogCardFrontend = ({
  blog,
}:{
blog: Blog
}) => {
  return (
       
          <div className='p-4 '>
                <div className="hover:shadow-lg shadow-slate-300 ">
                  <div className='px-2 py-2'>
                  <img 
                    src={blog.imageUrl}   alt={blog.title}
                    className="w-full h-64 rounded-lg"
                  />
                   <p className='font-semibold text-md text-yellow-600'>
                      {blog.createdAt.toLocaleDateString()}
                    </p>
                    <h2 className='font-bold text-sm'>{blog.title}</h2>
                    <p className='line-clamp-2 font-normal'>{blog.body}</p>
                    <Link href={`/blog/${blog.slug}`} className='text-yellow-600 cursor-pointer text-sm font-bold mt-4 flex items-center gap-2'>
                        Read More  <ArrowRight className='h-4 w-4' />
                    </Link>
                 </div>
                    
               </div>
                 
            </div>                 
     )
  }

export default BlogCardFrontend 