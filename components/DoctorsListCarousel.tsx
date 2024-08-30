"use client";

import React from "react";
import "react-multi-carousel/lib/styles.css";
import DoctorCard from "./DoctorCard";
import { Doctor } from "@/types/type";
export default function DoctorsListCarousel(
    { 
    doctors,
    isInperson 
   }:{
    doctors:Doctor[],
   isInperson?: boolean
  }) {
 
  return (
    <div  
    >
     {doctors.map((doctor: Doctor, i:number)=>{
          return(
            <DoctorCard doctor={doctor} key={i} isInperson={isInperson}  />
             )
            })}
    </div>
  );
}