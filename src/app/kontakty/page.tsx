import type { Metadata } from 'next'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import { ContactModalProvider } from '../components/ContactModalContext'
import { SectionHeading } from '../components/sections/SectionHeading'
import TelegramIcon from '../components/TelegramIcon'
import { BRAND, SOCIAL_LINKS } from '../brand'
import { absoluteUrl, phoneTel } from '../seo'
import contactStyles from '../components/ContactSection.module.css'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Контакти',
  description:
    'Звʼяжіться з West Auto Shipping у Рівному: адреса офісу, телефон, email, соціальні мережі та форма заявки на пригін авто з США.',
  alternates: {
    canonical: absoluteUrl('/kontakty'),
  },
  openGraph: {
    title: 'Контакти — West Auto Shipping',
    description:
      'Офіс у Рівному, консультація з пригону авто з США. Телефон, email, Telegram та форма зворотного звʼязку.',
    url: absoluteUrl('/kontakty'),
  },
}

const SOCIALS = [
  {
    label: 'Instagram',
    href: SOCIAL_LINKS.instagram,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Telegram',
    href: SOCIAL_LINKS.telegram,
    icon: <TelegramIcon size={34} variant="outline" />,
  },
  {
    label: 'YouTube',
    href: SOCIAL_LINKS.youtube,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M22.5 7.2a3 3 0 0 0-2.1-2.1C18.8 4.5 12 4.5 12 4.5s-6.8 0-8.4.6A3 3 0 0 0 1.5 7.2 31.5 31.5 0 0 0 1 12a31.5 31.5 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.6.6 8.4.6 8.4.6s6.8 0 8.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 23 12a31.5 31.5 0 0 0-.5-4.8zM9.8 15.5V8.5L15.8 12l-6 3.5z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: SOCIAL_LINKS.tiktok,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19.6 7.4a5.8 5.8 0 0 1-3.4-1.1v7.8a6.3 6.3 0 1 1-5.6-6.2v3.2a2.9 2.9 0 1 0 2 2.8V2h3.6a5.8 5.8 0 0 0 3.4 5.4z" />
      </svg>
    ),
  },
] as const

export default function ContactsPage() {
  return (
    <ContactModalProvider>
      <Navbar />
      <main id="main-content">
        <section className={`${contactStyles.section} ${styles.page}`}>
          <div className={contactStyles.inner}>
            <SectionHeading
              title={<>Звʼяжіться<br /><em>з нами</em></>}
              lead="Залиште заявку або напишіть напряму — відповімо протягом робочого дня та розрахуємо вартість під ключ."
            />

            <div className={contactStyles.panel}>
              <div className={contactStyles.visual}>
                <Image
                  src={BRAND.heroDesktop}
                  alt="West Auto Shipping — офіс у Рівному"
                  fill
                  sizes="(max-width: 900px) 100vw, 48vw"
                  className={contactStyles.img}
                  priority
                />
                <div className={contactStyles.visualOverlay} aria-hidden="true" />
                <div className={`${contactStyles.visualContent} ${styles.visualContent}`}>
                  <p className={contactStyles.visualLabel}>Контакти</p>
                  <address className={styles.visualAddress}>
                    {BRAND.address}
                    <br />
                    {BRAND.city}
                  </address>
                  <div className={styles.visualLinks}>
                    <a href={`tel:${phoneTel(BRAND.phone)}`}>{BRAND.phone}</a>
                    <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
                    <a href={BRAND.mapLink} target="_blank" rel="noopener noreferrer">
                      Відкрити в Google Maps
                    </a>
                  </div>
                  <p className={styles.visualHours}>
                    {BRAND.hoursWeekdays}
                    <br />
                    {BRAND.hoursSunday}
                  </p>
                  <div className={styles.visualSocials} role="list" aria-label="Соціальні мережі">
                    {SOCIALS.map(({ label, href, icon }) => (
                      <a
                        key={label}
                        href={href}
                        className={styles.visualSocialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        role="listitem"
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className={contactStyles.formCard}>
                <ContactForm idPrefix="contacts-page" />
              </div>
            </div>

            <section className={styles.mapSection} aria-labelledby="map-heading">
              <div className={styles.mapHeader}>
                <h2 id="map-heading" className="section-heading">Як нас знайти</h2>
                <p className="section-lead">{BRAND.address}, {BRAND.city}</p>
              </div>
              <div className={styles.mapWrap}>
                <iframe
                  title={`Карта — ${BRAND.name}, ${BRAND.city}`}
                  src={BRAND.mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </ContactModalProvider>
  )
}
