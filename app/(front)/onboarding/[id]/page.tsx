import OnboardingForm from '@/components/Onboarding/OnboardingForm'
import React from 'react'

const page = ({params:{id}}:{params:{id: string}}) => {
  return (
    <div className='bg-yellow-200 dark:bg-slate-800'>
         <div className="max-w-5xl mx-auto py-8 min-h-screen  ">
              <OnboardingForm  />
         </div>
    </div>
  )
}

export default page