import { getServiceBySlug } from '@/actions/services'
import ServiceForm from '@/components/dashboard/ServiceForm'
import React from 'react'

const page = async({
   params:{slug}
    }:{
  params:{slug:string}
  }) => {
  const service =( await getServiceBySlug(slug))?.data
  return (
    <div>
        {service && service.id && <ServiceForm  title='Update Service'  initialData={service}   />}
    </div>
  )
}

export default page