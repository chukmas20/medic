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
import { BlogsProp, } from "@/types/type";
import toast from "react-hot-toast";
import { Blog, } from "@prisma/client";
import TextInput from "../FormInputs/TextInput";
import { createBlog, updateBlog } from "@/actions/blog";



export default function BlogsForm({
   title, 
   initialData
  }:{
    title:string,
    initialData?: Blog}) {
   
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
  } = useForm<BlogsProp>({
    defaultValues:{
      title: initialData?.title,
      body: initialData?.body
    }
  })

  async function onSubmit(data: BlogsProp){
    setIsLoading(true)
    const slug = generateSlug(data.title)
     data.imageUrl = imageUrl
     data.slug = slug
    console.log(`${data} blog creation`)

    if(editingId){
      await updateBlog(editingId, data);
      toast.success("Blog updated successfully");
    }else{
      await createBlog(data);
      toast.success("Blog created successfully");
    }
    reset();
    router.push("/dashboard/blog") 
 }

    return (
        <div className="flex min-h-full  mx-auto border border-gray-200  max-w-xl flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
             <div className="text-center ">
                 <div className="flex items-center justify-between">
                   <h1 className="font-bold text-1xl max-w-6xl">{title}</h1>
                   <Button type="button"  asChild variant={"outline"}>
                       <Link href={"/dashboard/blog"}>
                         <X  className="w-4 h-4"     />
                       </Link>
                   </Button>
                   {/* <Button type="button" onClick={handleCreateMany} variant={"outline"}>
                         {isLoading ? "Loading..." :"Create Many"}
                   </Button> */}
                 </div>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
                <TextInput
                    label="Subject" 
                    name="title"
                    register={register}
                    errors={errors}
                    />
                    <TextAreaInput 
                    label="Content" 
                    name="body"
                    register={register}
                    errors={errors}
                    />
                  
                     <ImageInput 
                     label = "Profile Photo"
                     imageUrl = {imageUrl}
                     setImageUrl={setImageUrl}
                     endpoint = "blogImage"
                  />
                 
                 <div className="mt-8 flex items-center justify-between gap-4">
                 <Button type="button"  asChild variant={"outline"}>
                       <Link href={"/dashboard/blog"}>
                         Cancel
                       </Link>
                   </Button>
                    <SubmitButton 
                     title={editingId ? "Update Blog": "Create Blog"}
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