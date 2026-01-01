'use client';

import { useAppData } from '@/providers/AppDataProvider'
import { About } from './About'

export function AboutWrapper() {
  const { data } = useAppData();
  
  const { about } = data[0];
  
  return (
    <section className='flex bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100'>
      <About about={about} />
    </section>
  )
}