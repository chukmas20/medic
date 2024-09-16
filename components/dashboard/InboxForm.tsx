"use client"
import { useForm } from "react-hook-form"
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";

import { useRouter} from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import { InboxProps } from "@/types/type";
import { Service } from "@prisma/client";
import TextInput from "../FormInputs/TextInput";
import FormSelectInput from "../FormInputs/FormSelectInput";
import { Options } from "react-tailwindcss-select/dist/components/type";
import dynamic from "next/dynamic";
import { Session } from "next-auth";
import { createInboxMessage } from "@/actions/inbox";
import toast from "react-hot-toast";

const QuillEditor = dynamic(
  () => import("@/components/FormInputs/QuillEditor"),
  {
    ssr: false,
  }
);
 


export default function InboxForm({
   title, 
   initialData,
   users,
   session
   }:{
  title:string,
  initialData?: Service,
  users: Options,
  session: Session |null
}) { 
  const [isLoading, setIsLoading] = useState(false)
   const editingId  = initialData?.id || "";
 const [selectedUser, setSelectedUser] =
   useState<any>(null);
   const [content, setContent] = useState("");


  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InboxProps>()

  async function onSubmit(data: InboxProps){
    data.receiverId = selectedUser.value;
    data.senderId = session?.user?.id??"";
    data.senderName = session?.user?.name??"";
    data.senderEmail = session?.user?.email??"";
    data.body = content;

    setIsLoading(true)

    console.log(data)
    try {
      const res = await createInboxMessage(data)
      if(res.status === 201){
        reset();
        setIsLoading(false);
        toast.success("Message sent successfully")
         router.push(`/dashboard/${session?.user.role === "DOCTOR"?"doctor":"user"}/inbox`) 
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }

 }
 
    return (
        <div className="flex min-h-full  mx-auto border border-gray-200  max-w-xl flex-1 flex-col justify-center px-6 py-12 lg:px-8 w-full">
             <div className="text-center ">
                 <div className="flex items-center justify-between">
                   <h1 className="font-bold text-1xl max-w-6xl">{title}</h1>
                   <Button type="button"  asChild variant={"outline"}>
                       <Link
                        href={`/dashboard/${session?.user?.role ==="DOCTOR"?"doctor":"user"}/inbox`}
                        >
                         <X  className="w-4 h-4"     />
                       </Link>
                   </Button>
                  
                 </div>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
                   <FormSelectInput
                        label="Recipients"
                        options={users}
                        option={selectedUser}
                        setOption={setSelectedUser}
                      />
                     <TextInput 
                      label="Subject" 
                      name="subject"
                      register={register}
                      errors={errors}
                    />
                     <QuillEditor
                        label="Write Message Content"
                        className=""
                        value={content}
                        onChange={setContent}
                      />
                 <div className="mt-8 flex items-center justify-between gap-4">
                 <Button type="button"  asChild variant={"outline"}>
                       <Link href={"/dashboard/doctor/inbox"}>
                         Cancel
                       </Link>
                   </Button>
                    <SubmitButton 
                     title={editingId ? "Update Message": "Create Message"}
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