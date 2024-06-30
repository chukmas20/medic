"use client"
import {  EducationFormProps } from "@/types/type";
import { useForm} from "react-hook-form"
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";


import RadioInput from "../FormInputs/RadioInput";
import { Checkbox } from "../ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { StepFormProps } from "./BiodataForm";

export default function Availability(
    {
        page,
         title,
         description,
         nextPage
        }:StepFormProps)
   {
    const [otherSpecialties, setOtherSpecialties] = useState([]);
    console.log(otherSpecialties);
  const [isLoading, setIsLoading] = useState(false)
 
  const [docs, setDocs] = useState([
  ])
  console.log(docs);


  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EducationFormProps>()
  async function onSubmit(data: EducationFormProps){
     data.page = page
     console.log(data);
    setIsLoading(true); 
  }

  const availabilityOptions = [
     {
        label:"Weekly",
        value:"weekly"
     },
     {
        label:"Specific dates (Your availability dates)",
        value:"specific"
     },
  ]
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
             <div className="text-center ">
                 <h1 className="font-bold text-2xl mb-2 max-w-6xl">{title}</h1>
                 <p className="text-sm text max-w-6xl">{description}</p>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
               <TextInput 
                 label="Duration of Meetings" 
                 name="meetingDuration"
                 register={register}
                 errors={errors}
                 />
                <RadioInput
                   errors={errors}
                    name="availabilityType"
                    register={register} 
                    title="When are you going  to be available"
                    radioOptions={availabilityOptions}
                    />
                    <div className="col-span-full ">
                        <h2> Describe your weekly schedule:</h2>
                        <div className="border py-6 px-4 border-yellow-200 flex items-center justify-between">
                            {/* checkbox */}
                            <div className="mr-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="day" />
                                <label
                                    htmlFor="terms"
                                    className="text-sm font-medium  leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Monday
                                </label>
                                </div>
                            </div>
                            {/* time */}
                             <div className="grid grid-cols-2 gap-4 px-2 ">
                                <div className="grid grid-cols-3 gap-2">
                                <Select>
                                    <SelectTrigger id="month">
                                        <SelectValue placeholder="HR" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <SelectItem
                                           key={i}
                                           value={`${(i + 1).toString().padStart(2,"0")}`}
                                           >
                                           {(i + 1).toString().padStart(2,"0")}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger id="year">
                                        <SelectValue placeholder="MIN" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {Array.from({ length: 59 }, (_, i) => (
                                        <SelectItem
                                           key={i}
                                           value={`${(i + 1).toString().padStart(2,"0")}`}
                                           >
                                           {(i + 1).toString().padStart(2,"0")}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <Select>
                                    <SelectTrigger id="year">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       
                                        <SelectItem value="1" >AM </SelectItem>
                                        <SelectItem value="2" >PM </SelectItem>
         
                                    </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                <Select>
                                    <SelectTrigger id="month">
                                        <SelectValue placeholder="month" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <SelectItem
                                           key={i}
                                           value={`${(i + 1).toString().padStart(2,"0")}`}
                                           >
                                           {(i + 1).toString().padStart(2,"0")}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger id="year">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {Array.from({ length: 59 }, (_, i) => (
                                        <SelectItem
                                           key={i}
                                           value={`${(i + 1).toString().padStart(2,"0")}`}
                                           >
                                           {(i + 1).toString().padStart(2,"0")}
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <Select>
                                    <SelectTrigger id="year">
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent> 
                                        <SelectItem value="1" >AM </SelectItem>
                                        <SelectItem value="2" >PM </SelectItem>
         
                                    </SelectContent>
                                    </Select>
                                </div>                                       
                             </div>
                            {/* add window */}
                            <div className="">
                               <Button   className="bg-yellow-600 text-sm">
                                  <Plus className="w-3 h-3 flex-shrink-0 " />
                                  Add Window
                               </Button>
                            </div>
                        </div>
                    </div>
              <div >
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