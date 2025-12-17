import { render, screen } from '@/tests/test-utility'
import { PortfolioListWrapper } from '@/features/portfolio/components'
import { AppDataProvider } from '@/providers/AppDataProvider'
import { createAppDataDTO } from '@/dal/dto/appData-dto'

describe('ResumeListWrapper', () => {
  const renderComponent = (options: { data?: any[] } = {}) => {
    const defaultData = [createAppDataDTO()]

    render(
      <AppDataProvider
        value={{
          data: options.data || defaultData
        }}
      >
        <PortfolioListWrapper />
      </AppDataProvider>
    )
    
    const assertLinkHref = (name: RegExp, href: string) => {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
    }

    const assertImage = (name: RegExp, src: string) => {
      const image = screen.getByRole('img', { name })
      expect(image).toHaveAttribute('src', expect.stringContaining(src))
    }
    
    return {
      assertLinkHref,
      assertImage
    }
  }
  
  describe('Renders', () => {
    it('renders no items found', () => {
      renderComponent();

      expect(screen.getByText(/found/)).toBeInTheDocument()
    })

    it('renders portfolio items', () => {
      const mockedData = createAppDataDTO({
        portfolio: [
          {
            title: 'Some title',
            type: 'Web Development',
            img: 'image.jpg',
            organization: 'Org',
            location: 'Location',
            role: 'Developer',
            description: 'Some text',
            website: 'https://mysite.com',
            source_code: 'https://github.com/example',
            techs: ['React', 'TypeScript'],
            order: 1
          }
        ]
      })
      
      const { assertLinkHref, assertImage } = renderComponent({ data: [mockedData] })

      expect(screen.getByText(/title/i)).toBeInTheDocument()
      expect(screen.getByText(/Org/i)).toBeInTheDocument()
      expect(screen.getByText(/Developer/i)).toBeInTheDocument()
      expect(screen.getByText(/Web Development/i)).toBeInTheDocument()
      expect(screen.getByText(/Some text/i)).toBeInTheDocument()
      expect(screen.getByText(/TypeScript/i)).toBeInTheDocument()
      expect(screen.getByText(/React/i)).toBeInTheDocument()
      
      assertImage(/some title/i, 'image.jpg')

      assertLinkHref(/mysite/i, 'https://mysite.com')
      assertLinkHref(/example/i, 'https://github.com/example')
    })
  })
})
