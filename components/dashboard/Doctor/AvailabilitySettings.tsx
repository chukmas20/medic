"use client";
import { Tabs } from "flowbite-react";
import { DoctorProfile } from "@prisma/client";
import Monday from "./AvailabilityDays/Monday";
import Tuesday from "./AvailabilityDays/Tuesday";
import Wednesday from "./AvailabilityDays/Wednesday";
import Thursday from "./AvailabilityDays/Thursdat";
import Friday from "./AvailabilityDays/Friday";
import Saturday from "./AvailabilityDays/Saturday";



const AvailabilitySettings = ({profile}:{profile:DoctorProfile | undefined | null}) => {
  const tabs = [
    {
        name:"Monday",
        component: <Monday profile={profile} />
    },
    {
        name:"Tuesday",
        component:<Tuesday profile={profile}  />
    },
    {
        name:"Wednesday",
        component:  <Wednesday  profile={profile}  />
    },
    {
        name:"Thursday",
        component:<Thursday  profile={profile}  />
    },
    {
        name:"Friday",
        component:<Friday  profile={profile}  />
    },
    {
        name:"Saturday",
        component:<Saturday  profile={profile}  />
    },
    {
        name:"Sunday",
        component:<> This is <span className="font-medium text-gray-800 dark:text-white">Profile tab's associated content</span>.
        Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
        control the content visibility and styling.</>
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