'use client'

import { useState, useEffect, useRef } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const [selectedTheme, setSelectedTheme] = useState('system')

  const didMount = useRef(false)

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true // no re-render
      return
    }
  }, [])

  useEffect(() => {
    if (!didMount.current) return

    if (selectedTheme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(isDark ? 'dark' : 'light')
    } else setTheme(selectedTheme)
  }, [selectedTheme, setTheme])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => setSelectedTheme('light')}
          aria-selected={selectedTheme === 'light'}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setSelectedTheme('dark')}
          aria-selected={selectedTheme === 'dark'}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setSelectedTheme('system')}
          aria-selected={selectedTheme === 'system'}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
