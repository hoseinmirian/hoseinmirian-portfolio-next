'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

type ShouldScrollFn = (pathname: string) => boolean

interface ScrollOptions {
  duration?: number // animation duration in ms, default 500
  shouldScroll?: ShouldScrollFn
}

export function useScrollToTop(options?: ScrollOptions) {
  const { duration = 500, shouldScroll } = options || {}
  const pathname = usePathname()
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    if (shouldScroll && !shouldScroll(pathname)) return

    const startY = window.scrollY
    const startTimeRef = { current: 0 }

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1) // 0 → 1

      // easeInOutQuad easing for smoother feel
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress

      window.scrollTo(0, startY * (1 - ease))

      if (elapsed < duration) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [pathname, shouldScroll, duration])
}
