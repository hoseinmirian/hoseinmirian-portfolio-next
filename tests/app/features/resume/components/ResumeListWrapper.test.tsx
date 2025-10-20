import { renderWithoutProviders, screen } from '@/tests/test-utility'
import { ResumeListWrapper } from '@/features/resume/components/ResumeListWrapper'
import { AppDataProvider } from '@/providers/AppDataProvider'

// we could use either mocked hook or real-ish provider wrapper approach
// here we demonstrate the provider wrapper approach
// because the hook is unaware of the provider's internal implementation
// so the provider wrapper approach is closer to real usage
// and avoids the need to mock the hook implementation
/*(useAppData as jest.Mock).mockReturnValue({
  data: [{ organisation: 'Alice' }, { organisation: 'Bob' }] if data changes in the provider with mock we never know but with provider we get compile error
});*/


describe('ResumeListWrapper', () => {
  describe('Renders', () => {
    it('renders nothing when no data', () => {
      const { container } = renderWithoutProviders(
        <AppDataProvider
          value={{
            data: [
              {
                id: '1',
                resume: []
              }
            ]
          }}
        >
          <ResumeListWrapper />
        </AppDataProvider>
      )
      
      expect(container).toBeEmptyDOMElement()
    })

    it('renders resume items', () => {
      renderWithoutProviders(
        <AppDataProvider
          value={{
            data: [
              {
                id: '1',
                resume: [
                  {
                    organization: 'Oxford University',
                    location: 'Oxford, UK',
                    from: '2010-09-01',
                    to: '2013-06-30',
                    role: 'Bachelor of Science in Computer Science',
                    website: 'https://www.ox.ac.uk',
                    bullet_points: ['Graduated with honors, list for 6 semesters'],
                  },
                ]
              }
            ]
          }}
        >
          <ResumeListWrapper />
        </AppDataProvider>
      )

      expect(screen.getByText(/Oxford University/)).toBeInTheDocument()
    })
  })
})
