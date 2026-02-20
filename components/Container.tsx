import React from 'react'
import { cn } from '@/lib'

interface props {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

/*
* Only wrap:
	•	Page-level layout blocks
	•	Structural layout sections

Do NOT wrap:
	•	Buttons
	•	Cards
	•	Small reusable UI components

* */
// it should be used as based class for any reusable component I make so we keep them consistent
// full width container

export function Container({
  className,
  children,
  as: Component = 'div',
  ...props
}: props) {
  return (
    <Component
      className={cn('mx-auto w-full max-w-7xl min-w-0', className)}
      {...props}
    >
      {children}
    </Component>
  )
}

// full width container
export function Fluid({
  className,
  children,
  as: Component = 'div',
  ...props
}: props) {
  return (
    <Component className={cn('w-full min-w-0', className)} {...props}>
      {children}
    </Component>
  )
}
