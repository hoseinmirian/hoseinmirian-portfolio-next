import type { PortfolioType } from '@/db'

interface Props {
  portfolioItem: PortfolioType
}

export function PortfolioItem({ portfolioItem }: Props) {
  return (
    <li className='rounded-lg border p-4 shadow-sm transition hover:shadow-md'>
      <h3 className='text-lg font-semibold'>{portfolioItem.title}</h3>
      <p className='text-sm text-gray-600'>{portfolioItem.type}</p>
    </li>
  )
}
