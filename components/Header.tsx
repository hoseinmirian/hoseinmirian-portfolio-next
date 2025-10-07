import { cn } from '@/lib'
import type { ComponentProps, ReactNode } from 'react'

type HeaderProps = ComponentProps<'header'> & {
  children?: ReactNode
}

export default function Header({ className, children }: HeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full py-6 backdrop-blur-sm',
        className
      )}
    >
      {children}
    </header>
  )
}
