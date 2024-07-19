"use client";

import { cn } from "@/lib/utils";
import {  Contact, GraduationCap, Icon,Info,Plus,StethoscopeIcon, User } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BiodataForm from "./BiodataForm";
import ContactInfo from "./ContactInfo";
import Education from "./Education";
import ProfileInfoForm from "./ProfileInfoForm";
import PractiseInfoForm from "./PractiseInfoForm";
import AdditionalInfo from "./AdditionalInfo";
import { useOnboardingContext } from "@/context/context";
import { Speciality } from "@prisma/client";

const OnboardingForm = ({id, specialties}:{id:string, specialties:Speciality[]}) => {
  const params = useSearchParams();
     const page = params.get("page")??"bio-data";
     const {trackingNumber, doctorProfileId, savedDbData } = useOnboardingContext()

     const steps =[
        {
            title: "BIO-DATA",
            page: "bio-data",
            component: 
              <BiodataForm title="Bio Data"
                userId = {id}
                description="Please fill in your Bio details"
                 page={page}
                 nextPage="profile"
                 formId={doctorProfileId ? doctorProfileId : savedDbData.id}
                />,
            icon: Info
       },
       {
        title: "Profile Information",
        page: "profile",
        component: <ProfileInfoForm 
                    title="Profile Information" 
                    description="Please fill in your profile details" 
                    page={page} 
                    nextPage="contact"
                    userId = {id}
                    formId={doctorProfileId ? doctorProfileId : savedDbData.id}
                     />,
        icon: User
   },
        
        {
            title: "Contact Information",
            page: "contact",
            component: <ContactInfo title="Contact  Information" 
            description="Please fill in your profile details" page={page}  
            nextPage="education"
            formId={doctorProfileId ? doctorProfileId : savedDbData.id}
            userId = {id}
             />,
            icon: Contact

        },
      
        {
            title: "Education",
            page:"education",
            component: <Education title="Education Details" 
            description="Please fill in your Education details"
             page={page}
             nextPage="practise"
             formId={doctorProfileId ? doctorProfileId : savedDbData.id}
             userId = {id}
             specialties={specialties}

              />,
           
            icon: GraduationCap,

        },
        {
            title: "Practise Information",
            page: "practise",
            component:<PractiseInfoForm  title="Practise Information" 
            description="Please fill in your Practise details" page={page}
            nextPage="additional" 
            formId={doctorProfileId ? doctorProfileId : savedDbData.id}
            userId = {id}

            />,
            icon: StethoscopeIcon


        },
        {
            title: "Additional Information",
            page:"additional",
            component:<AdditionalInfo  title="Additional Information" 
            description="Please fill Additional details"
             page={page} nextPage="final"
             formId={doctorProfileId ? doctorProfileId : savedDbData.id}
             userId = {id}
             />,
            icon: Plus
        },
        

     ]

     
     const currentStep = steps.find((step)=> step.page === page)   
    console.log(currentStep);
   
  return (
    <div className='grid grid-cols-12 mx-auto rounded-lg shadow-md  min-h-screen bg-yellow-100'>
         <div className=' col-span-full sm:col-span-3 dark:bg-slate-900  '>
           
             {steps.map((step, i)=>{
              const icon = Icon;
                return(
             <Link   key={i}  href={`/onboarding/${id}?page=${step.page}`}
               className={cn(" block py-3  px-4 bg-yellow-200 font-semibold text-slate-800 border uppercase text-sm border-slate-200",
                 step.page === page?"bg-yellow-600 text-slate-200 font-semibold border-slate-200 ":"" )
                }
              >
                <p 
                 className="flex items-center justify-between "> 
                  {step.title}
                  {<step.icon />}
                  </p>

                </Link>
                )
             })}
         </div>
         <div className='sm:col-span-9 col-span-full bg-yellow-100 p-4'>
         Use the unique Unique Code {" "}
          {trackingNumber || savedDbData.id && (
               <p className="bg-yellow-600 text-slate-200 w-90 rounded-md text-sm px-4 py-2">
                {trackingNumber ? trackingNumber: savedDbData.trackingNumber} 
             </p> 
             
            )}
            {" "}to resume registration or check status
              
              {currentStep?.component}
         </div>
    </div>
  )
}

export default OnboardingForm