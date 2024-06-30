"use client";
 
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateUserById } from "@/actions/users";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { UserRole } from "@prisma/client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { getApplicationByTrack } from "@/actions/onboarding";
import SubmitButton from "../FormInputs/SubmitButton";
import { useOnboardingContext } from "@/context/context";
 
const FormSchema = z.object({
   trackingNumber: z.string().min(2, {
    message: "Unique code must be at 10 characters",
  }),
})


 
export default  function TrackingForm() {
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const {savedDbData, setSavedDbData} = useOnboardingContext()

  

  const router = useRouter();
  

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      trackingNumber: "",
    },
  })
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
      try {
        //Make request
        const res = await getApplicationByTrack(data.trackingNumber)
        //save this to the context
        setSavedDbData(res?.data)
        if(res?.status === 404){
          setShowNotification(true)
          setLoading(false)
        }
        if(res?.status === 200){
          // setUserId(res.data?.userId!)
          // setPage(res.data?.page!)
          // setTrackingSuccessful(true)
          router.push(`/onboarding/${res.data?.userId}?page=${res.data?.page}`)
          setLoading(false)

        }else{
          throw new Error("Something went wrong");
        }
      } catch (error) {
        toast.error("Something went wrong")
        setLoading(false)
        console.log(error)
      }
      
  }

 
 
  return (
    <Form {...form}>
        {showNotification && (
          <div className="bg-red-200">
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium text-red-800">Wrong Code</span> <br/>
            <span className="text-red-800">Please Check the
             code and Enter again</span>
          </Alert>
          </div>   
        )}
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="trackingNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your 10 digit Unique Code</FormLabel>
              <FormControl>
                <Input placeholder="eg OHK53Y8ENQ" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
 
         <SubmitButton 
           title="Submit to resume"
           isLoading={loading}
           loadingTitle="Please Wait"
         />
       </form>
      </Form>

     );
}