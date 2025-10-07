import NavLinks from '@/components/NavLinks'
import { ThemeToggle } from '@/components/ThemeToggle'

const MAIN_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Users', href: '/users' }
]

export default function Navigation() {
  return (
    <nav className='mx-auto flex max-w-7xl items-center justify-between'>
      <p className='text-2xl font-bold'>Hossein Mirian</p>
      <NavLinks navLinks={MAIN_NAV_LINKS} />
      <ThemeToggle />
    </nav>
  )
}
