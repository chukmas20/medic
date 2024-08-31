"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { docsConfig } from "@/config/docs"

export function MainNav() {
  const pathname = usePathname()

 
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <img 
         className=" w-32 "
        //  style={{width:"200px", height:"150px"}}
         src="https://utfs.io/f/9e828e54-7cd7-4bea-9f47-f2844c4fe763-1s9otp.png" />
        {/* <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span> */}
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {
          docsConfig.mainNav?.map((item,i)=>{
             return(
              <Link
              key={i}
              href={item.href ?? "#"}
              className={cn(
                "transition-colors hover:text-foreground/80 font-bold",
                pathname === item.href ? "text-yellow-600" : "text-foreground/60"
              )}
            >
               {item.title}
            </Link>
             )
          })
        }
      </nav>
    </div>
  )
}