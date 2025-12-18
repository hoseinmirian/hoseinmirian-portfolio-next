'use client';

import { useAppData } from '@/providers/AppDataProvider'
import { InfoCard } from './InfoCard'

export function About() {
  const { data } = useAppData();
  
  const { about } = data[0];
  
  return (
    <section className='flex bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100'>
      <div className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 py-2 lg:grid-cols-2'>
        {/* LEFT – INTRO */}
        <div className='space-y-6'>
          <h2 className='text-4xl font-bold tracking-tight md:text-5xl'>
            {about!.name}
          </h2>

          <p className='text-lg leading-relaxed text-neutral-700 dark:text-neutral-300'>
            {about!.full_summary}
          </p>

          <div className='prose prose-neutral dark:prose-invert max-w-none'>
            <p>{about!.biography}</p>
          </div>

          <a
            href={'assets/pdf/' + about!.cv_link}
            download
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center rounded-xl bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-800 hover:shadow-md dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200'
          >
            Download CV
          </a>
        </div>

        {/* RIGHT – DETAILS */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <InfoCard label='Degree' value={about!.degree} />
          <InfoCard
            label='Experience'
            value={`${about!.years_experience}+ years`}
          />
          <InfoCard label='Age' value={about!.age.toString()} />
          <InfoCard label='Nationality' value={about!.nationality} />
          <InfoCard label='Remote' value={about!.remote_availability} />
          <InfoCard label='Location' value={about!.address} />

          <div className='space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 sm:col-span-2 dark:border-neutral-800 dark:bg-neutral-900'>
            <p className='text-xs tracking-wider text-neutral-500 uppercase dark:text-neutral-400'>
              Contact
            </p>
            <p className='text-sm'>{about!.email}</p>
            <p className='text-sm'>{about!.phone}</p>
          </div>
        </div>
      </div>
    </section>
  )
}