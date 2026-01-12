import { Flex } from '@/components/Layout'
import { AboutWrapper } from '@/features/about'
import { PortfolioListWrapper } from '@/features/portfolio'
import { Separator } from '@/components/ui/separator'
import { Skills } from '@/features/skills'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home Page',
  description:
    'Professional resume of Hossein Mirian, senior software engineer specializing in TypeScript, React, Vue, and Node.js.',
  keywords: [
    'hossein mirian',
    'resume',
    'cv',
    'software engineer',
    'typeScript',
    'react',
    'vue',
    'node.js'
  ],
  openGraph: {
    title: 'Home Page | Hossein Mirian',
    description:
      'Professional portfolio website of Hossein Mirian, senior software engineer specializing in TypeScript, React, and Node.js.',
    url: 'https://hoseinmirian.com/',
    siteName: 'Hosein Mirian Portfolio',
    type: 'profile'
  },
  alternates: {
    canonical: 'https://hoseinmirian.com/resume'
  }
}

export default function Home() {
  return (
    <Flex as='section' maxWidth='max-w-7xl' className='my-6'>
      <h1 className='mb-4 text-3xl'>Home</h1>
      <AboutWrapper />
      <Separator className='my-8' />
      <Skills />
      <Separator className='my-8' />
      <PortfolioListWrapper visibleCount={4} />
    </Flex>
  )
}
