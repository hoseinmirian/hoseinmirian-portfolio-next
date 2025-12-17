import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import clsx from 'clsx'

type TimeLineItem = {
  organization: string
  location: string
  website: string
  role: string
  from: string
  to: string
  bulletPoints: string[]
}

interface Props {
  timelineItems: TimeLineItem[]
  className?: string
}

const Timeline = ({ timelineItems, className }: Props) => {
  const baseClass = clsx('relative max-w-4xl', className)

  if (timelineItems.length === 0) {
    return <p>No resume items found.</p>
  }

  return (
    <div className={baseClass}>
      <Separator
        orientation='vertical'
        className='bg-muted absolute top-4 left-2'
      />
      {timelineItems.map(
        (
          { organization, to, from, location, role, website, bulletPoints },
          idx
        ) => (
          <div key={idx} className='relative pl-8'>
            <div className='bg-foreground absolute top-3.5 left-0 flex size-4 items-center justify-center rounded-full' />

            <Card className='my-4 border-none shadow-none'>
              <CardContent className='px-5 space-y-2'>
                <p className='rounded-xl py-2 text-xl font-bold tracking-tight text-orange-500 xl:mb-4'>
                  {organization}
                </p>

                <p className='text-gray-600 dark:text-gray-200'>{location}</p>

                <p className='text-gray-600 dark:text-gray-200'>{role}</p>

                <p className='text-gray-600 dark:text-gray-200'>
                  <b>Website: </b>
                  <a
                    href={website}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-blue-400 underline'
                  >
                    {website}
                  </a>
                </p>

                <p className='text-md text-muted-foreground top-3 -left-34 rounded-xl tracking-tight xl:absolute'>
                  {from} - {to}
                </p>

                <ul className='list-disc space-y-4 p-5 text-gray-600 dark:text-gray-200'>
                  {bulletPoints.map((bulletPoint, idx) => (
                    <li key={`${bulletPoint}_${idx}`}>{bulletPoint}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )
      )}
    </div>
  )
}

export { Timeline }
