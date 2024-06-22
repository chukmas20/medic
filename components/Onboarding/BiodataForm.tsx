"use client"
import { BioDataFormProps, RegisterInputProps } from "@/types/type";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form"
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { createUser } from "@/actions/users";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import DatePickerInput from "../FormInputs/DatePickerInput";
import RadioInput from "../FormInputs/RadioInput";
import { Button } from "flowbite-react";
import { generateTrackingNumber } from "@/lib/generateTracking";
import { createDoctorProfile } from "@/actions/onboarding";



export type StepFormProps ={
  page: string;
  title: string;
  description: string;
  userId?: string;
  nextPage?: string;
  
}
export default function BiodataForm({
  page, 
  title,
  description,
  nextPage,
  userId,
 }:StepFormProps ){
  const [isLoading, setIsLoading] = useState(false)
  const [dob, setDob] = useState<Date>()
  const [profileImage, setProfileImage] = useState("https://e7.pngegg.com/pngimages/644/838/png-clipart-physician-patient-cartoon-doctor-doctor-cartoon-character-child-thumbnail.png")

  const genderOptions = [
    {
      label:"Male",
       value:"male",
     },
     {
      label:"FeMale",
       value:"female",
     },
     {
      label:"Prefer not to say",
       value:"others",
     },

]

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BioDataFormProps>()
   
  async function onSubmit(data: BioDataFormProps){
      setIsLoading(true);
     if(!dob){
        toast.error("Date of birth is required")
        return;
     }
    
      data.userId = userId
      data.dob = dob
      data.trackingNumber = generateTrackingNumber()
      data.page = page
      console.log(data);
    try {
      const newProfile   = await createDoctorProfile(data)
      setIsLoading(false)
      router.push(
        `/onboarding/${userId}?page=${nextPage}&&tracking=${data.trackingNumber}`
      )
      console.log(newProfile);
    } catch (error) {
       setIsLoading(false)
      console.log(error)
    }
    
  }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
             <div className="text-center ">
                 <h1 className="font-bold text-2xl mb-2 max-w-6xl">{title}</h1>
                 <p className="text-sm text max-w-6xl">{description}</p>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
               <TextInput 
                 label="First Name" 
                 name="firstName"
                 register={register}
                 errors={errors}
                 />
                 <TextInput 
                 label="Other Names" 
                 name="middleName"
                 register={register}
                 isRequired={false}
                 errors={errors}
                 />
              <TextInput 
                 label="Last Name" 
                 name="lastName"
                 register={register}
                 errors={errors}
                 />  
                   <DatePickerInput
                   date={dob}  
                   setDate={setDob} 
                   title="Date of Birth"  
                  />
                 
                  <RadioInput 
                   errors={errors}
                    name="gender" 
                    register={register} title="Gender"
                    radioOptions={genderOptions}
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