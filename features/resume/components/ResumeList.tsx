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