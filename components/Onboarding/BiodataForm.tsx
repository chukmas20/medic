"use client"
import { RegisterInputProps } from "@/types/type";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form"
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { createUser } from "@/actions/users";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function BiodataForm(
  ) {
   
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterInputProps>()
  async function onSubmit(data: RegisterInputProps){
    // console.log(data);
    setIsLoading(true);
   
    
  }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
             <div className="text-center mb-[30px]">
                 <h1 className="font-bold text-2xl max-w-6xl">Bio-Data</h1>
                 <p className="text-sm text max-w-6xl">Please fill the form below to proceed</p>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" >
               <TextInput 
                 label="First Name" 
                 name="firstName"
                 register={register}
                 errors={errors}
                 />
              <TextInput 
                 label="Last Name" 
                 name="lastName"
                 register={register}
                 errors={errors}
                 />
              <TextInput 
                 label="Email Address" 
                 name="email"
                 type="email"
                 register={register}
                 errors={errors}
                 />
                 <TextInput 
                 label="Phone Number" 
                 name="phone"
                 type="tel"
                 register={register}
                 errors={errors}
                 />
              <div>
                   <SubmitButton 
                     title="Create Account" 
                     buttonType="submit" loadingTitle="Please Wait..." isLoading={isLoading}   />
              </div>
            </form>
  
           
            <p className="mt-10 text-center text-sm text-gray-500">
               Already have an account?{' '}
              <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                 Sign in
              </Link>
            </p>
        </div>
    )
  }