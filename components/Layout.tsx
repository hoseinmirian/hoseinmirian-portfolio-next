import clsx from 'clsx'
import type { ReactNode, ElementType } from 'react'
import type {
  Gap,
  MaxWidth,
  JustifyContent,
  AlignItems,
  FlexDirection,
  Width
} from 'tailwindcss-types'

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

export type GridProps = GridPropsBase & (WidthOnly | MaxWidthOnly)

export function Grid({
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
      className={clsx(
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

export type FlexProps = FlexPropsBase & (WidthOnly | MaxWidthOnly)

export function Flex({
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
      className={clsx(
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
