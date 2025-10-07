import { FormActionTest } from '@/features/users'
import { Flex } from '@/components/Layout'
import UserListWrapper from '@/features/users/components/UserListWrapper'
import { Suspense } from 'react'

// 1 hour (3600s): Good for user data that changes occasionally
// 6 hours (21600s): For relatively static content
// 24 hours (86400s): For very stable data like settings or configurations

export const revalidate = 60 // revalidate every 1 minutes (only works in production, in development it's always revalidated on each request)

export default function Users() {
  return (
    <main>
      <Flex as='section' maxWidth='max-w-7xl' className='my-10'>
        <h1 className='text-3xl'>Form example</h1>
        <FormActionTest userId='68d83d20ccc914b05456fa33' />
        <Suspense fallback={'loading'}>
          <UserListWrapper />
        </Suspense>
      </Flex>
    </main>
  )
}
