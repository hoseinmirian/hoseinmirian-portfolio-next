'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Flex } from '@/components/Layout'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorPageProps) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Log the error to an error reporting service with route context
    console.error('Error occurred on route:', pathname, error)

    // You could send to error tracking service here
    // trackError(error, { route: pathname, digest: error.digest })
  }, [error, pathname])

  const handleRetry = () => {
    try {
      reset()
    } catch (retryError) {
      console.error('Retry failed:', retryError)
      // Fallback: navigate to home or safe route
      router.push('/')
    }
  }

  const navigateHome = () => {
    router.push('/')
  }

  return (
    <main className='font-josefin'>
      <Flex as='section' maxWidth='max-w-7xl' className='my-10'>
        <div className='bg-muted-foreground/10 border-muted mb-4 rounded border-1 p-4'>
          <h2 className='mb-2 text-2xl font-semibold'>Something went wrong</h2>
          <p className='text-muted-foreground mb-4'>
            An error occurred on {pathname}
          </p>
          {error?.digest && (
            <p className='text-muted-foreground mb-4 text-sm'>
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className='flex gap-4'>
          <button
            onClick={handleRetry}
            className='bg-primary text-primary-foreground hover:bg-primary/90 rounded px-4 py-2'
          >
            Try again
          </button>

          <button
            onClick={navigateHome}
            className='bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded px-4 py-2'
          >
            Go to Home
          </button>
        </div>
      </Flex>
    </main>
  )
}
