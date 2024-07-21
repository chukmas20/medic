"use client"
import { useForm } from "react-hook-form"
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import { useRouter} from "next/navigation";
import TextAreaInput from "../FormInputs/TextAreaInput";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import generateSlug from "@/utils/generateSlug";
import toast from "react-hot-toast";
import { createManySpecialties, createSpecialty, updateSpecialty } from "@/actions/specialty";
import { Speciality } from "@prisma/client";


export type SpecialtyProps = {
  title: string;
  slug: string;

}

export default function PriceUpdateForm({title, initialData}:{title:string, initialData?: Speciality}) {
   
  const [isLoading, setIsLoading] = useState(false)
  
  const editingId  = initialData?.id || "";

  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SpecialtyProps>({
    defaultValues:{
      title: initialData?.title
    }
  })

  async function onSubmit(data: SpecialtyProps){
    setIsLoading(true)
    const slug = generateSlug(data.title)
     data.slug = slug
    console.log(data)

    if(editingId){
      await updateSpecialty(editingId, data);
      toast.success("Specialty updated successfully");
    }else{
      await createSpecialty(data);
      toast.success("Specialty created successfully");
    }
    reset();
    router.push("/dashboard/specialties") 
 }
 async function handleCreateMany(){
    setIsLoading(true)
     try {
        await createManySpecialties()
        setIsLoading(false);
     } catch (error) {
        console.log(error)
     }
 }
    return (
        <div className="flex min-h-full  mx-auto border border-gray-200  max-w-xl flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
             <div className="text-center ">
                 <div className="flex items-center justify-between">
                   <h1 className="font-bold text-1xl max-w-6xl">
                      Update hourly Fee
                  </h1>
                 </div>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
                    <TextAreaInput 
                    label="Specialty Title" 
                    name="title"
                    register={register}
                    errors={errors}
                    />
                 
                 <div className="mt-8 flex items-center justify-between gap-4">
                 <Button  asChild variant={"outline"}>
                       <Link href={"/dashboard/specialties"}>
                         Cancel
                       </Link>
                   </Button>
                      <SubmitButton 
                     title={editingId ? "Update specialty": "Create specialty"}
                     buttonType="submit" loadingTitle="Please Wait..." isLoading={isLoading}   />
                </div>
            </form>
          
        </div>
    )
  }