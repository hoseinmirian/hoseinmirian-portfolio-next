'use client'

import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Fragment } from 'react'
import { SlashIcon } from "lucide-react"

export default function BreadCrumbs({ className }: { className?: string }) {
  const pathname = usePathname()
  const parts = pathname.split("/").filter(Boolean)

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {parts.map((part, index) => {
          const href = "/" + parts.slice(0, index + 1).join("/")

          return (
            <Fragment key={href}>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={href}
                    className={pathname === href ? 'text-primary' : ''}
                  >
                    {part}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
