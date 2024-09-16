"use client"
import { BioDataFormProps,} from "@/types/type";
import { useForm, SubmitHandler } from "react-hook-form"
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { usePathname, useRouter,} from "next/navigation";
import DatePickerInput from "../FormInputs/DatePickerInput";
import RadioInput from "../FormInputs/RadioInput";
import { generateTrackingNumber } from "@/lib/generateTracking";
import { createDoctorProfile, updateDoctorProfile } from "@/actions/onboarding";
import { useOnboardingContext } from "@/context/context";
import { DoctorProfile, Speciality } from "@prisma/client";



export type StepFormProps ={
  page: string;
  title: string;
  description: string;
  userId?: string;
  nextPage?: string;
 formId?: string;
 specialties?: Speciality[];
 doctorProfile: DoctorProfile
  
}
export default function BiodataForm({
  page, 
  title,
  description,
  nextPage,
  userId,
  formId = "",
  doctorProfile
 }:StepFormProps ){

  const pathname = usePathname()

  //Get Context Data
  const {trackingNumber, doctorProfileId,setTrackingNumber, setDoctorProfileId  } = useOnboardingContext()
  const [isLoading, setIsLoading] = useState(false)

  // const [initialData, setInitialData] = useState<BioDataFormProps>()
  const {bioData, savedDbData, setBioData} = useOnboardingContext()
  const initialDateOfBirth = doctorProfile.dob || savedDbData.dob;
  const [dob, setDob] = useState<Date>(initialDateOfBirth)
  const defaultData = bioData || savedDbData;


  console.log(savedDbData)

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
  } = useForm<BioDataFormProps>({
    defaultValues: {
      firstName:doctorProfile.firstName || savedDbData.firstName,
      lastName:doctorProfile.lastName || savedDbData.lastName,
      middleName:doctorProfile.middleName|| savedDbData.middleName,
      trackingNumber:doctorProfile.trackingNumber || savedDbData.trackingNumber,
      gender:doctorProfile.gender || savedDbData.gender,
      page:doctorProfile.page || savedDbData.page,
      dob:doctorProfile.dob || savedDbData.dob,

    }
  })
  console.log(trackingNumber)
   
  async function onSubmit(data: BioDataFormProps){
      setIsLoading(true);
     if(!dob){
        toast.error("Date of birth is required")
        setIsLoading(false);
        return;
     }
    
      data.userId = userId as string
      data.dob = dob
      data.trackingNumber = generateTrackingNumber()
      data.page = page
      console.log(data);
    try {
      if(formId){
        const res   = await updateDoctorProfile(formId,data)
        if(res && res.status === 201){
          setIsLoading(false);
          toast.success("Doctor Bio data updated successfully");
          // const {data }= res
          setTrackingNumber(res.data?.trackingNumber ?? "")
          setDoctorProfileId(res.data?.id ?? "")
         
          //Route to next form
          router.push(`/onboarding/${userId}?page=${nextPage}`);
          console.log(res.data);
        }else{
          setIsLoading(false)
          throw new Error("Something went wrong");
         }  
      }else{
        const res   = await createDoctorProfile(data)
        //Save data to context API
        setBioData(data)
        setIsLoading(true)
        if(res.status === 201){
          toast.success("Doctor Profile Created");
          setIsLoading(false);
          // const {data }= res
          setTrackingNumber(res.data?.trackingNumber ?? "")
          setDoctorProfileId(res.data?.id ?? "")
               
          router.push(`${pathname}?page=${nextPage}`);
          console.log(res.data);
        }else{
          setIsLoading(false)
          throw new Error("Something went wrong");
         }  
      }
      //save data
     
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