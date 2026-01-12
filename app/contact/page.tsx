import { Flex } from '@/components/Layout'
import type { Metadata } from 'next'
import ContactWrapper from '@/features/contact/components/ContactWrapper'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Hossein Mirian for inquiries, collaborations, or professional opportunities in software engineering.',
  keywords: [
    'hossein mirian',
    'contact',
    'cv',
    'software engineer',
    'typeScript',
    'react',
    'vue',
    'node.js'
  ],
  openGraph: {
    title: 'Contact | Hossein Mirian',
    description:
      'Professional portfolio of Hossein Mirian, senior software engineer specializing in TypeScript, React, and Node.js.',
    url: 'https://hoseinmirian.com/resume',
    siteName: 'Hosein Mirian Portfolio',
    type: 'profile'
  },
  alternates: {
    canonical: 'https://hoseinmirian.com/contact'
  }
}


export default function Contact() {
  return (
      <Flex as='section' maxWidth='max-w-7xl' className='my-6'>
        <h1 className='text-3xl mb-4'>Contact</h1>
        <ContactWrapper/>
      </Flex>
  )
}
