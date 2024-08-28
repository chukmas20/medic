"use client"
import {  PractiseFormProps } from "@/types/type";
import { useForm} from "react-hook-form"
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ArrayItemsInput from "../FormInputs/ArrayItemsInput";
import SelectInput from "../FormInputs/SelectInput";
import { StepFormProps } from "./BiodataForm";
import toast from "react-hot-toast";
import { updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";

export default function PractiseInfoForm(
    {
      page,
       title,
       description,
       nextPage,
       userId,
       formId,
       doctorProfile
      }:StepFormProps
  ) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [docs, setDocs] = useState([])
  const {practiseData, savedDbData, setPractiseData} = useOnboardingContext()
  const initialServices = doctorProfile.servicesOffered || savedDbData.servicesOffered;
  const [services, setServices] = useState(initialServices);
  const initialLanguages = doctorProfile.languagesSpoken;
  const [languages, setLanguages] = useState(initialLanguages);
  const defaultData = practiseData || savedDbData

  // console.log(services);
  // const [insuranceAccepted, setInsuranceAccepted] = useState("")
  // console.log(docs);


  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PractiseFormProps>({
      defaultValues: {
        hospitalAddress: doctorProfile.hospitalAddress || savedDbData.hospitalAddress,
        hospitalName: doctorProfile.hospitalName || savedDbData.hospitalName,
        hospitalEmailAddress: doctorProfile.hospitalEmailAddress || savedDbData.hospitalEmailAddress,
        hospitalContactNumber: doctorProfile.hospitalContactNumber || savedDbData.hospitalContactNumber,
        hospitalWebsite: doctorProfile.hospitalWebsite || savedDbData.hospitalWebsite,
        hospitalHoursOfOperation: doctorProfile.hospitalHoursOfOperation || savedDbData.hospitalHoursOfOperation,
        languagesSpoken: doctorProfile.languagesSpoken || savedDbData.languagesSpoken,
        servicesOffered: doctorProfile.servicesOffered || savedDbData.servicesOffered ,
        page: doctorProfile.page || savedDbData.page,
        hourlyWage: doctorProfile.hourlyWage || savedDbData.hourlyWage,
      }
  })

  async function onSubmit(data: PractiseFormProps){
     data.servicesOffered = services
     data.languagesSpoken = languages
     data.hospitalHoursOfOperation = Number(data.hospitalHoursOfOperation);
     data.hourlyWage = Number(data.hourlyWage)
     data.page = page;
     console.log(data);
    setIsLoading(true); 



    try {
      const res = await updateDoctorProfile(doctorProfile.id, data)
      setPractiseData(data);

      if(res?.status === 201){
       setIsLoading(false)
       //extract the profile form data  from the updated profile
       toast.success("Practise Information completed successfully")
       router.push(`${pathname}?page=${nextPage}`);
       console.log(res.data)
      }else{
       setIsLoading(false)
       throw new Error("Something went wrong");
      }
   } catch (error) {
     setIsLoading(false)
   }
  }

  const insuranceOptions = [
    {
      label:"Yes",
      value:"yes"
    },
    {
      label:"No",
      value:"no"
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
                 label="Hospital Name" 
                 name="hospitalName"
                 register={register}
                 errors={errors}
                 />
                 <TextInput 
                 label="Hospital Address" 
                 name="hospitalAddress"
                 register={register}
                 errors={errors}
                 />
                  <TextInput 
                 label="Hospital Contact Number" 
                 name="hospitalContactNumber"
                 register={register}
                 errors={errors}
                 />
                <TextInput 
                 label="Hospital Email Address" 
                 name="hospitalEmailAddress"
                 register={register}
                 errors={errors}
                 />
                  <TextInput 
                 label="Hospital Website (Optional)" 
                 name="hospitalWebsite"
                 register={register}
                 errors={errors}
                 isRequired={false}
                 />
                   <TextInput 
                    label="Hospital Hours of Operation" 
                    name="hospitalHoursOfOperation"
                    register={register}
                    errors={errors}
                    isRequired={false}
                    />
                     <TextInput 
                    label="Pay per consultation" 
                    name="hourlyWage"
                    type="number"
                    register={register}
                    errors={errors}
                    isRequired={false}
                    />
                 <ArrayItemsInput
                    setItems={setServices} 
                     items={services}
                     itemTitle="Hospital Services"
                      /> 
                       <ArrayItemsInput
                        setItems={setLanguages} 
                        items={languages}
                        itemTitle="Languages Spoken"
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