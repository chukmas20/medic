
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"




import UpdateServiceForm from "./UpdateServiceForm"
import { getServices } from "@/actions/services"
import { getSpecialties } from "@/actions/specialty"
import { getSymptoms } from "@/actions/symptom"
import { SelectOption } from "@/components/FormInputs/ShadSelectInput"
import { DoctorProfile } from "@prisma/client"


const DoctorServiceSettings = async ({
     profile
    }:{
    profile: DoctorProfile | undefined | null
}) => {
   const allServices = (await getServices()).data
   const allSpecialties = (await getSpecialties()).data
   const allSymptoms = (await getSymptoms()).data

   const services: SelectOption[]  =  allServices?.map((item)=>{
    return{
       label: item.title,
       value: item.id
    }
 }) || []

 const specialties: SelectOption[]  = allSpecialties?.map((item)=>{
    return{
       label: item.title,
       value: item.id
    }
 }) || []

 const symptoms: SelectOption[]  = allSymptoms?.map((item)=>{
    return{
       label: item.title,
       value: item.id
    }
 }) || []

  return (
    <div className="grid gap-6 w-full">
        <Card x-chunk className='w-full'>
          <CardHeader>
            <CardTitle>Choose Service</CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader>
          <UpdateServiceForm 
             profile={profile}
             services={services} 
             specialties={specialties}
             symptoms={symptoms} 
            />
        </Card>
       
      </div>
  )
}

export default DoctorServiceSettings