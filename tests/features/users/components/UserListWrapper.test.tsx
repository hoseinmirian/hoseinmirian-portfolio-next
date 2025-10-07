import { render, screen, waitFor } from '@/tests/test-utility'
import { getUsers } from '@/features/users'
import UserListWrapper from '@/features/users/components/UserListWrapper'
import { createUserDTO } from '@/dal/dto/user-dto'

// Mock the module where getUsers is defined
vi.mock('@/features/users', () => ({
  getUsers: vi.fn()
}))

const createUsersResponse = () => {
  const user1 = createUserDTO({
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    photo: 'a.jpg'
  })
  const user2 = createUserDTO({
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    photo: ''
  })
  return [user1, user2]
}

describe('UserListWrapper (Server Component)', () => {
  describe('Renders', () => {
    it('renders users list successfully', async () => {
      const users = createUsersResponse()

      // mock the server-side call
      vi.mocked(getUsers).mockResolvedValue({
        success: true,
        data: users as [],
        errors: null
      })

      // because it's an async Server Component, await its renderable JSX
      const ui = await UserListWrapper()
      const { container } = render(ui)

      expect(container).toBeInTheDocument()

      await waitFor(() => {
        const user1Name = users[0].name as string
        const user2Name = users[1].name as string

        expect(screen.getByText(user1Name)).toBeInTheDocument()
        expect(screen.getByText(user2Name)).toBeInTheDocument()
      })
    })

    it('renders errors if API fails', async () => {
      vi.mocked(getUsers).mockResolvedValue({
        success: false,
        data: null,
        errors: { message: 'Failed to load users' }
      })

      const ui = await UserListWrapper()
      render(ui)

      expect(
        await screen.findByText('Failed to load users')
      ).toBeInTheDocument()
    })

    it('renders an error message when no users found', async () => {
      vi.mocked(getUsers).mockResolvedValue({
        success: false,
        data: [],
        errors: { message: 'Users not found' }
      })

      const ui = await UserListWrapper()
      render(ui)

      expect(await screen.findByText('No users found')).toBeInTheDocument()
    })
  })
})
