import { Flex } from '@/components/Layout'
import type { Metadata } from 'next'
import { ResumeListWrapper } from '@/features/resume'

export const metadata: Metadata = {
  title: 'Resume'
}

export default function Resume() {
  return (
      <Flex as='section' maxWidth='max-w-7xl' className='my-10'>
        <h1 className='text-3xl mb-4'>Resume</h1>
        <ResumeListWrapper />
      </Flex>
  )
}
