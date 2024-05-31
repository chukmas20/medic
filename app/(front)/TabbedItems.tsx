"use client"
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import ServiceList from "./services/ServiceList";
import { MicroscopeIcon, Stethoscope, X } from "lucide-react";
import LinkCards from "./doctors/LinkCards";
import { FaSyringe } from "react-icons/fa";

export default function TabbedItems() {
  const services = [
    {
      title:"Video Prescription",
      image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600",
      slug:"telehealth"
    },
    {
      title:"UTI consult",
      image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600",
      slug:"telehealth"
    },
    {
      title:"Mental Health",
      image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600",
      slug:"telehealth"
    },
    {
      title:"Telehealth",
      image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600",
      slug:"telehealth"
    },
    {
      title:"ED Consult",
      image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600",
      slug:"telehealth"
    },
    {
      title:"Urgent Care",
      image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=600",
      slug:"telehealth"
    },
    
]
  const tabs = [
     {
      title:"Popular Services",
      icon : MicroscopeIcon ,
      component: <ServiceList data ={services}  />,
      content: []
     },
     {
      title:"Doctors",
      icon : Stethoscope,
      component: <LinkCards  className="bg-yellow-800" />,
      content: []
     },
     {
      title:"Specialists",
      icon: X,
      component: <LinkCards  className="bg-red-800"/>,
      content: []
     },
     {
      title:"Symptoms",
      icon : FaSyringe,
      component: <LinkCards className="bg-purple-800" />,
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
