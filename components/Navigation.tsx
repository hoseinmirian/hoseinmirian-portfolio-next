import NavLinks from '@/components/NavLinks'
import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'

const MAIN_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Resume', href: '/resume' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  return (
    <nav role="navigation" className='mx-auto flex max-w-7xl items-center justify-between'>
      <Link
        className='text-2xl font-bold'
        href='/'
      >
        Hossein Mirian
      </Link>
      <NavLinks navLinks={MAIN_NAV_LINKS} />
      <ThemeToggle />
    </nav>
  )
}
