interface Props {
  label: string
  value: string | number
}

export function InfoCard({ label, value }: Props) {
  return (
    <div className='rounded-2xl border border-neutral-800 p-5 transition hover:border-neutral-700'>
      <p className='mb-1 text-xs tracking-wider text-neutral-400 uppercase'>
        {label}
      </p>
      <p className='text-base font-medium'>{value}</p>
    </div>
  )
}
