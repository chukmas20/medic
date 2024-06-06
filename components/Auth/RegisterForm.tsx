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

export default function RegisterForm({role = "USER"}:{role?:UserRole}) {
  const [isLoading, setIsLoading] = useState(false)
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
    data.role = role
    try {
      const user = await createUser(data)
      if(user && user.status === 200){
        console.log("User Created Successfully")
        reset();
        setIsLoading(false)
        toast.success("Account created Successfully");
        console.log(user.data)
      }else{
        console.log(user.error)
      }
     
    } catch (error) {
      console.log(error)
    }
  }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://freepngimg.com/thumb/health/22943-8-health-image-thumb.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
               Create New Account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  <TextInput 
                 label="Password" 
                 name="password"
                 type="password"
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
        </div>
    )
  }