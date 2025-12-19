import { cn } from '@/lib'
import type { ComponentProps, ReactNode } from 'react'

type Props = ComponentProps<'header'> & {
  children?: ReactNode
}

export default function Header({ className, children }: Props) {
  return (
    <header
      role='banner'
      className={cn(
        'sticky top-0 z-50 w-full py-3 backdrop-blur-sm',
        className
      )}
    >
      {children}
    </header>
  )
}
