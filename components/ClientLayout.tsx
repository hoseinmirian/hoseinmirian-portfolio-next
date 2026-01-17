'use client'

// not used in this project but kept for reference - seems next js is scrolling to top by default on route change
// https://dev.to/hijazi313/nextjs-15-scroll-behavior-a-comprehensive-guide-387j

import { useScrollToTop } from '@/hooks/useScrollToTop'
import type { ReactNode } from 'react'

export default function ClientLayout({
  children
}: {
  children: ReactNode
}) {
  useScrollToTop()

  return <>{children}</>
}
