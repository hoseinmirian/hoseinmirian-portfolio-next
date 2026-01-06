import type { ReactNode, ElementType } from 'react'
import type {
  Gap,
  MaxWidth,
  JustifyContent,
  AlignItems,
  FlexDirection,
  Width
} from 'tailwindcss-types'
import { cn } from '@/lib'

// ------------------ DISCRIMINATED UNIONS ------------------
type WidthOnly = { width: Width; maxWidth?: never }
type MaxWidthOnly = { maxWidth: MaxWidth; width?: never }

// ------------------ GRID ------------------
type GridPropsBase = {
  as?: ElementType
  children: ReactNode
  cols?: number
  auto?: { type: 'fit' | 'fill'; min: string; max?: string }
  gap?: Gap
  align?: AlignItems
  className?: string
}

type GridProps = GridPropsBase & (WidthOnly | MaxWidthOnly)

function Grid({
  as: Comp = 'div',
  children,
  cols = 1,
  auto,
  gap = 'gap-0',
  align = 'items-start',
  width,
  maxWidth,
  className
}: GridProps) {
  const colClasses = auto
    ? `grid-cols-[repeat(auto-${auto.type},minmax(${auto.min},${auto.max || '1fr'}))]`
    : `grid-cols-[repeat(${cols},minmax(0,1fr))]`

  return (
    <Comp
      className={cn(
        'grid',
        colClasses,
        gap,
        align,
        width ?? `mx-auto ${maxWidth}`,
        className
      )}
    >
      {children}
    </Comp>
  )
}

// ------------------ FLEX ------------------
type FlexPropsBase = {
  as?: ElementType
  children: ReactNode
  direction?: FlexDirection
  justify?: JustifyContent
  align?: AlignItems
  gap?: Gap
  className?: string
}

type FlexProps = FlexPropsBase & (WidthOnly | MaxWidthOnly)

function Flex({
  as: Comp = 'div',
  children,
  direction = 'flex-col',
  justify = 'justify-start',
  align = 'items-start',
  gap = 'gap-0',
  width,
  maxWidth,
  className
}: FlexProps) {
  return (
    <Comp
      className={cn(
        'flex',
        direction,
        justify,
        align,
        gap,
        width ?? `mx-auto ${maxWidth}`,
        className
      )}
    >
      {children}
    </Comp>
  )
}

export { Grid, Flex }
