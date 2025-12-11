import { render, screen } from '@/tests/test-utility'
import { PortfolioListWrapper } from '@/features/portfolio/components'
import { AppDataProvider } from '@/providers/AppDataProvider'
import { createAppDataDTO } from '@/dal/dto'


describe('ResumeListWrapper', () => {
  describe('Renders', () => {
    it('renders no items found', () => {
      render(
        <AppDataProvider
          value={{
            data: [createAppDataDTO()]
          }}
        >
          <PortfolioListWrapper />
        </AppDataProvider>
      )

      expect(screen.getByText(/found/)).toBeInTheDocument()
    })

    it('renders portfolio items', () => {
      const mockedData = createAppDataDTO({
        portfolio: [
          {
            title: 'some title',
            type: 'Web Development',
            img: 'some-image.jpg',
            organization: 'Org',
            location: 'Location',
            role: 'Developer',
            description: 'Description',
            website: 'https://example.com',
            source_code: 'https://github.com/example',
            techs: ['React', 'TypeScript']
          }
        ]
      })
      
      render(
        <AppDataProvider
          value={{
            data: [mockedData]
          }}
        >
          <PortfolioListWrapper />
        </AppDataProvider>
      )

      expect(screen.getByText(/title/)).toBeInTheDocument()
      expect(screen.getByText(/Org/)).toBeInTheDocument()
      expect(screen.getByText(/Developer/)).toBeInTheDocument()
      expect(screen.getByText(/Web Development/)).toBeInTheDocument()
      expect(screen.getByText(/some-image.jpg/)).toBeInTheDocument()
      expect(screen.getByText(/Description/)).toBeInTheDocument()
      expect(screen.getByText(/https:\/\/example.com/)).toBeInTheDocument()
      expect(screen.getByText(/https:\/\/github.com\/example/)).toBeInTheDocument()
      expect(screen.getByText(/React/)).toBeInTheDocument()
      expect(screen.getByText(/TypeScript/)).toBeInTheDocument()
    })
  })
})
