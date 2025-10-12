'use client'

type ResumeItemProps = {
  name: string
}

export default function ResumeItem({ resume }: { resume: ResumeItemProps }) {
  const { name } = resume

  return (
    <li className='rounded p-4'>
      <p className='font-semibold'>{name}</p>
    </li>
  )
}
