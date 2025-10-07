import { Flex } from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About'
}

export default function About() {
  return (
    <main>
      <Flex as='section' maxWidth='max-w-7xl' className='my-10'>
        <h1 className='text-3xl'>About page</h1>
      </Flex>
    </main>
  )
}
