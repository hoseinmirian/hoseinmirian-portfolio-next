import type { MetadataRoute } from 'next'
import { getBaseUrl } from '@/lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getBaseUrl()}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${getBaseUrl()}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.1
    }
  ]
}
