import type { UserType } from '@/dal'
import UserItem from '@/features/users/components/UserItem'

type UserListProps = Array<Omit<UserType, 'active'>>

export default function UserList({ users }: { users: UserListProps }) {
  return (
    <ul>
      {users.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  )
}
