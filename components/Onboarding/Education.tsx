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
import { updateDoctorProfile } from "@/actions/onboarding";

export default function Education(
  {
    page,
     title,
     description,
     nextPage,
     userId,
     formId
    }:StepFormProps)

   {
    const [docs, setDocs] = useState([
      {
         size: 15634,
 
         title: "namecheap-order-146554707.pdf",
        
          url: "https://utfs.io/f/d72b32ef-6be5-471d-9bff-2afc3cdbdc2d-y85f79.pdf"
        },
        {
          size: 15992,
  
          title: "namecheap-order-146554670.pdf",
         
           url: "https://utfs.io/f/038992e7-a05e-4144-82db-66fa1221e65a-y85eme.pdf"
         },
         {
          size: 16334,
  
          title: "namecheap-order-146554312.pdf",
         
           url: "https://utfs.io/f/72f79da4-d10d-4116-8e39-383981388ddd-y85c97.pdf"
         },
      ]);

     
    console.log(docs);

  const [isLoading, setIsLoading] = useState(false)
  const [otherSpecialties, setOtherSpecialties] = useState([])

 
 


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
     data.otherSpecialties = otherSpecialties
     data.boardCertificates =  docs.map((doc)=> doc.url);
     data.graduationYear = Number(data.graduationYear)
     console.log(data);
      setIsLoading(true);

    //  medicalSchool: string;
    // graduationYear: number;
    // primarySpecialization?: string;
    // otherSpecialties?: string[];
    // boardCertificates: string[];
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
                    type="number"
                    register={register}
                    errors={errors}
                 />
                 {/* <SelectInput
                  label="Select Primary Specialization" 
                  register={register}
                  name="primarySpecialization"
                   errors={errors}
                   /> */}
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