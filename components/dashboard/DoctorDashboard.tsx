import { Session } from "next-auth"
import AnalyticsCard from "../AnalyticsCard"
import { getDoctorAnalytics } from "@/actions/stats";
import { getDoctorAppointments } from "@/actions/appointments";


const DoctorDashboard = async ({session}:{session:Session | null}) => {
  const user = session?.user;
  const analytics = await getDoctorAnalytics() || []
  // const appointments = (await getDoctorAppointments(doctorId)).data || []
  return (
    <div className="p-8 py-4">
        <p className='bg-yellow-500 text-white mb-2  px-2 flex rounded-md shadow-md w-20'>
             {user?.role}
         </p>
       <h1 className='text-2xl'>Hello, Dr. {user?.name}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
         {analytics.map((item,i)=>{
           return(
            <AnalyticsCard  key={i} data={item}/>
           )
         })}
       </div>
    </div>
  )
}

export default DoctorDashboard