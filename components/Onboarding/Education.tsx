"use client"
import {  EducationFormProps } from "@/types/type";
import { useForm} from "react-hook-form"
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import { useRouter} from "next/navigation";

import SelectInput from "../FormInputs/SelectInput";
import ArrayItemsInput from "../FormInputs/ArrayItemsInput";
import MultipleFileUpload, { File } from "../FormInputs/MultipleFileUpload";
import { StepFormProps } from "./BiodataForm";
import { updateDoctorProfile } from "@/actions/onboarding";
import toast from "react-hot-toast";
import { useOnboardingContext } from "@/context/context";

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
   

  const {educationData,savedDbData, setEducationData} = useOnboardingContext()
  const [isLoading, setIsLoading] = useState(false)
  const initialSpecialities = educationData.otherSpecialties || savedDbData.otherSpecialities;
  const [otherSpecialties, setOtherSpecialties] = useState(initialSpecialities)

  const initialDocs = educationData.boardCertificates || savedDbData.boardCertificates;
  const [docs, setDocs] = useState<File[]>(initialDocs); 
  const defaultData = educationData || savedDbData

  console.log(docs);



  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EducationFormProps>({
    defaultValues: {
       medicalSchool: educationData.medicalSchool || savedDbData.medicalSchool,
       graduationYear: educationData.graduationYear || savedDbData.graduationYear,
       primarySpecialization: educationData.primarySpecialization || savedDbData.primarySpecialization,
       otherSpecialties: educationData.otherSpecialties || savedDbData.otherSpecialties ,
       boardCertificates: educationData.boardCertificates || savedDbData.boardCertificates,
    }
  })
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
       setEducationData(data)
      if(res?.status === 201){
       setIsLoading(false)
       //extract the profile form data  from the updated profile
       toast.success("Education information completed successfully")
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
   
  const educationValues = [
    {
        id:1,
        title:"Dentist",
    },
    {
        id:2,
        title:"ENT"
    },
    {
      id:3,
      title:"Medical"
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
                 <SelectInput
                  label="Select Primary Specialization" 
                  register={register}
                  name="primarySpecialization"
                   errors={errors}
                   optionValues={educationValues} 
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