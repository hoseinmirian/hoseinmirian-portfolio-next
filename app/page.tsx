import { Button } from '@/components/ui/button'
import { Flex } from '@/components/Layout'

export default function Home() {
  return (
    <main>
      {/* Section 1: max width, items start */}
      <Flex as='section' maxWidth='max-w-7xl' className='my-10 max-h-full'>
        <h1 className='text-3xl'>Home page</h1>
        <Button variant='secondary'>some text</Button>
      </Flex>

      {/* Section 2: full width, items center */}
      <Flex
        width='w-full'
        align='items-center'
        justify='justify-center'
        className='min-h-[10rem] border border-gray-200'
      >
        <p className='text-2xl'>full width section items centre</p>
      </Flex>

      {/* Section 3: max width, items start */}
      <Flex maxWidth='max-w-7xl' className='border border-red-200'>
        <p className='text-2xl'>max width section</p>
      </Flex>

      {/* Section 4: max width, items center */}
      <Flex
        maxWidth='max-w-7xl'
        align='items-center'
        justify='justify-center'
        className='border border-orange-200'
      >
        <p className='text-2xl'>max width centered content</p>
      </Flex>

      {/* Section 5: full width, items start */}
      <Flex width='w-full' className='min-h-[14rem] border border-green-200'>
        <p className='text-2xl'>full width section items start</p>
      </Flex>

      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
      <p>asd</p>
    </main>
  )
}
