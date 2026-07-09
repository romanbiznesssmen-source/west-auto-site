import { BRAND, SOCIAL_LINKS } from './brand'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? 'https://westautoshipping.ua'

export const SITE_NAME = BRAND.name

export const DEFAULT_TITLE =
  'West Auto Shipping — Пригін авто з США під ключ | Рівне'

export const DEFAULT_DESCRIPTION =
  'West Auto Shipping — підбір, купівля на аукціонах США, доставка та розмитнення авто під ключ. Оплата в Україні, перевірка Carfax, повний супровід. Рівне, Україна.'

export const KEYWORDS = [
  'пригін авто з США',
  'доставка авто з Америки',
  'авто з аукціонів США',
  'розмитнення авто',
  'підбір авто під бюджет',
  'West Auto Shipping',
  'пригін авто Рівне',
  'купівля авто з США',
  'доставка авто в Україну',
  'Carfax перевірка',
] as const

export const OG_IMAGE = '/hero.png'

export function absoluteUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function phoneTel(phone: string) {
  return phone.replace(/[^\d+]/g, '')
}

export const BUSINESS_HOURS = {
  weekdays: 'Пн–Сб: 09:00 – 19:00',
  sunday: 'Неділя — вихідний',
  schema: ['Mo-Sa 09:00-19:00'],
} as const

export const SAME_AS = [
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.telegram,
  SOCIAL_LINKS.youtube,
  SOCIAL_LINKS.tiktok,
] as const
