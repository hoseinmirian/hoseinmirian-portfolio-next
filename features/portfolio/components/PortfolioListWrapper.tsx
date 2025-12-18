'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PortfolioList } from './PortfolioList'
import { useAppData } from '@/providers/AppDataProvider'

interface props {
  visibleCount?: number
}

export function PortfolioListWrapper({ visibleCount }: props) {
  // - here we would normally fetch data from an API or use context/provider if this is marked as client component
  // - we can assemble different sets of integration feature like sorting, filtering, pagination etc.

  const { data } = useAppData()
  
  const { portfolio = [] } = data[0]
  
  return (
    <>
      <PortfolioList portfolioItems={portfolio} visibleCount={visibleCount} />
      {visibleCount && portfolio.length > visibleCount && (
        <Button variant='outline' className='mx-auto mt-6 flex'>
          <Link href='/portfolio'>View All Projects</Link>
        </Button>
      )}
    </>
  )
}
