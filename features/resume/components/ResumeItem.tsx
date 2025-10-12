'use client'

type ResumeItemProps = {
  name: string
}

export default function ResumeItem({ resume }: { resume: ResumeItemProps }) {
  const { name } = resume

  return (
    <li className='rounded p-4'>
      <h3 className='font-semibold'>{name}</h3>
    </li>
  )
}
