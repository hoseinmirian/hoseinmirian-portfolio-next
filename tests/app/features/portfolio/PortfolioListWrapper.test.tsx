import { render, screen } from '@/tests/test-utility'
import { PortfolioListWrapper } from '@/features/portfolio/components'
import { AppDataProvider } from '@/providers/AppDataProvider'
import { createAppDataDTO } from '@/dal/dto/appData-dto'

describe('ResumeListWrapper', () => {
  const renderComponent = (options: { data?: any[], props?: {} } = {}) => {
    const defaultData = [createAppDataDTO()]

    render(
      <AppDataProvider
        value={{
          data: options.data || defaultData
        }}
      >
        <PortfolioListWrapper {...options.props} />
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

      expect(
        screen.queryByRole('link', { name: /view all projects/i })
      ).not.toBeInTheDocument()
    })

    it('renders only the specific number of portfolio items', () => {
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
          },
          {
            title: 'Second title 2',
            type: 'Mobile Development 2',
            img: 'image2.jpg',
            organization: 'Org 2',
            location: 'Location 2',
            role: 'Developer 2',
            description: 'Some text 2',
            website: 'https://mysite.com 2',
            source_code: 'https://github.com/example2',
            techs: ['React2', 'TypeScript2'],
            order: 2
          }
        ]
      })
      
      const expectedVisibleCount = 1

      renderComponent({
        data: [mockedData],
        props: { visibleCount: expectedVisibleCount }
      })

      expect(screen.getAllByRole('listitem')).toHaveLength(expectedVisibleCount)
    })

    it('renders "View All Projects" button when there are more items than visibleCount', () => {
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
          },
          {
            title: 'Some title 2',
            type: 'Web Development 2',
            img: 'image2.jpg',
            organization: 'Org 2',
            location: 'Location 2',
            role: 'Developer 2',
            description: 'Some text 2',
            website: 'https://mysite.com/2',
            source_code: 'https://github.com/example/2',
            techs: ['React2', 'TypeScript2'],
            order: 2
          }
        ]
      })

      const { assertLinkHref } = renderComponent({
        data: [mockedData],
        props: { visibleCount: 1 }
      })

      assertLinkHref(/view all projects/i, '/portfolio')
    })

    it('does not render "View All Projects" button when visibleCount is not less than length', () => {
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

      renderComponent({
        data: [mockedData],
        props: { visibleCount: 1 }
      })

      expect(
        screen.queryByRole('link', { name: /view all projects/i })
      ).not.toBeInTheDocument()
    })
  })
})
