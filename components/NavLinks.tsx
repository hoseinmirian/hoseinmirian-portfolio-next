'use client'

import Link from 'next/link'
import { cn } from '@/lib'
import { usePathname } from 'next/navigation'

type LinkItem = {
  label: string
  href: string
  dataCy?: string
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
        'text-muted-foreground flex text-sm md:text-lg items-center gap-1 md:gap-4 font-light',
        className
      )}
    >
      {navLinks.map(({ href, label, dataCy }) => {
        const isActive = pathname === href
        return (
          <li
            key={href}
            className={cn(
              'transition-color text-muted-foreground hover:text-primary rounded-md px-3 py-1 duration-800',
              {
                'bg-primary text-primary-foreground hover:text-primary-foreground':
                  isActive
              }
            )}
          >
            <Link
              scroll={false}
              href={href}
              data-cy={dataCy || `main-nav-${label.toLowerCase()}`}
            >
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
