"use client"
import { useForm } from "react-hook-form"
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import { useRouter} from "next/navigation";
import TextAreaInput from "../FormInputs/TextAreaInput";
import ImageInput from "../FormInputs/ImageInput";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import generateSlug from "@/utils/generateSlug";
import {  UserProfile } from "@/types/type";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import TextInput from "../FormInputs/TextInput";
import { updateLoggedInUser } from "@/actions/users";



export default function UserProfileForm({title, initialData}:{title:string, initialData?: User}) {
   
  const [isLoading, setIsLoading] = useState(false)
  
 const editingId  = initialData?.id || "";

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<UserProfile>({
    defaultValues:{
      name: initialData?.name,
      email: initialData?.email,
      phone: initialData?.phone
    }
  })

  async function onSubmit(data: UserProfile){
    setIsLoading(true)
    const slug = generateSlug(data.name)
     data.slug = slug
    console.log(data)
      await updateLoggedInUser(data);
      toast.success(" Updated successfully");
      setIsLoading(false)
    
    reset();
    router.push("/dashboard/profile") 
 }
 
    return (
        <div className="flex min-h-full  mx-auto border border-gray-200  max-w-xl flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
             <div className="text-center ">
                 <div className="flex items-center justify-between">
                   <h1 className="font-bold text-1xl max-w-6xl">{title}</h1>
                   <Button type="button"  asChild variant={"outline"}>
                       <Link href={"/dashboard/profile"}>
                         <X  className="w-4 h-4"     />
                       </Link>
                   </Button>
                   {/* <Button type="button" onClick={handleCreateMany} variant={"outline"}>
                         {isLoading ? "Loading..." :"Create Many"}
                   </Button> */}
                 </div>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
                   {/* Also known as BIO */}
                   <TextInput
                    label="Name" 
                    name="name"
                    register={register}
                    errors={errors}
                    />
                    <TextInput
                    label="Email" 
                    name="email"
                    register={register}
                    errors={errors}
                    />
                    <TextInput
                    label="Phone Number" 
                    name="phone"
                    register={register}
                    errors={errors}
                    />
                    
                 <div className="mt-8 flex items-center justify-between gap-4">
                 <Button type="button"  asChild variant={"outline"}>
                       <Link href={"/dashboard/profile"}>
                         Cancel
                       </Link>
                   </Button>
                    <SubmitButton 
                     title={ "Update details"}
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