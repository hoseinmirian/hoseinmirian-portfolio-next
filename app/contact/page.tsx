import { Flex } from '@/components/Layout'
import type { Metadata } from 'next'
import ContactWrapper from '@/features/contact/components/ContactWrapper'

export const metadata: Metadata = {
  title: 'Contact'
}

export default function Contact() {
  return (
      <Flex as='section' maxWidth='max-w-7xl' className='my-6'>
        <h1 className='text-3xl mb-4'>Contact</h1>
        <ContactWrapper/>
      </Flex>
  )
}
