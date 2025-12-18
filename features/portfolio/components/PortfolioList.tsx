import { ListRenderer } from '@/components/ListRenderer'
import { ListItem } from '@/components/ListItem'
import type { PortfolioType } from '@/db/models'
import Image from 'next/image'

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
        <ListItem key={portfolioItem.title + '_' + idx} className='space-y-1'>
          <h2 className='text-lg font-semibold'>{portfolioItem.title}</h2>
          <Image
            className='mb-4'
            src={`/assets/images/${portfolioItem.img}`}
            height={400}
            width={600}
            alt={portfolioItem.title}
          />
          <p className='text-xl text-orange-500'>
            {portfolioItem.organization}
          </p>
          <p className='text-gray-600 dark:text-gray-200'>
            <b>Type:</b> {portfolioItem.type}
          </p>
          <p className='text-gray-600 dark:text-gray-200'>
            <b>Location:</b> {portfolioItem.location}
          </p>
          <p className='text-gray-600 dark:text-gray-200'>
            <b>Role:</b> {portfolioItem.role}
          </p>
          <p className='text-gray-600 dark:text-gray-200'>
            <b>Description:</b> {portfolioItem.description}
          </p>
          <p className='text-gray-600 dark:text-gray-200'>
            <b>Website: </b>
            {portfolioItem.website && (
              <a
                href={portfolioItem.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 underline'
              >
                {portfolioItem.website}
              </a>
            )}
          </p>
          <p className='text-gray-600 dark:text-gray-200'>
            <b>Github: </b>
            {portfolioItem.source_code && (
              <a
                href={portfolioItem.source_code}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 underline'
              >
                {portfolioItem.source_code}
              </a>
            )}
          </p>
          {portfolioItem.techs.map((tech, idx) => (
            <span
              key={tech + '_' + idx}
              className='mr-1 text-gray-600 dark:text-gray-200'
            >
              {idx !== 0 && ' | '}
              {tech}
            </span>
          ))}
        </ListItem>
      )}
    </ListRenderer>
  )
}
