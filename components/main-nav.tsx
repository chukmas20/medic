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
      <Link href="/" className="mr-6 flex items-center space-x-2 rounded-full">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <img 
         className="h-10 w-10 rounded-full"
         src="https://utfs.io/f/f58b4f21-b50d-4710-9ff1-54dad8a7effc-zcjszo.png" />
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