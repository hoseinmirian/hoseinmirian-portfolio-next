'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import ToasterProvider from './toaster-provider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute='class'
      defaultTheme='system'
      disableTransitionOnChange
    >
      {children}
      <ToasterProvider />
    </ThemeProvider>
  )
}
