"use client";
import { Tabs } from "flowbite-react";
import { DoctorProfile } from "@prisma/client";
import Monday from "./AvailabilityDays/Monday";
import Tuesday from "./AvailabilityDays/Tuesday";
import Wednesday from "./AvailabilityDays/Wednesday";
import Thursday from "./AvailabilityDays/Thursday";
import Friday from "./AvailabilityDays/Friday";
import Saturday from "./AvailabilityDays/Saturday";
import Sunday from "./AvailabilityDays/Sunday";



const AvailabilitySettings = ({
   profile
  }:{profile:DoctorProfile | undefined | null}) => {
  const tabs = [
    {
        name:"Monday",
        component: <Monday profile={profile} day="monday" />
    },
    {
        name:"Tuesday",
        component:<Tuesday profile={profile} day="tuesday"  />
    },
    {
        name:"Wednesday",
        component:  <Wednesday  profile={profile} day="thursday"  />
    },
    {
        name:"Thursday",
        component:<Thursday  profile={profile} day="thursday" />
    },
    {
        name:"Friday",
        component:<Friday  profile={profile}  day="friday" />
    },
    {
        name:"Saturday",
        component:<Saturday  profile={profile}  day="saturday" />
    },
    {
        name:"Sunday",
        component:<Sunday   profile={profile} day="sunday" />
    },
    
  ]
  return (
    <div className="py-3">
        <h2>Please add your availability for the week</h2>
    <Tabs aria-label="Default tabs"  className="py-3">
      {
         tabs.map((tab,i)=>{
             
            return(
             <Tabs.Item active key={i} title={tab.name}>
                {tab.component}
              </Tabs.Item>
            )
         })
      }
     
    </Tabs>
    </div>
  )
}

export default AvailabilitySettings