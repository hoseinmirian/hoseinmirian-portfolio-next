import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next boilerplate hossein',
    short_name: 'Next boilerplate hossein',
    description: 'Next boilerplate hossein ready to use',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ]
  }
}
