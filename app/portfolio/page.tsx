import { Flex } from '@/components/Layout'
import type { Metadata } from 'next'
import { PortfolioListWrapper } from '@/features/portfolio'

export const metadata: Metadata = {
  title: 'Portfolio'
}

export default function Portfolio() {
  return (
      <Flex as='section' maxWidth='max-w-7xl' className='my-10'>
        <h1 className='text-3xl mb-4'>Portfolio</h1>
        <PortfolioListWrapper />
      </Flex>
  )
}
