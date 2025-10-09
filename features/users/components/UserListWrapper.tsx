import { getUsers } from '@/features/users/actions'
import UserList from '@/features/users/components/UserList'
import Errors from '@/components/Errors'

export default async function UserListWrapper() {
  const { success, data: users, errors } = await getUsers()

  if (!success && users?.length === 0) {
    return <span>No users found</span>
  }

  // granular error handling - we could also exclude it and just rely on nextjs error page
  if (!success) {
    return <Errors message={errors?.message ?? ''} />
  }

  // users! because of the above checks we are sure users is defined when we reach here
  return <UserList users={users!} />
}
