import { Flex } from '@/components/Layout'
import { About } from '@/features/about'
import { PortfolioListWrapper } from '@/features/portfolio'
import { Separator } from '@/components/ui/separator'

export default function Home() {
  return (
    <Flex as='section' maxWidth='max-w-7xl' className='my-10'>
      <h1 className='mb-4 text-3xl'>Home</h1>
      <About />
      <Separator className="my-8" />
      <PortfolioListWrapper visibleCount={4} />
    </Flex>
  )
}
