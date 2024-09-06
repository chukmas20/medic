"use client";

import TextInput from "../FormInputs/TextInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordResetProps } from "@/types/type";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { ForgotPasswordReset } from "@/actions/forgot-password";


export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false)
    // const [email, setEmail] = useState('');
    const router = useRouter();
    const [showNotification, setShowNotification] = useState(false)
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const returnUrl = searchParams.get("returnUrl")||"/dashboard"

    const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
    } = useForm<PasswordResetProps>()

    async function onSubmit(data: PasswordResetProps){
      console.log(data)
      try {
        setIsLoading(true);
        await ForgotPasswordReset(data)
        toast.success("Password reset link has been sent to your email inbox")
        reset();
        setShowNotification(true);
        setIsLoading(false);

      } catch (error) {
        setIsLoading(false);
        console.error("Network Error:", error);
        toast.error("Check your credentials");
        setShowNotification(false)
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
               Change Your Password
            </h2>
            <p className="text-xs mt-3"> A link will be sent to your email address</p>
          </div>
  
          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {showNotification && (
                 <Alert  className="bg-green-300" icon={HiInformationCircle}>
                 <span>
                   We have sent a password reset link to your email
                 </span>
                 {" "} 
              </Alert>
              )}
              
            <TextInput
                 label="Email Address" 
                 name="email"
                 type="email"
                 register={register}
                 errors={errors}
                 />
              <div>
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