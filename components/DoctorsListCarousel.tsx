"use client";

import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

    const settings = {
      dots:true,
      infinite:true,
      speed: 500,
      slideToShow:3,
      slideTOScroll:3
    }
 
  return (
    <div
    className="grid grid-cols-1 lg:grid-cols-3 gap-2"
    >
     {doctors.slice(0,4).map((doctor: Doctor, i:number)=>{
          return(
                 <DoctorCard doctor={doctor} key={i} isInperson={isInperson}  />
             )
            })}
    </div>

  );
}