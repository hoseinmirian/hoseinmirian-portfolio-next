import { render, screen } from '@/tests/test-utility'
import { About } from '@/features/about/components/About'
import { AppDataProvider } from '@/providers/AppDataProvider'
import { createAppDataDTO } from '@/dal/dto/appData-dto'

describe('About', () => {
  const renderComponent = (options: { data?: any[] } = {}) => {
    const defaultData = [createAppDataDTO()]

    render(
      <AppDataProvider
        value={{
          data: options.data || defaultData
        }}
      >
        <About />
      </AppDataProvider>
    )

    const assertLinkHrefRegex = (name: RegExp, href: string) => {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', expect.stringContaining(href))
    }

    return {
      assertLinkHrefRegex
    }
  }

  describe('About', () => {
    describe('Renders', () => {
      it('renders about properties', () => {
        const mockedData = createAppDataDTO({
          about: {
            name: "Hossein",
            full_summary: "Full Summary",
            biography: "Developer",
            cv_link: "cv.pdf",
            degree: 'Msc Computer Science',
            years_experience: "10",
            age: "38",
            address:"17th Street",
            email: "example@gmail.com",
            phone: "+123456789",
            nationality:"Persian",
            remote_availability: "UK / Europe",
          }
        })

        const { assertLinkHrefRegex } = renderComponent({
          data: [mockedData]
        })

        expect(screen.getByText(/Hossein/i)).toBeInTheDocument()
        expect(screen.getByText(/Summary/i)).toBeInTheDocument()
        expect(screen.getByText(/Developer/i)).toBeInTheDocument()
        expect(screen.getByText(/Computer/i)).toBeInTheDocument()
        expect(screen.getByText(/10/i)).toBeInTheDocument()
        expect(screen.getByText(/38/i)).toBeInTheDocument()
        expect(screen.getByText(/Street/i)).toBeInTheDocument()
        expect(screen.getByText(/example/i)).toBeInTheDocument()
        expect(screen.getByText(/123/i)).toBeInTheDocument()
        expect(screen.getByText(/Persian/i)).toBeInTheDocument()
        expect(screen.getByText(/UK/i)).toBeInTheDocument()

        assertLinkHrefRegex(/download/i, 'pdf')
      })
    })
  })
})
