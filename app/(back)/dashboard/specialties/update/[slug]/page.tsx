import { getSpecialtyBySlug } from '@/actions/specialty'
import SpecialtyForm from '@/components/dashboard/SpecialtyForm'
import React from 'react'

const page = async({
   params:{slug}
    }:{
  params:{slug:string}
  }) => {
    const specialty =( await getSpecialtyBySlug(slug))?.data

  return (
    <div>
{specialty && specialty.id && <SpecialtyForm title='Update Service'  initialData={specialty}   />}    </div>
  )
}

export default page