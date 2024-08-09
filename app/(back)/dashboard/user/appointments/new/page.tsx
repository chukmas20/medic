
import DoctorsList from "@/components/DoctorsList";
import { getDoctors } from "@/actions/users";
import DoctorCard from "@/components/DoctorCard";



export default async function Home() {
  const doctors = await getDoctors() || []
  console.log(doctors);
  const telehealthDoctors = doctors.filter((doctor)=>doctor.doctorProfile?.operationMode === "TeleHealth visit")

  const inpersonDoctors = doctors.filter((doctor)=>doctor.doctorProfile?.operationMode === "In-person doctor visit")

  console.log(telehealthDoctors)

  return (
    <section className="">
        <h2> Select doctor to continue</h2>
         {telehealthDoctors && telehealthDoctors.length > 0 &&(
            <div className="py-4">
            <h2 className="px-4 mb-3 border-b font-semibold py-3 text-xl lg:text-3xl">Telehealth Doctors</h2>
            <div className="grid place-items-center">
              {
                telehealthDoctors.map((doctor)=>{
                    return <DoctorCard key={doctor.id}
                             isInperson={false} doctor={doctor}/>
                })
              }
            </div>
         </div>
         )}
        {inpersonDoctors && inpersonDoctors.length > 0 &&(
             <div className="py-4  ">
             <h2 className="px-4 mb-3 border-b font-semibold py-3 text-xl lg:text-3xl">Inperson Doctors</h2>
             <div className="grid place-items-center">
               {
                 inpersonDoctors.map((doctor)=>{
                     return <DoctorCard key={doctor.id}
                              isInperson={true} doctor={doctor}/>
                 })
               }
             </div>
          </div>
        )}
         
    </section>
  );
}
