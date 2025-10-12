import { renderWithoutProviders, screen } from '@/tests/test-utility'
import { ResumeListWrapper } from '@/features/resume/components/ResumeListWrapper'
import { AppDataProvider } from '@/providers/AppDataProvider'

// we could use either mocked hook or real-ish provider wrapper approach
// here we demonstrate the provider wrapper approach
// because the hook is unaware of the provider's internal implementation
// so the provider wrapper approach is closer to real usage
// and avoids the need to mock the hook implementation
/*(useAppData as jest.Mock).mockReturnValue({
  allProfile: [{ name: 'Alice' }, { name: 'Bob' }] if allProfile changes in the provider with mock we never know but with provider we get compile error
});*/


describe('ResumeListWrapper', () => {
  describe('Renders', () => {
    it('renders nothing when no profiles', () => {
      const { container } = renderWithoutProviders(
        <AppDataProvider value={{ allProfile: [] }}>
          <ResumeListWrapper />
        </AppDataProvider>
      )
      
      expect(container).toBeEmptyDOMElement()
    })

    it('renders profile names', () => {
      renderWithoutProviders(
        <AppDataProvider value={{ allProfile: [{ name: 'Alice' }, { name: 'Bob' }] }}>
          <ResumeListWrapper />
        </AppDataProvider>
      );

      expect(screen.getByText(/Alice/)).toBeInTheDocument()
      expect(screen.getByText(/Bob/)).toBeInTheDocument()
    })
  })
})
