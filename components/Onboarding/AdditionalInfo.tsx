"use client"
import { AdditionalFormProps } from "@/types/type";
import { useForm} from "react-hook-form"
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import { useRouter} from "next/navigation";

import MultipleFileUpload from "../FormInputs/MultipleFileUpload";
import TextAreaInput from "../FormInputs/TextAreaInput";
import { StepFormProps } from "./BiodataForm";
import { completeProfile } from "@/actions/onboarding";
import toast from "react-hot-toast";
import { useOnboardingContext } from "@/context/context";

export default function AdditionalInfo(
  {
    page,
     title,
     description,
     nextPage,
     formId,
     userId
    }:StepFormProps)
   {
    const {additionalData, savedDbData, setAdditionalData} = useOnboardingContext()

  const [isLoading, setIsLoading] = useState(false)
  const initialDocs = additionalData.additionalDocs || savedDbData.additionalDocs
  const [additionalDocs, setAdditionalDocs] = useState<File[]>(initialDocs)
  const defaultData = additionalData || savedDbData


  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AdditionalFormProps>({
    defaultValues: {
      educationalHistory: additionalData.educationalHistory || savedDbData.educationalHistory,
      research: additionalData.research || savedDbData.research,
      accomplishments: additionalData.accomplishments || savedDbData.accomplishments,
      additionalDocs: additionalData.additionalDocs || savedDbData.additionalDocs
    }
  })

  async function onSubmit(data: AdditionalFormProps){
     data.page = page
     console.log(data);
    setIsLoading(true);
 
    try {
      const res = await completeProfile(formId, data)
      setAdditionalData(data);
      if(res?.status === 201){
       setIsLoading(false)
       //extract the profile form data  from the updated profile
       //send a welcome Email

       toast.success("Onboarding completed successfully")
        // route to the login page
       router.push("/login");
      //  console.log(res.data)
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
                   <TextAreaInput 
                    label="Education History" 
                    name="educationalHistory"
                    register={register}
                    errors={errors}
                    /> 
                 <TextInput 
                 label="Research or Published Works" 
                 name="research"
                 register={register}
                 errors={errors}
                 />
                  <TextAreaInput 
                    label="Accomplishments" 
                    name="accomplishments"
                    register={register}
                    errors={errors}
                    /> 
                <MultipleFileUpload
                    label="Add Additional Documents (Maximum of 4 documents)" 
                    setFiles={setAdditionalDocs}
                     files={additionalDocs} 
                     endpoint="additionalDocs"
                   />

                  {/* <ArrayItemsInput
                    setItems={setOtherSpecialties} 
                     items={otherSpecialties}
                     itemTitle=" More Specialties"
                      />    */}
              <div>
                   <SubmitButton 
                     title="Finish" 
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