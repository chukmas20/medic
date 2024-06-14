"use client";

import { useSearchParams } from "next/navigation";

const OnboardingForm = () => {
    const params = useSearchParams();
    const page = params.get("page") ?? 1;
  return (
    <div className='grid grid-cols-12 mx-auto rounded-lg shadow-md overflow-hidden min-h-screen bg-yellow-100'>
         <div className=' col-span-full sm:col-span-2  '>
           <h1 className="py-3 px-4 bg-yellow-600 text-slate-100 border border-slate-200">
              Step 1
            </h1>
            <h1 className="py-3 px-4 bg-yellow-600 text-slate-100 border border-slate-200">
              Step 1
            </h1>
            <h1 className="py-3 px-4 bg-yellow-600 text-slate-100 border border-slate-200">
              Step 1
            </h1>
            <h1 className="py-3 px-4 bg-yellow-600 text-slate-100 border border-slate-200">
              Step 1
            </h1>
            <h1 className="py-3 px-4 bg-yellow-600 text-slate-100 border border-slate-200">
              Step 1
            </h1>
          
         </div>
         <div className='sm:col-span-10 col-span-full bg-yellow-100 p-4'>
             <h2>Form</h2>
             <h2>Form</h2>
             <h2>Form</h2>
             <h2>Form</h2>
             <h2>Form</h2>
             <h2>Form</h2>
             <h2>Form</h2>
         </div>
    </div>
  )
}

export default OnboardingForm