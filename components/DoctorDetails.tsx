"use client";
import React, { useState } from 'react'
import { AppointmentProps, DoctorDetail  } from '@/types/type';

import { Calendar } from './ui/calendar';
import { getDayFromDate } from '@/utils/getDayFromDate';
import { getLongDate } from '@/utils/getLongDate';
import { CreditCard, Loader, MoveRight } from 'lucide-react';
import { Button } from './ui/button';

import TextAreaInput from './FormInputs/TextAreaInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import TextInput from './FormInputs/TextInput';
import DatePickerInput from './FormInputs/DatePickerInput';
import RadioInput from './FormInputs/RadioInput';
import MultipleFileUpload, { FileProps } from './FormInputs/MultipleFileUpload';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { createAppointment } from '@/actions/appointments';
import { Appointment } from '@prisma/client';

const DoctorDetails = ({
   doctor,
   appointment
  }:{
  doctor:DoctorDetail,
 appointment: Appointment | null
}) => {
    const [isActive, setIsActive] = useState("availability")
    const {data: session} = useSession()
    const patient = session?.user
    const [step, setStep] = useState(1)
   const [selectedTime, setSelectedTime] =  useState("")
   const [date, setDate] = React.useState<Date | undefined>(new Date())
   const [dob, setDob] = React.useState<Date | undefined>(undefined)
   const day = getDayFromDate(date?.toDateString());
   const longDate = getLongDate(date!.toDateString());
   const [isLoading, setIsLoading] = useState(false)
   const [medicalDocs, setMedicalDocs] = useState<FileProps[]>([])
   const router = useRouter();


   console.log(day)
   console.log(longDate)

   const times = doctor.doctorProfile?.availability?.[day] ?? null

   const genderOptions = [
     {
      label:"Male",
      value:"male"
     },
     {
      label:"Female",
      value:"female"
     },
   ]
    
   const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AppointmentProps>({
    defaultValues:{
      email:appointment?.email??"",
      firstName:appointment?.firstName??"",
      lastName:appointment?.lastName??"",
      occupation:appointment?.occupation??"",
      phone:appointment?.phone??"",
      location:appointment?.location??"",
      gender:appointment?.gender ??""
    }
  })

   async function onSubmit(data: AppointmentProps){
    // setIsLoading(true)
    console.log(data)
    data.appointmentDate = date;
    data.appointmentFormattedDate = longDate;
    data.appointmentTime = selectedTime;
    data.medicalDocuments = medicalDocs.map((item)=>item.url);
    data.dob = dob;
    (data.doctorId = doctor.id);
    // (data.doctorProfileId = doctor?.doctorProfile.id ?? "");
    (data.charge = doctor.doctorProfile?.hourlyWage ?? 0)
      data.patientId = patient?.id??""
      data.doctorName = doctor.name
    
     try {
       setIsLoading(true)
       const res =  await createAppointment(data)
       const appo = res.data;
       setIsLoading(false)
       toast.success("Appointment created successfully")
       router.push("/dashboard/user/appointments");
       console.log(appo)
     } catch (error) {
      setIsLoading(false)
      console.log(error)
     }
    
    reset();
    // router.push("/dashboard/services") 
 }
 function initiateAppointment(){
   if(patient?.id){
     if(!selectedTime){
      toast.error("Select Time")
      return;
     }
    setStep(currStep=>currStep + 1)
   }else{
      router.push("/login")
   }
 }
  return (
    <>
      {step === 1 ? (
        <div className=''>
        <div className='flex items-center justify-between uppercase tracking-widest ' >
              <button 
              onClick={()=> setIsActive("details")}
              className={isActive === "details"  ? 
              ('bg-yellow-600 py-4 w-full px-8 text-white')
              :('bg-yellow-100 text-gray-800 w-full py-4 px-8 ')}> 
                Service Details 
                
             </button>
              <button 
                onClick={()=> setIsActive("availability")} 
                className={isActive === "availability"  ? 
                ('bg-yellow-600 py-4 w-full px-8 text-white'):('bg-yellow-100 text-gray-800 w-full py-4 px-8')}>
                   Availability
             </button>
         </div>
         <div className='py-8 px-6'>
         {isActive === "availability" ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
             <div className=''>
             <Calendar
                   mode="single"
                   selected={date}
                   onSelect={setDate}
                   className="rounded-md border"
                 />
             </div>
             <div className=''>
              <h2 className='text-2xl font-bold border border-y-1 px-2 py-2'>{longDate}</h2>
             {times && times.length > 0 && (
              <div>
                    {times.map((item: any,i:number)=>{
             return(
                <button 
                  key={i} 
                  className=
                   {selectedTime === item? 
                     "bg-yellow-500 p-2 rounded-md ml-1 mt-3 text-white":"bg-yellow-100 p-2 mt-3 ml-1 rounded-md"}
                     onClick={()=>setSelectedTime(item)}>
                    {item} 
                </button>
               )
               })}
               </div>
             )} 
             
              <div className='mt-4'>
              <button
                 onClick={initiateAppointment}
                type="button" className="text-white bg-yellow-600 hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">
                 Book Doctor
                 (<CreditCard  className='w-4 h-4 mr-1'/> ₦ {doctor.doctorProfile?.hourlyWage}) 
                  <MoveRight className='w-4 h-4 ml-3'  /> 
               </button>  
              </div>   
        </div>
      </div>      
         ):(
         <div className='' >
             Service Details Component
        </div>
         )}
         </div>  
     </div>
      ):(
      <div className='p-8 bg-yellow-100'>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-2" >
            <h2 className='scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-6'>
               Please fill in your information
            </h2>
             {
              step === 2?(
                <div className='space-y-6'>
                <div className='grid gap-4 grid-cols-2'>
                     <div>
                     <TextInput
                          label="First Name" 
                          name="firstName"
                          register={register}
                          errors={errors}
                          className='w-full'
                        />
                        <TextInput 
                          label="Last Name" 
                          name="lastName"
                          register={register}
                          errors={errors}
                        />
                     </div>
                       <div>
                       <TextInput 
                          label="Phone Number" 
                          name="phone"
                          register={register}
                          errors={errors}
                        />
                         <TextInput 
                          label="Email Address" 
                          name="email"
                          register={register}
                          type='email'
                          errors={errors}
                        />
                       </div>
                         <div>
                         <RadioInput
                           name = "gender"
                           errors = {errors}
                           title ="Gender"
                            register ={register}
                            radioOptions={genderOptions}
                        />
                         <DatePickerInput
                          date={dob}
                           setDate={setDob} 
                           title="Date of Birth"
                         />
                         </div>    
                  </div>
                   <div className="mt-8 flex items-center justify-between gap-4">
                </div>
                <div className='flex items-center justify-between space-x-6 py-4 '>
                    <Button variant={'outline'}  type='button'
                     onClick={()=>setStep((currStep)=>currStep - 1)}>
                        Previous
                      </Button>
                    <Button
                     type='button'
                     onClick={()=>setStep((currStep)=>currStep + 1)}
                     className='bg-yellow-500 hover:bg-yellow-700' >
                       Next
                    </Button>
                </div>  
                </div> 
              ):(
                <div className='space-y-6'>
                  <h2>Step 3</h2>
                  <div className='grid gap-4 '>
                     <div>
                     <TextInput
                          label="Location" 
                          name="location"
                          register={register}
                          errors={errors}
                          className='w-full'
                        />
                        <TextInput 
                          label="Occupation" 
                          name="occupation"
                          register={register}
                          errors={errors}
                        />
                     </div>
                       <div>
                       <TextAreaInput
                          label="Why do yo want to see a doctor?" 
                          name="appointmentReason"
                          register={register}
                          errors={errors}
                        />
                        </div>                
                          <MultipleFileUpload 
                              label = "Medical Documents"
                              files = {medicalDocs}
                              setFiles ={setMedicalDocs}
                              className = ""
                              endpoint="patientMedicalFiles"
                        />
                  </div>
                <div className='flex items-center justify-between space-x-6 py-4 '>
                    <Button variant={'outline'}  type='button' onClick={()=>setStep(currStep=>currStep - 1)}>
                        Previous
                      </Button>
                   {
                    isLoading ? (
                      <Button disabled>
                       <Loader className='mr-2 h-4 w-4 animate-spin bg-yellow-500 hover:bg-yellow-700'  />
                         Please Wait
                      </Button>
                      
                    ):(
                      <Button
                      type='submit'
                      onClick={()=>setStep(currStep=>currStep + 1)}
                      className='bg-yellow-500 hover:bg-yellow-700' >
                        Complete Appointment
                     </Button>
                    )
                   }
                </div>  
                </div> 
              )
             }
        </form>
      </div>
    )}
    </>
    
  )
}

export default DoctorDetails