'use client';

import { useAppData } from '@/providers/AppDataProvider'
import { About } from './About'

interface Props {
  dataCy?: string;
}

export function AboutWrapper({ dataCy = 'about-wrapper' }: Props) {
  const { data } = useAppData()

  const { about } = data[0]

  return (
    <section
      className='flex bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100'
      data-cy={dataCy}
    >
      <About about={about} />
    </section>
  )
}