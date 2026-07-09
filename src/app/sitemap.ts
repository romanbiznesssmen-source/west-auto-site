import type { MetadataRoute } from 'next'
import { absoluteUrl } from './seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: absoluteUrl('/'),
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: absoluteUrl('/kontakty'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: absoluteUrl('/polityka-konfidentsiynosti'),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
