"use client";
 
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from "next/navigation";
import {  Badge, Bell, AlarmClock, Book, Calendar, CircleUser, Home,  LayoutGrid,  LineChart,  Mail,  Menu, Package, Pen, Package2, Ribbon, Search, Settings, ShieldPlus, ShoppingCart, Stethoscope, User, Users, Users2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import ModeToggle from "../ModeToggle";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
 
export default function Navbar({session}: {session: Session}) {
  const user = session.user;
  const router = useRouter();
  const role = user?.role;
  const id = user?.id;
  const pathname = usePathname();
  async function handleLogout(){
    await signOut();
    router.push("/login")
  }

  
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
      // {title: "Profile", path:"/dashboard/profile", icon: Users2},

    ],
    ADMIN:[
      {title: "Dashboard", path:"/dashboard", icon: Home},
      {title: "Services", path:"/dashboard/services", icon: LayoutGrid},
      {title: "Specialties", path:"/dashboard/specialties", icon: ShieldPlus},
      {title: "Symptoms", path:"/dashboard/symptoms", icon: Ribbon},
      {title: "Appointments", path:"/dashboard/appointments", icon: AlarmClock},
      {title: "Doctors", path:"/dashboard/doctors", icon: Stethoscope},
      {title: "Patients", path:"/dashboard/patients", icon: User},
      // {title: "Profile", path:"/dashboard/profile", icon: Users2},
      {title: "Blog", path:"/dashboard/blog", icon: Pen},

    ],
     DOCTOR:[
      {title: "Dashboard", path:"/dashboard", icon: Home},
      {title: "Patients", path:"/dashboard/doctor/patients", icon: Users2},
      {title: "Appointments", path:"/dashboard/doctor/appointments", icon: Calendar},
      // {title: "Tasks", path:"/dashboard/doctor/tasks", icon: Book},
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
  console.log(roles)
  let sideBarLinks = roles[role] || [];
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
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
      </SheetContent>
    </Sheet>
    <div className="w-full flex-1">
      <form>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search ..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
          />
        </div>
      </form>
    </div>
    {/* <ModeToggle  /> */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <Avatar>
          {user.image ? (
            <AvatarImage src="https://github.com/shadcn.png" />
          ):(
            <AvatarFallback>DA</AvatarFallback>
          )}
         </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
           <Link href="/">Website</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=>handleLogout()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </header>
  );
}