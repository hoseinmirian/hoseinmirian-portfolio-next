import { render, screen } from '@/tests/test-utility'
import { resetDb, db } from '@/tests/mocks/db'
import Users from '@/app/users/page'

// Mock the components that use server-only code
vi.mock('@/features/users', () => ({
  FormActionTest: () => (
    <div data-testid='form-action-test'>Form Action Test</div>
  )
}))

describe('Users', () => {
  const users = []

  beforeAll(() => {
    // db
    // as an example, create some users in the mock database (it is useful only if we want to call fetch from an api endpoint and we need to mock it)
    ;['Hosein Mirian', 'Alex John'].forEach((item, index) => {
      const user = db.users.create({
        id: index.toString(),
        name: item
      })
      users.push(user)
    })
  })

  afterAll(() => {
    // make sure to reset the database after all tests
    resetDb() // Reset the mock database before all tests
  })

  describe('Renders', () => {
    it('renders the page with all components', () => {
      render(<Users />)

      const headerElement = screen.getByRole('heading', {
        name: /Form example/i
      })
      expect(headerElement).toBeInTheDocument()

      const formActionTest = screen.getByTestId('form-action-test')
      expect(formActionTest).toBeInTheDocument()

      const loadingElement = screen.getByText(/loading/i)
      expect(loadingElement).toBeInTheDocument()
    })
  })
})
