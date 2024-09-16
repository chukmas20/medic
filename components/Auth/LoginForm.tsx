"use client";

import Link from "next/link";
import TextInput from "../FormInputs/TextInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInputProps } from "@/types/type";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";


export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [showNotification, setShowNotification] = useState(false)
    const router = useRouter();
    const searchParams = useSearchParams()
    const returnUrl = searchParams.get("returnUrl")||"/dashboard"

    const {
      register,
      handleSubmit,
      reset,
      watch,
      formState: { errors },
    } = useForm<LoginInputProps>()
    async function onSubmit(data: LoginInputProps){
      console.log(data)
      try {
        setIsLoading(true);
        console.log("Attempting to sign in with credentials:", data);
        const loginData = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        console.log("SignIn response:", loginData);
        if (loginData?.error) {
          setIsLoading(false);
          toast.error("Sign-in error: Check your credentials");
          setShowNotification(true);
        } else {
          // Sign-in was successful
          setShowNotification(false);
          reset();
          setIsLoading(false);
          toast.success("Login Successful");
          router.push(returnUrl);
          // router.push("/dashboard")

        }
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
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {showNotification && (
            <Alert color="failure" className="bg-red-100" icon={HiInformationCircle}>
              <span className="font-medium text-red-600">Sign-in error!</span> Please Check
              your credentials
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="/forgot-password" className="font-semibold text-yellow-600 hover:text-yellow-900">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
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
              </div>
  
              <div>
                <SubmitButton 
                 title="Log in"
                  buttonType="submit" 
                  loadingTitle="Please wait..." 
                  isLoading={isLoading}
               />
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
               Don't have an account?{' '}
              <Link href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                 Sign Up
              </Link>
            </p>
          </div>
        </div>
    )
  }