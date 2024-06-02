"use client";

import Link from "next/link";
import TextInput from "../FormInputs/TextInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInputProps } from "@/types/type";
import SubmitButton from "../FormInputs/SubmitButton";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<LoginInputProps>()
    async function onSubmit(data: LoginInputProps){
      console.log(data)
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
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                    <a href="#" className="font-semibold text-yellow-600 hover:text-yellow-900">
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