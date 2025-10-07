import type { UserType } from '@/dal'

type UserItemProps = Omit<UserType, 'active'>

export default function UserItem({ user }: { user: UserItemProps }) {
  const { name, email } = user

  return (
    <li className='bg-secondary rounded p-4 shadow' data-testid='user-item'>
      <h3 className='font-semibold'>{name}</h3>
      <p className='text-sm text-gray-500'>{email}</p>
    </li>
  )
}
