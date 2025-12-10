import { ListRenderer } from '@/components/ListRenderer'
import type { PortfolioType } from '@/db/models'

// internal component, not exposed from the feature index
import { PortfolioItem } from './PortfolioItem'

interface Props {
  visibleCount?: number
  portfolioItems: PortfolioType[]
}

export function PortfolioList({
  portfolioItems = [],
  visibleCount = portfolioItems.length
}: Props) {
  const visiblePortfolioItems = portfolioItems.slice(0, visibleCount)

  return (
    <ListRenderer
      items={visiblePortfolioItems}
      layout='grid'
      columns={2}
    >
      {(portfolioItem, id) => (
        <PortfolioItem key={portfolioItem.title + '_' + id} portfolioItem={portfolioItem} />
      )}
    </ListRenderer>
  )
}
