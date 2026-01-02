import { Flex } from '@/components/Layout'

export default function NotFound() {
  return (
      <Flex as='section' maxWidth='max-w-7xl' className='my-10 font-josefin'>
        <div className='bg-muted-foreground/10 border-muted mb-2 rounded border-1 px-2'>
          <h1 className='text-2xl font-semibold'>404 - Page Not Found</h1>
        </div>
        <p className='text-lg'>
          Sorry, the page you are looking for does not exist.
        </p>
      </Flex>
  )
}
