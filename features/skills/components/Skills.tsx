'use client';

import { useAppData } from '@/providers/AppDataProvider'
import { CheckCircle } from 'lucide-react'

interface Props {
  dataCy?: string
}

export function Skills({ dataCy = 'skills' }: Props) {
  const { data } = useAppData()

  const { skills = [] } = data[0]

  if (skills.length === 0) {
    return <p>No skills found.</p>
  }

  return (
    <section className='mx-auto max-w-7xl' data-cy={dataCy}>
      <ul className='grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6'>
        {skills.map(({ title }, idx) => (
          <li
            key={`${title}_${idx}`}
            className='group flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md'
          >
            <CheckCircle className='h-5 w-5 text-green-500 transition-transform group-hover:scale-110' />
            <span className='font-medium text-gray-800'>{title}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}