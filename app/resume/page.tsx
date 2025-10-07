import { Flex } from '@/components/Layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume'
}

export default function Resume() {
  return (
    <main>
      <Flex as='section' maxWidth='max-w-7xl' className='my-10'>
        <h1 className='text-3xl'>Resume page</h1>
      </Flex>
    </main>
  )
}
