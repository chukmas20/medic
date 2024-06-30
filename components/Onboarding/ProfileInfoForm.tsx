"use client"
import {  ProfileInfoFormProps, } from "@/types/type";
import { useForm } from "react-hook-form"
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import toast from "react-hot-toast";
import { useRouter} from "next/navigation";
import DatePickerInput from "../FormInputs/DatePickerInput";
import TextAreaInput from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import { StepFormProps } from "./BiodataForm";
import { useOnboardingContext } from "@/context/context";
import { updateDoctorProfile } from "@/actions/onboarding";

export default function ProfileInfoForm(
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
  // const {trackingNumber, doctorProfileId } = useOnboardingContext();
  const {profileData, savedDbData, setProfileData} = useOnboardingContext()
  const initialProfileImage = profileData.profilePicture || savedDbData.profilePicture
  const [profileImage, setProfileImage] = useState(initialProfileImage)
  const initilaExpiryDate = profileData.medicalLicenseExpiry || savedDbData.medicalLicenseExpiry;
  const [expiry, setExpiry] = useState<Date>(initilaExpiryDate)
  const defaultData = profileData || savedDbData



  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProfileInfoFormProps>({
    defaultValues: {
      bio:profileData.bio || savedDbData.bio,
      medicalLicense:profileData.medicalLicense || savedDbData.medicalLicense,
      yearsOfExperience:profileData.yearsOfExperience || savedDbData.yearsOfExperience,

    }
  })
  async function onSubmit(data: ProfileInfoFormProps){
     setIsLoading(true);
    if(!expiry){
      toast.error("Please select license expiry date");
      setIsLoading(false);
      return;
    }
     data.medicalLicenseExpiry = expiry;
     data.page = page
     data.yearsOfExperience = Number(data.yearsOfExperience)
     data.profilePicture = profileImage
    //  data.medicalLicense
    //  data.yearsOfExperience
     console.log(data);
    try {
       const res = await updateDoctorProfile(`${formId?formId:savedDbData.id}`, data)
       setProfileData(data);
       if(res?.status === 201){
        setIsLoading(false)
        //extract the profile form data  from the updated profile

        toast.success("Profile Information completed successfully")
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
                 {/* <p>Tracking Number: {trackingNumber}</p> */}
                 <h1 className="font-bold text-2xl mb-2 max-w-6xl">{title}</h1>
                 <p className="text-sm text max-w-6xl">{description}</p>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
                   {/* Also known as BIO */}
                    <TextAreaInput 
                    label="Summary" 
                    name="bio"
                    register={register}
                    errors={errors}
                    />
                    <TextInput 
                    label="Medical License" 
                    name="medicalLicense"
                    register={register}
                    errors={errors}
                    />
                     <TextInput 
                    label="Years of Experience" 
                    name="yearsOfExperience"
                    type="number"
                    register={register}
                    errors={errors}
                    />
                 <DatePickerInput
                   date={expiry}  
                   setDate={setExpiry} 
                   title="Medical License Expiry"  
                  />
                     <ImageInput 
                     label = "Profile Photo"
                     imageUrl = {profileImage}
                     setImageUrl={setProfileImage}
                     endpoint = "doctorProfileImage"
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