import { getAppointments } from '@/actions/appointments';
import React from 'react';
import { PatientProps } from "@/app/(back)/dashboard/doctor/patients/layout"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generateInitials } from '@/utils/genrateInitials';


const page = async() => {
  const appointments = (await getAppointments()).data || []
  const uniquePatientsMap = new Map();

appointments.forEach((app)=>{
   if(!uniquePatientsMap.has(app.patientId)){
     uniquePatientsMap.set(app.patientId,{
       patientId:app.patientId,
      name: `${app.firstName} ${app.lastName}`,
      email: app.email,
      phone: app.phone,
      location: app.location,
      gender: app.gender,
      occupation: app.occupation,
      dob: app.dob
   })
  }
})

const patients = Array.from(uniquePatientsMap.values()) as PatientProps[]

  return (
    <div className="">
         <Card x-chunk="dashboard-01-chunk-5">
        <CardHeader>
           <div className="flex items-center justify-between">
             <CardTitle>PATIENTS</CardTitle>
           </div>
        </CardHeader>
        <CardContent className="grid gap-8">
          {
            patients && patients.slice(0,5).map((patient)=>{
              const initials = generateInitials(patient.name)
              return(
               <div key={patient.patientId} className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                     {patient.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {patient.email}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {patient.phone}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {patient.location}
                  </p>
                </div>    
              </div>
              
              )
            })
          }
        </CardContent>
      </Card>
    </div>
  )
}

export default page