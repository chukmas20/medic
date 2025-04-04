import { getBlogs } from '@/actions/blog'
import BlogCard from '@/components/dashboard/BlogCard'
import NewButton from '@/components/dashboard/Doctor/NewButton'
import PanelHeader from '@/components/dashboard/Doctor/PanelHeader'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LayoutGrid, Pencil } from 'lucide-react'
import React from 'react'

const page = async () => {
  const blogs = (await getBlogs()).data || []
  console.log(blogs)
  return (
    <div>
         {/* Header */}
         {/* 2 panels */}
         <div className='grid grid-cols-12'>
            <div className='lg:col-span-4 col-span-full'>
            <div className='flex items-center justify-between'>
            <PanelHeader title='Blogs' count={(blogs.length).toString().padStart(2,"0")} icon={Pencil} />
            <div className='lg:hidden'>
             <NewButton title='New Blog'  href='/dashboard/blog/new'/>
            </div>
            </div>
            <ScrollArea className="h-96 px-4 py-6 rounded-md w-full border bg-yellow-100 ">
          {blogs?.map((blog) => (
            <BlogCard  key={blog.title} blog={blog} />
        ))}
         </ScrollArea>
            </div>
            <div className='lg:col-span-8 col-span-full hidden lg:block'>
            <div className='py-3 px-6 border-b border-gray-200 flex items-center justify-end' >
        <div className='flex items-center gap-1'>
          <NewButton title='New Blog'  href='/dashboard/blog/new'/>
        </div>
       </div>
       <div className='flex justify-center items-center h-1/2'>
     <div className='text-center flex flex-col text-sm items-center gap-1 border border-yellow-200 px-3 py-3 shadow-md'>
       <LayoutGrid />
        <div className='py-3'>
        <p> {(blogs.length).toString().padStart(2,"0")} </p>
        </div>
        <NewButton title='New Blog'  href='/dashboard/blog/new'/>
     </div>
    </div>
        </div>
        </div> 
    </div>
  )
}

export default page