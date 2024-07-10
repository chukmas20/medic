import { getSpecialtyBySlug } from '@/actions/specialty'
import { getSymptomBySlug } from '@/actions/symptom'
import SpecialtyForm from '@/components/dashboard/SpecialtyForm'
import React from 'react'

const page = async({
   params:{slug}
    }:{
  params:{slug:string}
  }) => {
    const symptom =( await getSymptomBySlug(slug))?.data

  return (
    <div>
    {symptom && symptom.id && <SpecialtyForm title='Update Service'  initialData={symptom}   />}  
  </div>
  )
}

export default page