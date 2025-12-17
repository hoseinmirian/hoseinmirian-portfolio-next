import { render, screen } from '@/tests/test-utility'
import { ResumeListWrapper } from '@/features/resume/components/ResumeListWrapper'
import { AppDataProvider } from '@/providers/AppDataProvider'
import { createAppDataDTO } from '@/dal/dto/appData-dto'

// we could use either mocked hook or real-ish provider wrapper approach
// here we demonstrate the provider wrapper approach
// because the hook is unaware of the provider's internal implementation
// so the provider wrapper approach is closer to real usage
// and avoids the need to mock the hook implementation
/*(useAppData as jest.Mock).mockReturnValue({
  data: [{ organisation: 'Alice' }, { organisation: 'Bob' }] if data changes in the provider with mock we never know but with provider we get compile error
});*/


describe('ResumeListWrapper', () => {
  const renderComponent = (options: { data?: any[] } = {}) => {
    const defaultData = [createAppDataDTO()]

    render(
      <AppDataProvider
        value={{
          data: options.data || defaultData
        }}
      >
        <ResumeListWrapper />
      </AppDataProvider>
    )

    const assertLinkHref = (name: RegExp, href: string) => {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
    }

    return {
      assertLinkHref,
    }
  }

  describe('ResumeListWrapper', () => {
    describe('Renders', () => {
      it('renders no items found', () => {
        renderComponent()

        expect(screen.getByText(/found/)).toBeInTheDocument()
      })

      it('renders portfolio items', () => {
        const mockedData = createAppDataDTO({
          resume: [
            {
              organization: 'Org',
              location: 'Location',
              role: 'Developer',
              from: '2020',
              to: '2021',
              bullet_points: ['text1', 'text2'],
              website: 'https://mysite.com'
            }
          ]
        })

        const { assertLinkHref } = renderComponent({
          data: [mockedData]
        })

        expect(screen.getByText(/Org/i)).toBeInTheDocument()
        expect(screen.getByText(/Location/i)).toBeInTheDocument()
        expect(screen.getByText(/Developer/i)).toBeInTheDocument()
        expect(screen.getByText(/2020/i)).toBeInTheDocument()
        expect(screen.getByText(/2021/i)).toBeInTheDocument()
        expect(screen.getByText(/text1/i)).toBeInTheDocument()
        expect(screen.getByText(/text2/i)).toBeInTheDocument()

        assertLinkHref(/mysite/i, 'https://mysite.com')
      })
    })

  })
})
