import { PortfolioList } from './PortfolioList'

export function PortfolioListWrapper() {
  // - here we would normally fetch data from an API or use context/provider if this is marked as client component
  // - we can assemble different sets of integration feature like sorting, filtering, pagination etc.
  
  const portfolioItems = [
    {
      title: 'Project Alpha',
      type: 'Web Development',
      img: '',
      organization: '',
      location: '',
      role: '',
      description: '',
      website: 'https://example.com',
      source_code: '',
      techs: []
    },
    {
      title: 'Project Beta',
      type: 'Mobile App',
      img: '',
      organization: '',
      location: '',
      role: '',
      description: '',
      website: 'https://example.com',
      source_code: '',
      techs: []
    },
  ]
  
  return <PortfolioList portfolioItems={portfolioItems} />
}
