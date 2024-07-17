
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
   const services = (await getServices()).data
   const specialties = (await getSpecialties()).data
   const symptoms = (await getSymptoms()).data

   

  return (
    <div className="grid gap-6 w-full">
        <Card x-chunk className='w-full'>
          {/* <CardHeader>
            <CardTitle>Choose Service</CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader> */}
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