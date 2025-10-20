'use client'

import type { ResumeType } from '@/db'

export interface ResumeItemProps {
  resume: ResumeType
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const { organization } = resume

  return (
    <li className='rounded p-4'>
      <p className='font-semibold'>{organization}</p>
    </li>
  )
}
