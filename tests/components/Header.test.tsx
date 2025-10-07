import { render, screen } from '@/tests/test-utility'

import Header from '@/components/Header'

describe('Header', () => {
  describe('Renders', () => {
    it('renders the header', () => {
      render(<Header />)

      const headerElement = screen.getByRole('banner')

      expect(headerElement).toBeInTheDocument()
    })

    it('applies custom class names', () => {
      render(<Header className='custom-class' />)

      const headerElement = screen.getByRole('banner')

      expect(headerElement).toHaveClass('custom-class')
    })

    it('renders children correctly', () => {
      render(
        <Header>
          <div>Child Content</div>
        </Header>
      )

      const childElement = screen.getByText(/Child Content/i)

      expect(childElement).toBeInTheDocument()
    })
  })
})
