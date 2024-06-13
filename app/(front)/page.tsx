import Image from "next/image";
import HeroSection from "./Hero";
import MegaMenu from "@/components/frontend/MegaMenu";
import Brands from "./Brands";
import TabbedSection from "./TabbedSection";
import DoctorsList from "@/components/DoctorsList";


export default function Home() {
  return (
    <section className="">
         <HeroSection />
         <Brands  />
         <TabbedSection  />
         <DoctorsList  />
         <DoctorsList
           className="bg-white py-8 lg:py-24 dark:bg-slate-800"
            title="In-person doctor visit"  isInperson={true}
            />

    </section>
  );
}
