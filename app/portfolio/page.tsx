import { Flex } from '@/components/Layout'
import type { Metadata } from 'next'
import { PortfolioListWrapper } from '@/features/portfolio'

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Portfolio of Hosein Mirian – showcasing projects, case studies, and experience in web development.',
  keywords: [
    'portfolio',
    'web development',
    'react',
    'next.js',
    'typescript',
    'vue',
    'javascript',
    'frontend',
    'backend',
    'full-stack',
    'node',
    'hosein mirian'
  ],
  alternates: {
    canonical: 'https://hoseinmirian.com/resume'
  },
  openGraph: {
    title: 'Portfolio | Hosein Mirian',
    description:
      'Selected web development projects and case studies by Hosein Mirian.',
    url: 'https://hoseinmirian.com/portfolio',
    siteName: 'Hosein Mirian Portfolio',
    type: 'website'
  }
}

export default function Portfolio() {
  return (
      <Flex as='section' maxWidth='max-w-7xl' className='my-10'>
        <h1 className='text-3xl mb-4'>Portfolio</h1>
        <PortfolioListWrapper />
      </Flex>
  )
}
