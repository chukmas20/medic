"use client"
import { Tabs } from "flowbite-react";
import ServiceList from "./services/ServiceList";
import { Box, MicroscopeIcon, Stethoscope, X } from "lucide-react";
import LinkCards from "./doctors/LinkCards";
import { FaSyringe } from "react-icons/fa";
import { Service, Speciality, Symptom } from "@prisma/client";
import SymptomCard from "./doctors/SymptomCard";
import { ServiceWithDoctorProfileCount } from "@/actions/services";

type  TabbedItemsProps = {
  services: ServiceWithDoctorProfileCount[];
  specialties: Speciality[];
  symptoms: Symptom[];
}
export default function TabbedItems({
   services,
   specialties,
   symptoms}:TabbedItemsProps) {
 
  const tabs = [
     {
      title:"Popular Services",
      icon : MicroscopeIcon ,
      component: <ServiceList data ={services}  />,
      content: []
     },
    //  {
    //   title:"Doctors",
    //   icon : Stethoscope,
    //   component: <LinkCards  className="bg-yellow-800" />,
    //   content: []
    //  },
     {
      title:"Specialties",
      icon: Box,
      component: <LinkCards  className="bg-yellow-500" specialties={specialties}/>,
      content: []
     },
     {
      title:"Symptoms",
      icon : FaSyringe,
      component: <SymptomCard className="bg-yellow-500"  symptoms={symptoms}/>,
      content: []
     },
  ]
  return (
    <Tabs aria-label="Tabs with underline" style="underline">
       {
        tabs.map((tab,i)=>{
      return(
          <Tabs.Item key={i} active title={tab.title} icon={tab.icon}>
             {tab.component}
         </Tabs.Item>    
          )
        })
       }
    </Tabs>
  );
}
