"use client"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import  ModeToggle  from "@/components/ModeToggle"
import { CircleUser, LogIn, LogOut} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Session } from "next-auth"
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { generateInitials } from "@/utils/genrateInitials"
import Searchbar from "./Searchbar";

export function SiteHeader({session}:{session : Session | null}) {
  const user = session?.user;
  const initials = generateInitials(user?.name)
  const router = useRouter();

  async function handleLogout(){
    await signOut();
    router.push("/login")
  }

 
  
  return (
    <header className="sticky top-0 z-50 w-full  border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
        <div className="w-full flex-1">
              <Searchbar   />
          </div>
          <nav className="flex items-center gap-4">
            {session && session.user && user?.email ? (
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <Avatar>
          
                    {user.image ? (
                      <AvatarImage src="https://github.com/shadcn.png" />
                    ):(
                      <AvatarFallback>{initials}</AvatarFallback>
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
                  <DropdownMenuItem>
                      <Link href="/dashboard">Dashboard</Link>
                   </DropdownMenuItem>
                  {/* <DropdownMenuItem>Support</DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={()=>handleLogout()}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
                  </DropdownMenu>
            ):(
              <Button className="bg-yellow-600 rounded-full hover:bg-yellow-700" asChild>
              <Link href="/login">
                <LogIn className=" h-4 w-4 font-bold" size={30}/> 
                </Link>
           </Button>
            )}
            {/* <ModeToggle /> */}
          </nav>
        </div>
      </div>
    </header>
  )
}