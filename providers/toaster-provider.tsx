import { useTheme } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'

export default function ToasterProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      position='top-right'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}
