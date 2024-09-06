"use client";

import React, { useState } from 'react'
import { useRouter, useSearchParams  } from 'next/navigation';
import { PasswordChangeProps} from '@/types/type';
import { useForm } from 'react-hook-form';
import SubmitButton from '../FormInputs/SubmitButton';
import toast from 'react-hot-toast';
import { resetPassword } from '@/actions/forgot-password';


const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') as string;
  const id = searchParams.get('id') as string;

    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
      } = useForm<PasswordChangeProps>()
      async function onSubmit(data: PasswordChangeProps){
        console.log(data)
        try {
          setIsLoading(true);
          const response = await resetPassword(token, data) 
          console.log(response)
          toast.success("Password successfully changed")
          reset();
          setIsLoading(false)   
        } catch (error) {
          setIsLoading(false);
          console.error("Network Error:", error);
          toast.error("Its seems something is wrong with your Network");
        }
      }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img 
                    className=" md:w-38 md:h-28 "
                    src="https://utfs.io/f/9e828e54-7cd7-4bea-9f47-f2844c4fe763-1s9otp.png" 
                  />
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
               Reset Your Password
            </h2>
          </div>
  
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
            <div className="mt-2">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                   New Password
                  </label>
                <input
                   {...register("password", {required:true})}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors[`password`] && (
                     <span className="text-red-600 text-sm">Password is required</span>)
                   } 
                   </div>
                <div>
                <SubmitButton 
                 title="Submit"
                  buttonType="submit" 
                  loadingTitle="Please wait..." 
                  isLoading={isLoading}
                 />
              </div>
            </form>
          </div>
        </div>
  )
}

export default ResetPassword