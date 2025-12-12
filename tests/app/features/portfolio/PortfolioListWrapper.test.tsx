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
            img: 'image.jpg',
            organization: 'Org',
            location: 'Location',
            role: 'Developer',
            description: 'Description',
            website: 'https://example.com',
            source_code: 'https://github.com/example',
            techs: ['React', 'TypeScript'],
            order: 1
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
      expect(screen.getByText(/Description/)).toBeInTheDocument()
      expect(screen.getByText(/TypeScript/)).toBeInTheDocument()
      expect(screen.getByText(/React/)).toBeInTheDocument()
      expect(screen.getByRole('img', { name: /some title/i })).toHaveAttribute(
        'src',
        expect.stringContaining('image.jpg')
      )
      expect(
        screen.getByRole('link', { name: /https:\/\/example\.com/ })
      ).toHaveAttribute('href', 'https://example.com')
      expect(
        screen.getByRole('link', { name: /https:\/\/github\.com\/example/ })
      ).toHaveAttribute('href', 'https://github.com/example')
    })
  })
})
