"use client"
import {  EducationFormProps } from "@/types/type";
import { useForm} from "react-hook-form"
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import SelectInput from "../FormInputs/SelectInput";
import ArrayItemsInput from "../FormInputs/ArrayItemsInput";
import MultipleFileUpload from "../FormInputs/MultipleFileUpload";
import { StepFormProps } from "./BiodataForm";

export default function Education(
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
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
             <div className="text-center ">
                 <h1 className="font-bold text-2xl mb-2 max-w-6xl">{title}</h1>
                 <p className="text-sm text max-w-6xl">{description}</p>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
               <TextInput 
                 label="Medical School" 
                 name="medicalSchool"
                 register={register}
                 errors={errors}
                 />
                 <TextInput 
                 label="Graduation Year" 
                 name="graduationYear"
                 register={register}
                 errors={errors}
                 />
                 <SelectInput
                  label="Select Primary Specialization" 
                  register={register}
                  name="primarySpecialization"
                   errors={errors}
                   />
                  <ArrayItemsInput
                    setItems={setOtherSpecialties} 
                     items={otherSpecialties}
                     itemTitle=" More Specialties"
                      />

                   <MultipleFileUpload  label="Upload Certificates (Maximum of 4 documents)" 
                    setFiles={setDocs} files={docs} endpoint="doctorProfessionalDocs"
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