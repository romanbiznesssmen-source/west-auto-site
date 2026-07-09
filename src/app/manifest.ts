import type { MetadataRoute } from 'next'
import { SITE_NAME } from './seo'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: 'West Auto',
    description:
      'Пригін авто з США під ключ — підбір, аукціони, доставка та розмитнення.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111111',
    theme_color: '#8B0A0A',
    lang: 'uk',
    icons: [
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
