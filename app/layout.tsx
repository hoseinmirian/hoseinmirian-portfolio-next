import type { Metadata } from 'next'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Josefin_Sans, Lora } from 'next/font/google'
import Providers from '@/providers'
import Header from '@/components/Header'
import BreadCrumbs from '@/components/BreadCrumbs'
import Navigation from '@/components/Navigation'
import { AppDataProvider } from '@/providers/AppDataProvider'
import { getAllAppData } from '@/actions'
import './globals.css'

const josefin = Josefin_Sans({
  variable: '--font-josefin',
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap'
})

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    template: '%s / Hossein Mirian',
    default: 'Welcome / Hossein Mirian'
  },
  description: 'Hossein Mirian portfolio website',
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png'
    },
    {
      rel: 'icon',
      url: '/favicon.ico'
    }
  ]
}

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const { data, success } = await getAllAppData()
  if (!success) {
    console.debug("Error loading app data.")
  }
  
  const value = data ? { data } : { data: [] }
  
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${josefin.variable} ${lora.variable} font-josefin relative min-h-dvh antialiased`}
      >
        <AppDataProvider value={value}>
          <Providers>
            <Header>{<Navigation />}</Header>
            <BreadCrumbs className='divide-accent bg-background font-lora mx-auto mb-4 max-w-7xl border-b' />
            {children}
          </Providers>
        </AppDataProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}
