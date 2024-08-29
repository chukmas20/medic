"use client";
import { cn } from '@/lib/utils'
import { DoctorStatus } from '@prisma/client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ShadSelectInput from '../FormInputs/ShadSelectInput';
import { Loader2 } from 'lucide-react';
import { updateDoctorProfile } from '@/actions/onboarding';
  

const ApproveBtn = ({
    status,
    profileId,
}:{
status:DoctorStatus;
profileId: string | undefined;
}) => {
    const router = useRouter()
    const options =[
        {
            label:"PENDING",
            value:"PENDING"
        },
        {
            label:"APPROVED",
            value:"APPROVED"
        },
        {
            label:"REJECTED",
            value:"REJECTED"
        },
    ]
    const initialOption = status;
    const [selectedOption, setSelectedOption] = useState(initialOption)
    const [loading, setLoading] = useState(false)
    console.log(selectedOption)

    async function updateStatus() {
        setLoading(true)
        const data = {
            status: selectedOption,
        }
        try {
           const res = await updateDoctorProfile(profileId, data)
           if(res?.status === 201){
            toast.success("Doctor status changed successfully")
            setLoading(false)
            window.location.reload()
           }
        } catch (error) {
            setLoading(true)
            console.log(error)
        }
    }

  return (
    <Dialog>
    <DialogTrigger asChild>
    <button 
     className={cn("py-2 px-2 text-xs rounded-md text-white",status ==="APPROVED"?"bg-green-500":
        status ==="PENDING"?"bg-orange-400":"bg-red-700"
     )}>
        {status}
    </button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Approve Doctor</DialogTitle>
        <DialogDescription>
           <div className='py-4'>
              <ShadSelectInput
                label='Status'
                optionTitle='Status'
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
           </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        {loading ? (
          <Button disabled>
             <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          </Button>
        ):(
            <Button type="button" onClick={updateStatus}>Save changes</Button>

        )}
      </DialogFooter>
    </DialogContent>
  </Dialog>
  
  )
}

export default ApproveBtn