"use client";
import { Badge, Bell,  Book,  Calendar,  ExternalLink,  Home, LayoutGrid,  LogOut,  Mail, Package2, Ribbon, Settings, ShieldPlus, Stethoscope, User, Users2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

 
export default  function SideBar({session}:{session:Session}) {
   const {user} = session;
   const role = user?.role;
   const id = user?.id;
  const pathname = usePathname();
  const roles ={
    USER:[
      {title: "Dashboard", path:"/dashboard", icon: Home},
      {title: "Inbox", path:"/dashboard/user/inbox", icon: Mail},
      {
        title: "My Appointments",
       path:"/dashboard/user/appointments",
        icon: Calendar
      },
      {title: "Doctors", path:"/dashboard/user/doctors", icon: Users2},

      {
        title: "Settings",
       path:"/dashboard/user/settings",
        icon: Settings
      },
    ],
    ADMIN:[
      {title: "Dashboard", path:"/dashboard", icon: Home},
      {title: "Services", path:"/dashboard/services", icon: LayoutGrid},
      {title: "Specialties", path:"/dashboard/specialties", icon: ShieldPlus},
      {title: "Symptoms", path:"/dashboard/symptoms", icon: Ribbon},
      // {title: "Appointments", path:"/dashboard/appointments", icon: Bell},
      {title: "Doctors", path:"/dashboard/doctors", icon: Stethoscope},
      {title: "Patients", path:"/dashboard/patients", icon: User},


    ],
     DOCTOR:[
      {title: "Dashboard", path:"/dashboard", icon: Home},
      {title: "Patients", path:"/dashboard/doctor/patients", icon: Users2},
      {title: "Appointments", path:"/dashboard/doctor/appointments", icon: Calendar},
      {title: "Tasks", path:"/dashboard/doctor/tasks", icon: Book},
      {title: "Inbox", path:"/dashboard/doctor/inbox", icon: Mail},
      {
        title:"Profile",
        path:`/dashboard/doctor/profile/${id}`,
        icon: User
      },  
      // {
      //   title:"Live Preview",
      //   path:`/doctors/${slug}?id=${id}`,
      //   icon: ExternalLink
      // },      
      {
        title:"Settings",
        path:"/dashboard/doctor/settings",
        icon: Settings
      },
    ],
  };
  console.log(role)
  let sideBarLinks = roles[role] || [];
  
  const router = useRouter();
  async function handleLogout(){
    await signOut()
    router.push("/login")
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
           {
            sideBarLinks.map((item, i)=>{
              const Icon = item.icon
               return(
                <Link
                 key={i}
                  href={item.path}
                  className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                      pathname === item.path ? " bg-muted text-primary ":""
                  )}
                   >
                  <Icon className="h-4 w-4" />
                     {item.title}
                </Link>
               )
            })
           }   
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Card x-chunk="dashboard-02-chunk-0">
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            <Button onClick={handleLogout} size="sm" className="w-full bg-yellow-500 hover:bg-yellow-600">
              <LogOut  className="w-4 h-4 mr-2" />
               Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
  );
}