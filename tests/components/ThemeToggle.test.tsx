import { render, screen, userEvent, type UserEvent } from '@/tests/test-utility'
import { ThemeToggle } from '@/components/ThemeToggle'

describe('ThemeToggle', () => {
  let user: UserEvent
  beforeEach(() => {
    user = userEvent.setup()
  })

  describe('Renders', () => {
    it('renders the toggle button', () => {
      render(<ThemeToggle />)

      const button = screen.getByRole('button', { name: /toggle theme/i })

      expect(button).toBeInTheDocument()
    })
  })

  describe('Behavior', () => {
    it('sets light theme when clicking Light option', async () => {
      render(<ThemeToggle />)

      const button = screen.getByRole('button', { name: /toggle theme/i })

      await user.click(button)

      const lightOption = await screen.findByText(/Light/i)

      await user.click(lightOption)

      expect(document.documentElement.classList.contains('light')).toBe(true)
    })

    it('sets dark theme when clicking Dark option', async () => {
      render(<ThemeToggle />)

      const button = screen.getByRole('button', { name: /toggle theme/i })

      await user.click(button)

      const darkOption = await screen.findByText(/Dark/i)

      await user.click(darkOption)

      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('sets system theme when clicking System option', async () => {
      render(<ThemeToggle />)

      const button = screen.getByRole('button', { name: /toggle theme/i })

      await user.click(button)

      const systemOption = await screen.findByText(/System/i)

      await user.click(systemOption)

      // Simulate system preference (this part may vary based on testing environment)
      const isDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      if (isDarkMode) {
        expect(document.documentElement.classList.contains('dark')).toBe(true)
      } else {
        expect(document.documentElement.classList.contains('light')).toBe(true)
      }
    })
  })
})
