'use client'

import { PortfolioList } from './PortfolioList'
import { useAppData } from '@/providers/AppDataProvider'

export function PortfolioListWrapper() {
  // - here we would normally fetch data from an API or use context/provider if this is marked as client component
  // - we can assemble different sets of integration feature like sorting, filtering, pagination etc.

  const { data } = useAppData()
  
  const { portfolio = [] } = data[0]

  return <PortfolioList portfolioItems={portfolio} />
}
