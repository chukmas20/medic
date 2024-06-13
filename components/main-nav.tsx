"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { docsConfig } from "@/config/docs"
import { title } from "process"

export function MainNav() {
  const pathname = usePathname()

 
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <img 
         className="h-10 w-10"
         src="https://freepngimg.com/thumb/health/22943-8-health-image-thumb.png" />
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
              href={"/"}
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