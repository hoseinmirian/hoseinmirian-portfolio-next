'use client'

import Link from 'next/link'
import { cn } from '@/lib'
import { usePathname } from 'next/navigation'

type LinkItem = {
  label: string
  href: string
}

interface Props {
  className?: string
  navLinks: LinkItem[]
}

export default function NavLinks({ className, navLinks }: Props) {
  const pathname = usePathname()

  return (
    <ul
      className={cn(
        'text-muted-foreground flex items-center gap-4 text-lg font-light',
        className
      )}
    >
      {navLinks.map(({ href, label }) => {
        const isActive = pathname === href
        return (
          <li
            key={href}
            className={cn(
              'transition-color rounded-md px-3 py-1 duration-800',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-primary'
            )}
          >
            <Link href={href}>{label}</Link>
          </li>
        )
      })}
    </ul>
  )
}
