import React from 'react'
import { cn } from '@/lib'

interface Props<T extends Record<string, unknown>> {
  items: T[]
  layout?: 'grid' | 'list'
  gap?: string
  columns?: number
  className?: string
  children: (item: T, index: number) => React.ReactNode
  emptyState?: React.ReactNode
}

function ListRenderer<T extends Record<string, unknown>>({
  items,
  layout = 'list',
  gap = 'gap-4',
  columns = 3,
  className,
  children,
  emptyState = <p className='text-gray-500'>No items found.</p>,
  ...prop
}: Props<T>) {
  const baseClass =
    layout === 'grid'
      ? cn(
          'grid w-full',
          {
            'grid-cols-1': columns === 1,
            'grid-cols-1 sm:grid-cols-2': columns === 2,
            'grid-cols-1 sm:grid-cols-2 md:grid-cols-3': columns === 3,
            'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4':
              columns === 4,
            'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5':
              columns === 5,
            'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6':
              columns === 6
          },
          gap,
          className
        )
      : cn('flex', 'flex-col', 'w-full', gap, className)

  if (items.length === 0) {
    return <div className='py-8 text-center'>{emptyState}</div>
  }

  return (
    <ul className={baseClass} {...prop}>
      {items.map((item, idx) => children(item, idx))}
    </ul>
  )
}

/* -------------------------------------------------------------------
   🧪 USAGE EXAMPLES
------------------------------------------------------------------- */

// type User = { id: number; name: string; age: number }

/*
function ExampleList() {
  const users: User[] = [
    { id: 1, name: 'Charlie', age: 25 },
    { id: 2, name: 'Alice', age: 30 },
    { id: 3, name: 'Bob', age: 22 },
    { id: 4, name: 'Eve', age: 28 },
    { id: 5, name: 'Mallory', age: 35 }
  ]

  // we define a custom renderKey to ensure unique keys
  return (
    <ListRenderer items={users} layout='grid' columns={2} gap='gap-6'>
      {(user, idx) => (
        <div
          className='rounded-lg border p-4 shadow-sm transition hover:shadow-md'
          key={user.id + '_' + idx}
        >
          <h3 className='text-lg font-semibold'>{user.name}</h3>
          <p className='text-sm text-gray-600'>Age: {user.age}</p>
        </div>
      )}
    </ListRenderer>
  )
}
*/

export { ListRenderer }
