'use client'

import ResumeItem from '@/features/resume/components/ResumeItem'

type ResumeListProps = { name: string }[]

export default function ResumeList({ resumes }: { resumes: ResumeListProps }) {
  return (
    <ul>
      {resumes.map(resume => (
        <ResumeItem key={resume.name} resume={resume} />
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