import { render, screen } from '@/tests/test-utility'
import { Skills } from '@/features/skills/components/Skills'
import { AppDataProvider } from '@/providers/AppDataProvider'
import { createAppDataDTO } from '@/dal/dto/appData-dto'

describe('Skills', () => {
  const renderComponent = (options: { data?: any[] } = {}) => {
    const defaultData = [createAppDataDTO()]

    render(
      <AppDataProvider
        value={{
          data: options.data || defaultData
        }}
      >
        <Skills />
      </AppDataProvider>
    )
  }

  describe('Renders', () => {
    it('renders no items found', () => {
      renderComponent()

      expect(screen.getByText(/found/)).toBeInTheDocument()
    })
    
    it('renders skill items', () => {
      const mockedData = createAppDataDTO({
        skills: [
          { title: 'React', level: 'Advanced' },
          { title: 'TypeScript', level: 'Advanced' }
        ]
      })
      
      renderComponent({ data: [mockedData] })

      expect(screen.getByText(/React/i)).toBeInTheDocument()
      expect(screen.getByText(/TypeScript/i)).toBeInTheDocument()
    })
  })
})
