"use client";
import { updateAppointmentById } from '@/actions/appointments';
import RadioInput from '@/components/FormInputs/RadioInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import TextInput from '@/components/FormInputs/TextInput';
import { Button } from '@/components/ui/button';
import { Appointment, AppointmentStatus } from '@prisma/client';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


export type AppointmentUpdateProps={
    status:AppointmentStatus;
    meetingLink: string;
    meetingProvider: string;
}

const UpdateAppointmentForm = ({appointment}:{appointment:Appointment}) => {
    //could change the appointment annotation to Appointment in the future
    const [loading, setLoading] = useState(false);
    const statusOptions = [
        {
            label:"Pending",
            value:"pending",
        },
        {
            label:"Approve",
            value:"approved",
        },
        {
            label:"Reject",
            value:"rejected",
        },
    ];

    const meetingProviders = [
        {
            label:"Google Meet",
            value:"google-meet",
        },
        {
            label:"Zoom",
            value:"zoom",
        },
        {
            label:"Skype",
            value:"skype",
        },
        {
            label:"Microsoft teams",
            value:"microsoft-teams",
        },
    ];

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
       } = useForm<AppointmentUpdateProps>({
         defaultValues:{
            meetingLink: appointment.meetingLink,
            meetingProvider: appointment.meetingProvider,
            status:appointment.status
         }
       })

    async function handleUpdate(data: AppointmentUpdateProps){
        setLoading(true)
        try {
            //Update appointment
            await updateAppointmentById(appointment.id, data)
            setLoading(false)
            toast.success("Appointment Updated Successfully")
        } catch (error) {
            setLoading(false)
           console.log(error)  
        }
    }

    
  return (
     
    <form className='p-4 border shadow rounded-md  my-4' onSubmit={handleSubmit(handleUpdate)}>
      <div className="sm:col-span-4">
      <div className="flex items-center justify-between p-2">
         <h2 className='text-sm font-semibold mb-3'> Update Appointment </h2>
         <Button disabled={loading}  className='bg-yellow-500 hover:bg-yellow-500'>
            {loading ? "Please Wait ...":"Update Appointment"}
          </Button>
         </div>
              <div className='mt-2'>
              {/* <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">₦</span>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    value={price}
                    // placeholder="Enter fee"
                    autoComplete="price"
                    onChange={(e)=> setPrice(+e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div> */}
                <div className='py-2'>
                <TextInput 
                        label="Add meeting link" 
                        name="meetingLink"
                        register={register}
                        errors={errors}
                        className='w-full'
                    />
                </div> 
                <div className='py-2'>
                    <div className='grid grid-cols-2 gap-6'>
                       <SelectInput 
                          label={'Meeting Provider'}
                         name={'meetingProvider'} 
                         register={register}
                         options={meetingProviders}
                         className='col-span-1'
                       />
                        <RadioInput 
                              title={'Approve appointment'}
                              name={'status'}
                              register={register}
                              radioOptions={statusOptions}
                             errors={errors} 
                             className='col-span-1'
                             />
                    </div>
                </div>
              </div>
            </div>
    </form>
  )
}

export default UpdateAppointmentForm