"use client";

import {  Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { deleteSpecialty } from '@/actions/services';
import toast from 'react-hot-toast';
import { Speciality } from '@prisma/client';
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


const SpecialtyCard = ({specialty}:{specialty:Speciality}) => {
  async function handleDelete(id:string){
    await deleteSpecialty(id)
    toast.success("Specialty successfully deleted")
  }
  return (
            <div  className="border rounded-md flex justify-between px-4 items-center border-yellow-600 bg-white shadow-sm text-sm w-full dark:text-yellow-500 gap-4 py-3 px-2">
                <h2>{specialty.title}</h2>
                <div className='flex items-center '>
                  <Link className="text-yellow-500" href={`/dashboard/services/update/${specialty.slug}`}>
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
            <span className='text-xs'> Click yes to delete</span> {" "}Specialty
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel  className='text-yellow-500'>No</AlertDialogCancel>
          <AlertDialogAction className='bg-yellow-500' onClick={()=>handleDelete(specialty.id)}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
                </div>
            </div>
  )
}

export default SpecialtyCard;