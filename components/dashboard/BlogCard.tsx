"use client"
import {  Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { deleteServices, ServiceWithDoctorProfileCount } from '@/actions/services'
import toast from 'react-hot-toast'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteBlog } from '@/actions/blog'
import { Blog } from '@prisma/client'

const BlogCard = ({blog}:{blog: Blog}) => {
  async function handleDelete(id:string){
    await deleteBlog(id)
    toast.success("Service successfully deleted")
  }
  return (
       <>
          <div  className="border rounded-md flex justify-between items-center border-yellow-600 bg-white shadow-sm text-sm w-full dark:text-yellow-500 gap-4 py-3 px-2">
                <div className='flex items-center gap-3'>
                <img 
                  src={blog.imageUrl} width={512} height={512}  alt={blog.title}
                  className="w-14 h-auto"
                />
                <h2>{blog.title}</h2>
                </div>
                <div className='flex items-center '>
                  <Link className="text-yellow-500" href={`/dashboard/blog/update/${blog.slug}`}>
                    <Pencil  className='w-4 h-4' />
                  </Link>
                <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className='text-red-600 bg-slate-100 hover:bg-slate-200'>
                      <Trash  className='w-4 h-4'/>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-yellow-500'>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription  className='text-yellow-500'>
                      <span className='text-xs'> Click yes to delete</span> {" "}Blog
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel  className='text-yellow-500'>No</AlertDialogCancel>
                    <AlertDialogAction className='bg-yellow-500' onClick={()=>handleDelete(blog?.id)}>Yes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
               </AlertDialog>
             </div>
            </div>
            {/* <h6><span className="text-xs text-red-500"> posted: {blog?.createdAt.toDateString()}</span></h6>
            <h6><span className="text-xs text-red-500"> Updated: {blog?.updatedAt.toDateString()}</span></h6> */}

       </>
           
  )
}

export default BlogCard