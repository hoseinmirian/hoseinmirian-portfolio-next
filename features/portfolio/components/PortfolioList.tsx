import { ListRenderer } from '@/components/ListRenderer'
import { ListItem } from '@/components/ListItem'
import type { PortfolioType } from '@/db/models'

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
    <ListRenderer items={visiblePortfolioItems} layout='grid' columns={2}>
      {(portfolioItem, idx) => (
        <ListItem key={portfolioItem.title + '_' + idx}>
          <h3 className='text-lg font-semibold'>{portfolioItem.title}</h3>
          <p className='text-sm text-gray-600'>{portfolioItem.type}</p>
          <p className='text-sm text-gray-600'>{portfolioItem.img}</p>
          <p className='text-sm text-gray-600'>{portfolioItem.organization}</p>
          <p className='text-sm text-gray-600'>{portfolioItem.location}</p>
          <p className='text-sm text-gray-600'>{portfolioItem.role}</p>
          <p className='text-sm text-gray-600'>{portfolioItem.description}</p>
          <p className='text-sm text-gray-600'>{portfolioItem.website}</p>
          <p className='text-sm text-gray-600'>{portfolioItem.source_code}</p>
          {portfolioItem.techs.map((tech) => (
            <span key={tech} className='text-sm text-gray-600 mr-1'>
              {tech}
            </span>
          ))}
        </ListItem>
      )}
    </ListRenderer>
  )
}
