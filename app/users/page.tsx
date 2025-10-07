import { FormActionTest } from '@/features/users'
import { Flex } from '@/components/Layout'
import UserListWrapper from '@/features/users/components/UserListWrapper'
import { Suspense } from 'react'

export const revalidate = 60 // revalidate every 1 minutes (only works in production)

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
