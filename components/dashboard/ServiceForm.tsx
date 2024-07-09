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
import { createManyServices, createService } from "@/actions/services";
import toast from "react-hot-toast";



export default function ServiceForm() {
   
  const [isLoading, setIsLoading] = useState(false)
  
  const [imageUrl, setImageUrl] = useState("")
  


  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ServiceProps>()

  async function onSubmit(data: ServiceProps){
    setIsLoading(true)
    const slug = generateSlug(data.title)
     data.imageUrl = imageUrl
     data.slug = slug
    console.log(data)
    await createService(data);
    toast.success("Service created successfully");
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
                 {/* <p>Tracking Number: {trackingNumber}</p> */}
                 <div className="flex items-center justify-between">
                   <h1 className="font-bold text-1xl max-w-6xl">Create Service</h1>
                   <Button  asChild variant={"outline"}>
                       <Link href={"/dashboard/services"}>
                         <X  className="w-4 h-4"     />
                       </Link>
                   </Button>
                   {/* <Button onClick={handleCreateMany} variant={"outline"}>
                         {isLoading ? "Loading..." :"Create Many"}
                   </Button> */}
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
                 <Button  asChild variant={"outline"}>
                       <Link href={"/dashboard/services"}>
                         Cancel
                       </Link>
                   </Button>
                      <SubmitButton 
                     title="Create Service" 
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