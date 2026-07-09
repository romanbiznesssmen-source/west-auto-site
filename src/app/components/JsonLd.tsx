import { BRAND } from '../brand'
import { FAQ_ITEMS } from '../data/homeSections'
import {
  DEFAULT_DESCRIPTION,
  OG_IMAGE,
  SAME_AS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  phoneTel,
} from '../seo'

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export default function JsonLd() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(BRAND.logo),
    image: absoluteUrl(OG_IMAGE),
    description: DEFAULT_DESCRIPTION,
    telephone: phoneTel(BRAND.phone),
    email: BRAND.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND.address,
      addressLocality: 'Рівне',
      addressCountry: 'UA',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Ukraine',
    },
    sameAs: [...SAME_AS],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'uk-UA',
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }

  const localBusinessNote = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: DEFAULT_DESCRIPTION,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'uk-UA',
  }

  return (
    <>
      <JsonLdScript data={organization} />
      <JsonLdScript data={website} />
      <JsonLdScript data={faqPage} />
      <JsonLdScript data={localBusinessNote} />
    </>
  )
}
