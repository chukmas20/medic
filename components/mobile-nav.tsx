"use client"

import * as React from "react"
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/navigation"
import { ViewVerticalIcon } from "@radix-ui/react-icons"

import { docsConfig } from "@/config/docs"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
             <img 
         className="h-10 w-10"
        src="data:image/png;base64,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"/>
          {/* <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span> */}
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
          <div className="flex flex-col space-y-2">
            {docsConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink
                            href={item.href}
                            onOpenChange={setOpen}
                            className="text-muted-foreground"
                          >
                            {item.title}
                            {item.label && (
                              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                {item.label}
                              </span>
                            )}
                          </MobileLink>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  )
}