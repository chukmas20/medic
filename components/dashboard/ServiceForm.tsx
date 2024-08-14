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
import { ServiceProps } from "@/types/type";
import { createManyServices, createService, updateService } from "@/actions/services";
import toast from "react-hot-toast";
import { Service } from "@prisma/client";



export default function ServiceForm({title, initialData}:{title:string, initialData?: Service}) {
   
  const [isLoading, setIsLoading] = useState(false)
  const initialImageUrl = initialData?.imageUrl || ""
  const [imageUrl, setImageUrl] = useState(initialImageUrl)
  
 const editingId  = initialData?.id || "";

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ServiceProps>({
    defaultValues:{
      title: initialData?.title
    }
  })

  async function onSubmit(data: ServiceProps){
    setIsLoading(true)
    const slug = generateSlug(data.title)
     data.imageUrl = imageUrl
     data.slug = slug
    console.log(data)

    if(editingId){
      await updateService(editingId, data);
      toast.success("Service updated successfully");
    }else{
      await createService(data);
      toast.success("Service created successfully");
    }
    reset();
    router.push("/dashboard/services") 
 }
 async function handleCreateMany(){
    setIsLoading(true)
     try {
        await createManyServices()
        setIsLoading(false);
     } catch (error) {
        console.log(error)
     }
 }
    return (
        <div className="flex min-h-full  mx-auto border border-gray-200  max-w-xl flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
             <div className="text-center ">
                 <div className="flex items-center justify-between">
                   <h1 className="font-bold text-1xl max-w-6xl">{title}</h1>
                   <Button type="button"  asChild variant={"outline"}>
                       <Link href={"/dashboard/services"}>
                         <X  className="w-4 h-4"     />
                       </Link>
                   </Button>
                   <Button type="button" onClick={handleCreateMany} variant={"outline"}>
                         {isLoading ? "Loading..." :"Create Many"}
                   </Button>
                 </div>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
                   {/* Also known as BIO */}
                    <TextAreaInput 
                    label="Service Title" 
                    name="title"
                    register={register}
                    errors={errors}
                    />
                  
                     <ImageInput 
                     label = "Profile Photo"
                     imageUrl = {imageUrl}
                     setImageUrl={setImageUrl}
                     endpoint = "serviceImage"
                  />
                 
                 <div className="mt-8 flex items-center justify-between gap-4">
                 <Button type="button"  asChild variant={"outline"}>
                       <Link href={"/dashboard/services"}>
                         Cancel
                       </Link>
                   </Button>
                    <SubmitButton 
                     title={editingId ? "Update service": "Create service"}
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