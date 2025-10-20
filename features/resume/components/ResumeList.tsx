'use client'

import ResumeItem from '@/features/resume/components/ResumeItem'
import type { ResumeType } from '@/db'

export interface ResumeListProps {
  resumes: ResumeType[]
}

export default function ResumeList({ resumes }: ResumeListProps)  {
  if (resumes.length === 0) {
    return null
  }
  
  return (
    <ul>
      {resumes.map(resumeItem => (
        <ResumeItem key={resumeItem.organization} resume={resumeItem} />
      ))}
    </ul>
  )
}

/*
using children prop to customize rendering of each resume item
export default function GenericList<T>({
  items,
  children,
  as: Component = 'ul',
}: {
  items: T[]
  children: (item: T, index: number) => React.ReactNode
  as?: keyof JSX.IntrinsicElements
}) {
  return <Component>{items.map((item, i) => children(item, i))}</Component>
}
 */