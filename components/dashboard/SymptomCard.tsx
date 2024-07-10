"use client"
import {  Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { Symptom } from '@prisma/client'

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
import { deleteSymptom } from '@/actions/symptom'

const SymptomCard = ({symptom}:{symptom:Symptom}) => {
  async function handleDelete(id:string){
    await deleteSymptom(id)
    toast.success("Symptom successfully deleted")
  }
  return (
            <div  className="border rounded-md flex justify-between items-center border-yellow-600 bg-white shadow-sm text-sm w-full dark:text-yellow-500 gap-4 py-3 px-2">
                <div className='flex items-center gap-3'>
                
                <h2>{symptom.title}</h2>
                </div>
                <div className='flex items-center '>
                  <Link className="text-yellow-500" href={`/dashboard/symptoms/update/${symptom.slug}`}>
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
                      <span className='text-xs'> Click yes to delete</span> {" "}Symptom
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel  className='text-yellow-500'>No</AlertDialogCancel>
                    <AlertDialogAction className='bg-yellow-500' onClick={()=>handleDelete(symptom.id)}>Yes</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
               </AlertDialog>
                </div>
            </div>
  )
}

export default SymptomCard