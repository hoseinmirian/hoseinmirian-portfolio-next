import React from 'react'
import clsx from 'clsx'

interface props {
  children: React.ReactNode
  className?: string
  as?: React.ElementType,
}
// it should be used as based class for any reusable component I make so we keep them consistent 

export function Container({
  className,
  children,
  as: Component = 'div',
  ...props
}: props) {
  return (
    <Component
      className={clsx(
        // base behavior: full width, center content
        'mx-auto w-full',
        // optional max width to constrain content
        'max-w-7xl',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
