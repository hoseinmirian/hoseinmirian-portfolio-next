import { render, screen } from '@/tests/test-utility'
import { ContactWrapper } from '@/features/contact/components'
import { AppDataProvider } from '@/providers/AppDataProvider'
import { createAppDataDTO } from '@/dal/dto/appData-dto'


describe('ContactWrapper', () => {
  const renderComponent = (options: { data?: any[] } = {}) => {
    const defaultData = [createAppDataDTO()]

    render(
      <AppDataProvider
        value={{
          data: options.data || defaultData
        }}
      >
        <ContactWrapper />
      </AppDataProvider>
    )
  }

  describe('Renders', () => {
    it('renders contact form', () => {
      renderComponent()

      expect(screen.getByText(/Contact/i)).toBeInTheDocument()
    })
  })
})
