"use client";
import { updateDoctorProfileWithService } from '@/actions/services';
import CustomMultiSelect from '@/components/FormInputs/CustomMultiSelect';
import ShadSelectInput, { SelectOption } from '@/components/FormInputs/ShadSelectInput';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { DoctorProfile } from '@prisma/client';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';


const UpdateServiceForm = ({
  services,
  specialties,
  symptoms,
  profile
}:{
 services:SelectOption[],
 specialties:SelectOption[],
 symptoms:SelectOption[],
 profile: DoctorProfile | undefined | null
}) => {
  // const {data: session, status} = useSession()
  const profileId = profile?.id
  if(status === "loading"){
    return <div className='flex item-center'>
       <Loader  className='mr-1 w-4 h-4 animate-spin' />
       <span>Loading a User ...</span>
    </div>
  }
  // const user = session?.user
  const [selectedServiceId, setSelectedServiceId] = useState([])
  const [specialtyId, setSpecialtyId] = useState([])
  const [symptomsIds, setSymptomsIds] = useState<SelectOption[]>([])
  const [loading, setLoading] = useState(false);
   
  async function handleUpdateService(){
     setLoading(true);
     const data ={
        serviceId: selectedServiceId,
        specialtyId,
        symptomIds:symptomsIds.map((item)=> item.value),
     }
     try {
       await updateDoctorProfileWithService(profileId, data)
       toast.success("Profile Updated Successfully")
       setLoading(false)
     } catch (error) {
       console.log(error)
       setLoading(false)
     }
     console.log(data)
  }
  return (
    <>
    <CardContent className='space-y-3'>
      <p className='text-sm font-semibold'> Service </p>
      <ShadSelectInput
        label='Select Service'
        optionTitle='service'
        options={services}  
        selectedOption={selectedServiceId}  
        setSelectedOption={setSelectedServiceId}
        />
         <p className='text-sm font-semibold'> Specialty </p>
        <ShadSelectInput
        label='Select Specialty'
        optionTitle='specialty'
        options={specialties}  
        selectedOption={specialtyId}  
        setSelectedOption={setSpecialtyId}
        />
        <p className='text-sm font-semibold'> Symptom</p>
         <CustomMultiSelect
        label='Select Symptom'
        optionTitle='symptom'
        options={symptoms}  
        selectedOption={symptomsIds}  
        setSelectedOption={setSymptomsIds}
        />
    </CardContent>
    <CardFooter className="border-t px-6 py-4">
      <Button disabled={loading} onClick={handleUpdateService} className='bg-yellow-500 hover:bg-yellow-500'>
         {loading ? "Please Wait ...":"Save"}
      </Button>
    </CardFooter>
    </>        
  )
}

export default UpdateServiceForm