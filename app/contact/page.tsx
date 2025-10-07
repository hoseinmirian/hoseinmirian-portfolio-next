import { Flex } from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact'
}

export default function Contact() {
  return (
    <main>
      <Flex as='section' maxWidth='max-w-7xl' className='my-10'>
        <h1 className='text-3xl'>Contact page</h1>
      </Flex>
    </main>
  )
}
