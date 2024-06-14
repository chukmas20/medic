"use client";

import { cn } from "@/lib/utils";
import { Book, Contact, GraduationCap, Icon, Stethoscope, User } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import BiodataForm from "./BiodataForm";
import ContactInfo from "./ContactInfo";
import Profession from "./Profession";
import Education from "./Education";

const OnboardingForm = ({id}:{id:string}) => {
     const steps =[
        {
            title: "BIO-DATA",
            page: "bio-data",
            component: <BiodataForm  />,
            icon: User
       },
        
        {
            title: "Contact Information",
            page: "contact",
            component: <ContactInfo  />,
            icon: Contact

        },
        {
            title: "Profession Information",
            page: "profession",
            component:<Profession />,
            icon: Stethoscope  

        },
    
        {
            title: "Education",
            page: "education",
            component:<Education />,
            icon: GraduationCap
        },
        {
            title: "Practise Information",
            page: "practise",
            component:<></>,
            icon: GraduationCap

        },
        {
            title: "Additional Information",
            page:"additional",
            component:<></>,
            icon: GraduationCap
        },
        {
            title: "Availability",
            page: "availability",
            component:<></>,
            icon: GraduationCap
        },

     ]
    const params = useSearchParams();
    const page = params.get("page") ?? 1;
    const currentStep = steps.find((step)=> step.page === page)   
   console.log(currentStep);
  return (
    <div className='grid grid-cols-12 mx-auto rounded-lg shadow-md overflow-hidden min-h-screen bg-yellow-100'>
         <div className=' col-span-full sm:col-span-3  '>
           
             {steps.map((step, i)=>{
              const icon = Icon;
                return(
             <Link href={`/onboarding/${id}?page=${step.page}`}
               className={cn(" block py-3  px-4 bg-yellow-200 font-semibold text-slate-800 border uppercase text-sm border-slate-200",
                 step.page === page?"bg-yellow-600 text-slate-200 font-semibold border-slate-200 ":"" )
                }
              >
                <p key={i} 
                 className="flex items-center justify-between "> 
                  {step.title}
                  {<step.icon />}
                  </p>

                </Link>
                )
             })}
         </div>
         <div className='sm:col-span-9 col-span-full bg-yellow-100 p-4'>
              {currentStep?.component}
         </div>
    </div>
  )
}

export default OnboardingForm