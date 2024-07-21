"use client";
import { updateDoctorProfileWithService } from '@/actions/services';
import CustomMultiSelect from '@/components/FormInputs/CustomMultiSelect';
import ShadSelectInput, { SelectOption } from '@/components/FormInputs/ShadSelectInput';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { DoctorProfile, Service, Speciality, Symptom } from '@prisma/client';
import {  Loader, Map, MonitorPlay, PictureInPicture, } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import PriceUpdateForm from '../PriceUpdateForm';


const UpdateServiceForm = ({
  services,
  specialties,
  symptoms,
  profile
}:{
 services: Service[] | null,
 specialties:Speciality[] | null,
 symptoms:Symptom[] | null,
 profile: DoctorProfile | undefined | null
}) => {

  const [selectedServiceId, setSelectedServiceId] = useState(profile?.serviceId)
  const [specialtyId, setSpecialtyId] = useState(profile?.specialtyId)
  const [symptomsIds, setSymptomsIds] = useState<string[]>(profile?.symptomIds || [])
  const [operationMode, setOperationMode] = useState(profile?.operationMode)

  const [loadingServives, setLoadingServices] = useState(false);
  const [loadingSpecialties, setLoadingSpecialties] = useState(false);
  const [loadingSymptoms, setLoadingSymptoms] = useState(false);
  const [loadingOperationMode, setLoadingOperationMode] = useState(false)



   
  const profileId = profile?.id
  // if(status === "loading"){
  //   return <div className='flex item-center'>
  //      <Loader  className='mr-1 w-4 h-4 animate-spin' />
  //      <span>Loading a User ...</span>
  //   </div>
  // }

  const operationModes = [
    {
      title: "TeleHealth visit",
      slug:"telehealth-visit",
      icon: MonitorPlay
    },
    {
      title: "In-person doctor visit",
      slug:"inperson-visit",
      icon: Map
    },
    {
      title: "Both TeleHealth and In-person visit",
      slug:"inperson-telehealth",
      icon: PictureInPicture
    },
  ]
 
  async function handleUpdateService(){
     setLoadingServices(true);
     const data ={
        serviceId: selectedServiceId,
     }
     try {
       await updateDoctorProfileWithService(profileId, data)
       toast.success("Service Updated Successfully")
       setLoadingServices(false)
     } catch (error) {
       console.log(error)
       setLoadingServices(false)
     }
     console.log(data)
  }
  async function handleUpdateSpecialty(){
    setLoadingSpecialties(true);
    const data ={
       specialtyId,
    }
    try {
      await updateDoctorProfileWithService(profileId, data)
      toast.success("Specialty Updated Successfully")
      setLoadingSpecialties(false)
    } catch (error) {
      console.log(error)
      setLoadingSpecialties(false)
    }
    console.log(data)
 }
 async function handleUpdateSymptoms(){
  setLoadingSymptoms(true);
  const data ={
     symptomsIds
  }
  try {
    await updateDoctorProfileWithService(profileId, data)
    toast.success("Symptom Updated Successfully")
    setLoadingSymptoms(false)
  } catch (error) {
    console.log(error)
    setLoadingSymptoms(false)
  }
  console.log(data)
}

async function handleUpdateOperationMode(){
  setLoadingOperationMode(true);
  const data ={
    operationMode 
  }
  try {
    await updateDoctorProfileWithService(profileId, data)
    toast.success("Mode of Operation Updated Successfully")
    setLoadingOperationMode(false)
  } catch (error) {
    console.log(error)
    setLoadingOperationMode(false)
  }
  console.log(data)
}
  return (
    <>
    <CardContent className='space-y-3'>
      <div className=''>
      <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">₦</span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter fee"
                    // autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
      </div>
      
    <div className="border shadow rounded-md p-4 mt-3 "> 
         <div className="flex items-center justify-between p-2">
         <h2 className='text-sm font-semibold mb-3'> Choose Mode of Operation </h2>
         <Button disabled={loadingOperationMode} onClick={handleUpdateOperationMode} className='bg-yellow-500 hover:bg-yellow-500'>
            {loadingOperationMode ? "Please Wait ...":"Update Operation Mode"}
          </Button>
         </div>
          <div className='grid grid-cols-4 gap-2 '>
              {
                operationModes && operationModes.map((item)=>{
                  const Icon = item.icon
                  return(
                     <button key={item.slug} onClick={()=>setOperationMode(item.title)} className={cn('border flex items-center cursor-pointer justify-center flex-col px-2 py-3',
                       operationMode ===item.title?"border-2 bg-yellow-100 border-yellow-500":"")}>
                           <Icon className='w-8 h-8'/>
                           <p className='text-xs font-semibold text-yellow-500'>{item.title}</p>
                     </button>
                  )
                })
              }
           
          </div>
       </div>  
       <div className="border shadow rounded-md p-4 mt-3 "> 
         <div className="flex items-center justify-between p-2">
         <h2 className='text-sm font-semibold mb-3'> Choose the services that you offer </h2>
         <Button disabled={loadingServives} onClick={handleUpdateService} className='bg-yellow-500 hover:bg-yellow-500'>
            {loadingServives ? "Please Wait ...":"Update Service"}
          </Button>
         </div>
          <div className='grid grid-cols-4 gap-2 '>
              {
                services && services.map((item)=>{
                  return(
                     <button key={item.id} onClick={()=>setSelectedServiceId(item.id)} className={cn('border flex items-center cursor-pointer justify-center flex-col px-2 py-3',
                       selectedServiceId ===item.id?"border-2 bg-yellow-100 border-yellow-500":"")}>
                         <img 
                            src={item.imageUrl}
                             alt={item.title} 
                             width={100}
                             height={100}
                             className='w-14 h-14'      
                           />
                           <p className='text-xs font-semibold text-yellow-500'>{item.title}</p>
                     </button>
                  )
                })
              }
           
          </div>
       </div>
         <div className="border shadow rounded-md p-4">
         <div className="flex items-center justify-between p-2">
         <h2 className='text-sm font-semibold mb-3'> Choose your specialties </h2>
         <Button disabled={loadingSpecialties} onClick={handleUpdateSpecialty}
            className='bg-yellow-500 hover:bg-yellow-500'>
            {loadingSpecialties ? "Please Wait ...":"Update Specialty"}
          </Button>
         </div>
          <div className='grid grid-cols-4 gap-2'>
              {
                specialties && specialties.map((item)=>{
                  return(
                     <button key={item.id} onClick={()=>setSpecialtyId(item.id)} 
                        className={cn('border flex items-center cursor-pointer justify-center flex-col px-2 py-3',
                          specialtyId === item.id ? "border-2 bg-yellow-100 border-yellow-500":""
                        )}>
                           <p className='text-xs font-semibold text-yellow-500'>{item.title}</p>
                     </button>
                  )
                })
              }
          </div>
       </div>
       <div className="border shadow rounded-md p-4">
       <div className="flex items-center justify-between p-2">
         <h2 className='text-sm font-semibold mb-3'> Select Symptoms </h2>
         <Button disabled={loadingSymptoms} onClick={handleUpdateSymptoms} className='bg-yellow-500 hover:bg-yellow-500'>
            {loadingSymptoms ? "Please Wait ...":"Update Symptom"}
          </Button>
         </div>
          <div className='grid grid-cols-4 gap-2'>
              {
                symptoms && symptoms.map((item)=>{
                  return(
                     <button key={item.id} onClick={()=>setSymptomsIds([...symptomsIds, item.id])}
                        className={cn('border flex items-center cursor-pointer justify-center flex-col px-2 py-3',
                          symptomsIds.includes(item.id) ?  "border-2 bg-yellow-100 border-yellow-500":""
                        )}>
                           <p className='text-xs font-semibold text-yellow-500'>{item.title}</p>
                     </button>
                  )
                })
              }  
          </div>
       </div>
      
    </CardContent>
    </>        
  )
}

export default UpdateServiceForm