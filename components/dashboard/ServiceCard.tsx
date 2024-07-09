import { ServiceProps } from '@/types/type'
import { Briefcase, Dot, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const ServiceCard = ({service}:{service:ServiceProps}) => {
  return (
            <div  className="border rounded-md flex  items-center border-yellow-600 bg-white shadow-sm text-sm w-full dark:text-yellow-500 gap-4 py-3 px-2">
                <img 
                  src={service.imageUrl} width={512} height={512}  alt={service.title}
                  className="w-14 h-auto"
                />
                <h2>{service.title}</h2>
                <div className='flex items-center '>
                  <Link className="text-yellow-500" href={`/dashboard/services/update/${service.slug}`}>
                    <Pencil  className='w-4 h-4' />
                  </Link>
                  <Button   className='text-red-600 bg-slate-100 hover:bg-slate-200'>
                    <Trash  className='w-4 h-4' />
                  </Button>
                </div>
            </div>
  )
}

export default ServiceCard