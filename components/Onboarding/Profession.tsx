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
import TextAreaInput from "../FormInputs/TextAreaInput";
import RadioInput from "../FormInputs/RadioInput";
import ImageInput from "../FormInputs/ImageInput";
import SelectInput from "../FormInputs/SelectInput";
import ArrayItemsInput from "../FormInputs/ArrayItemsInput";
import MultipleImageInputs from "../FormInputs/MultipleImageInputs";
import MultipleFileUpload from "../FormInputs/MultipleFileUpload";

export default function ContactInfo(
    {page, title,description}:{page:string,title:string, description: string}
  ) {
    const [tags, setTags] = useState([]);
    console.log(tags);
  const [isLoading, setIsLoading] = useState(false)
 
  const [docs, setDocs] = useState([])
  console.log(docs);


  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BioDataFormProps>()
  async function onSubmit(data: BioDataFormProps){
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
                  label="select" 
                  register={register}
                  name="select"
                   errors={errors}  
                   />
                  <ArrayItemsInput setItems={setTags} items={tags} itemTitle=" More" />
                   <MultipleFileUpload  label="Upload Certificates (Maximum 4)" imageUrls={docs} 
                    setImageUrls={setDocs}
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