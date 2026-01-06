'use client'

import { useAppData } from '@/providers/AppDataProvider'
import {
  MailIcon,
  GlobeIcon,
  GitPullRequest,
  Link,
  LucideListVideo,
  type LucideIcon
} from 'lucide-react'
import type { SocialType } from '@/db'
import { cn } from '@/lib'
import { Container } from '@/components/Container'

const platformIconMap: Record<SocialType['platform'], LucideIcon> = {
  email: MailIcon,
  website: GlobeIcon,
  github: GitPullRequest,
  linkedin: Link,
  youtube: LucideListVideo
}

interface Props {
  className?: string
}

export default function ContactSocials({ className }: Props) {
  const { data } = useAppData()

  const { social = [] } = data[0]
  
  if (social.length === 0) {
    return null
  }

  const baseClass = cn(`justify-center flex gap-4`, className)
  
  return (
    <Container className={baseClass} as="ul">
      {social.map(({ platform, url }) => {
        const Icon = platformIconMap[platform]

        return (
          <li
            key={platform}
            className='flex flex-col items-center gap-1 text-sm'
          >
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Open ${platform} profile`}
            >
              <Icon size={16} className='mr-1' />
            </a>
            {platform}
          </li>
        )
      })}
    </Container>
  )
}