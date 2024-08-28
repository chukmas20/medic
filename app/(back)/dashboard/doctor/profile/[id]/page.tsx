import { getDoctorProfileById } from '@/actions/onboarding'
import { getSpecialties } from '@/actions/specialty'
import OnboardingForm from '@/components/Onboarding/OnboardingForm'
import React from 'react'

const page = async ({params:{id}}:{params:{id: string}}) => {

  //Getting the existing Doctor profile
  const specialties = (await getSpecialties()).data || []
  const doctorProfile = (await getDoctorProfileById(id))?.data

  // console.log(doctorProfile)
  
  return (
    <div className='bg-yellow-200 dark:bg-slate-800'>
        {doctorProfile && doctorProfile.id && (
           <div className="max-w-5xl mx-auto py-8 min-h-screen  ">
           <OnboardingForm 
             id={id}
              doctorProfile={doctorProfile}
              specialties={specialties}
             />
      </div>
        )}
    </div>
  )
}

export default page