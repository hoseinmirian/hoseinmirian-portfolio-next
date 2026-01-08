import { Flex } from '@/components/Layout'

interface Props {
  message: string
}

export default function Errors({ message }: Props) {
  return (
    <main>
      <Flex as='section' maxWidth='max-w-7xl' className='my-10'>
        <div className='bg-muted-foreground/10 border-muted mb-4 rounded border-1 p-4'>
          <h2 className='mb-2 text-2xl font-semibold'>{message}</h2>
        </div>
      </Flex>
    </main>
  )
}
