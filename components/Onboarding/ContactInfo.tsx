"use client"
import {  ContactInfoFormProps } from "@/types/type";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form"
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { StepFormProps } from "./BiodataForm";
import { updateDoctorProfile } from "@/actions/onboarding";

export default function ContactInfo(
    {
      page, 
      title,
      description,
      formId,
      userId,
      nextPage
    }:
      StepFormProps) {
   
  const [isLoading, setIsLoading] = useState(false)

 
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ContactInfoFormProps>()

  async function onSubmit(data: ContactInfoFormProps){
     setIsLoading(true);
     data.page = page
     console.log(data);
    // setIsLoading(true);  
    try {
      const res = await updateDoctorProfile(formId, data)
      if(res?.status === 201){
       setIsLoading(false)
       //extract the profile form data  from the updated profile
       router.push( `/onboarding/${userId}?page=${nextPage}`);
       console.log(res.data)
      }else{
       setIsLoading(false)
       throw new Error("Something went wrong");
      }
   } catch (error) {
     setIsLoading(false)
   }
  
    // email: string;
    // phone: string;
    // country: string;
    // city: string;
    // state: string;
  }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
             <div className="text-center ">
                 <h1 className="font-bold text-2xl mb-2 max-w-6xl">{title}</h1>
                 <p className="text-sm text max-w-6xl">{description}</p>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
               <TextInput 
                 label="Email Address" 
                 name="email"
                 register={register}
                 errors={errors}
                 />
                 <TextInput 
                 label="Phone" 
                 name="phone"
                 register={register}
                 errors={errors}
                 />
              <TextInput 
                 label="Country" 
                 name="country"
                 register={register}
                 errors={errors}
                 /> 
                 <TextInput 
                 label="City" 
                 name="city"
                 register={register}
                 errors={errors}
                 /> 
                 <TextInput 
                 label="State" 
                 name="state"
                 register={register}
                 errors={errors}
                 /> 
                
                 
                  
              <div>
                   <SubmitButton 
                     title="Save and Continue" 
                     buttonType="submit" loadingTitle="Please Wait..." isLoading={isLoading}   />
              </div>
            </form>
            {/* <p className="mt-10 text-center text-sm text-gray-500">
               Already have an account?{' '}
              <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                 Sign in
              </Link>
            </p> */}
        </div>
    )
  }