"use client"
import {  Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { deleteServices, ServiceWithDoctorProfileCount } from '@/actions/services'
import toast from 'react-hot-toast'
import { Service } from '@prisma/client'

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

const ServiceCard = ({service}:{service:ServiceWithDoctorProfileCount}) => {
  async function handleDelete(id:string){
    await deleteServices(id)
    toast.success("Service successfully deleted")
  }
  return (
            <div  className="border rounded-md flex justify-between items-center border-yellow-600 bg-white shadow-sm text-sm w-full dark:text-yellow-500 gap-4 py-3 px-2">
                <div className='flex items-center gap-3'>
                <img 
                  src={service.imageUrl} width={512} height={512}  alt={service.title}
                  className="w-14 h-auto"
                />
                <h2>{service.title}</h2>
                </div>
                <div className='flex items-center '>
                  <Link className="text-yellow-500" href={`/dashboard/services/update/${service.slug}`}>
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
                      <span className='text-xs'> Click yes to delete</span> {" "}Service
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel  className='text-yellow-500'>No</AlertDialogCancel>
                    <AlertDialogAction className='bg-yellow-500' onClick={()=>handleDelete(service.id)}>Yes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
               </AlertDialog>
                </div>
            </div>
  )
}

export default ServiceCard