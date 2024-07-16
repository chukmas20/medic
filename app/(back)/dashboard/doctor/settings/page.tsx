import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AvailabilitySettings from '@/components/dashboard/Doctor/AvailabilitySettings';
import { getDoctorProfileById } from '@/actions/onboarding';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DoctorServiceSettings from '@/components/dashboard/Doctor/DoctorServiceSettings';
// import { Tabs } from "flowbite-react";
// import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
// import { MdDashboard } from "react-icons/md";


const page = async() => {
  const session = await getServerSession(authOptions)
  const user = session?.user
  console.log(user);
  const profile = await getDoctorProfileById(user?.id)
  console.log(profile);

  return (
    <div className=' w-full px-6  py-6'>
         <h2 className='pb-4 text-2xl font-bold '>Settings</h2>
         <Tabs defaultValue="availability" className="w-[800px]">
        <TabsList>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="service"> Service settings</TabsTrigger>
        </TabsList>
        <TabsContent value="availability">
           <AvailabilitySettings  profile = {profile?.data} />
        </TabsContent>
        <TabsContent value="service">
           <DoctorServiceSettings  profile={profile?.data}  />
        </TabsContent>
        <TabsContent value="service">Change your password here.</TabsContent>
      </Tabs>
    </div>
  )
}

export default page