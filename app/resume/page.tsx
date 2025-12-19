import { Flex } from '@/components/Layout'
import type { Metadata } from 'next'
import { ResumeListWrapper } from '@/features/resume'

export const metadata: Metadata = {
  title: 'Resume',
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
    title: 'Resume | Hossein Mirian',
    description:
      'Professional resume of Hossein Mirian, senior software engineer specializing in TypeScript, React, and Node.js.',
    url: 'https://hoseinmirian.com/resume',
    siteName: 'Hosein Mirian Portfolio',
    type: 'profile'
  },
  alternates: {
    canonical: 'https://hoseinmirian.com/resume'
  }
}

export default function Resume() {
  return (
      <Flex as='section' maxWidth='max-w-7xl' className='my-10'>
        <h1 className='text-3xl mb-4'>Resume</h1>
        <ResumeListWrapper />
      </Flex>
  )
}
