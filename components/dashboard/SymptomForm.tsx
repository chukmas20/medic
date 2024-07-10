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
import { createManySymptoms, createSymptom, updatedSymptom } from "@/actions/symptom";
import { Symptom } from "@prisma/client";


export type SymptomProps = {
  title: string;
  slug: string;

}

export default function SymptomForm({title, initialData}:{title:string, initialData?: Symptom}) {
   
  const [isLoading, setIsLoading] = useState(false)

  const editingId  = initialData?.id || "";


  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SymptomProps>()

  async function onSubmit(data: SymptomProps){
    setIsLoading(true)
    const slug = generateSlug(data.title)
     data.slug = slug
    console.log(data)

    if(editingId){
      await updatedSymptom(editingId, data);
      toast.success("Symptom updated successfully");
    }else{
      await createSymptom(data);
      toast.success("Symptom created successfully");
    }
    reset();
    router.push("/dashboard/symptoms") 
 }
 async function handleCreateMany(){
    setIsLoading(true)
     try {
        await createManySymptoms()
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
                   <h1 className="font-bold text-1xl max-w-6xl">{title}</h1>
                   <Button  asChild variant={"outline"}>
                       <Link href={"/dashboard/symptoms"}>
                         <X  className="w-4 h-4"     />
                       </Link>
                   </Button>
                   {/* <Button type="button" onClick={handleCreateMany} variant={"outline"}>
                         {isLoading ? "Loading..." :"Create Many Symptoms"}
                   </Button> */}
                 </div>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
                    <TextAreaInput 
                    label="Symptom Title" 
                    name="title"
                    register={register}
                    errors={errors}
                    />
                 
                 <div className="mt-8 flex items-center justify-between gap-4">
                 <Button  asChild variant={"outline"}>
                       <Link href={"/dashboard/symptoms"}>
                         Cancel
                       </Link>
                   </Button>
                      <SubmitButton 
                      title={editingId ? "Update symptom": "Create symptom"}
                     buttonType="submit" loadingTitle="Please Wait..." isLoading={isLoading}   />
                </div>
            </form>
          
        </div>
    )
  }