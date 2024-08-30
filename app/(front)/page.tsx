import Image from "next/image";
import HeroSection from "./Hero";
import MegaMenu from "@/components/frontend/MegaMenu";
import Brands from "./Brands";
import TabbedSection from "./TabbedSection";
import DoctorsList from "@/components/DoctorsList";
import { getDoctors } from "@/actions/users";


export default async function Home() {
  const doctors = await getDoctors() || []
  console.log(doctors);
  const telehealthDoctors = doctors.filter((doctor)=>doctor.doctorProfile?.operationMode === "TeleHealth visit")

  const inpersonDoctors = doctors.filter((doctor)=>doctor.doctorProfile?.operationMode === "In-person doctor visit")

  console.log(telehealthDoctors)

  return (
    <section className="">
         <HeroSection />
         <Brands  />
         <TabbedSection  />
         <DoctorsList 
          doctors={telehealthDoctors}
          title="TeleHealth visit"
         />
         <DoctorsList
           className="bg-white py-8 lg:py-24 dark:bg-slate-800"
            title="In-person doctor visit" 
             isInperson={true}
             doctors={inpersonDoctors}
            />            

    </section>
  );
}
