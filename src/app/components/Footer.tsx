import { BRAND, SOCIAL_LINKS } from '../brand'
import { phoneTel } from '../seo'
import TelegramIcon from './TelegramIcon'
import styles from './Footer.module.css'

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

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <nav className={styles.links} aria-label="Навігація в підвалі">
          <a href="/#perevahy">Переваги</a>
          <a href="/#proces">Як проходить покупка</a>
          <a href="/#avto">Автомобілі</a>
          <a href="/#faq">Питання</a>
          <a href="/kontakty">Контакти</a>
        </nav>

        <div className={styles.cols}>
          <div className={styles.col}>
            <h3>Графік роботи</h3>
            <p>{BRAND.hoursWeekdays}</p>
            <p>{BRAND.hoursSunday}</p>
          </div>

          <div className={styles.col}>
            <h3>Контакти</h3>
            <address>
              <a
                href={BRAND.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.addressLink}
              >
                {BRAND.address}<br />{BRAND.city}
              </a>
            </address>
            <p><a href={`tel:${phoneTel(BRAND.phone)}`}>{BRAND.phone}</a></p>
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </div>

          <div className={`${styles.col} ${styles.socialCol}`}>
            <h3>Соціальні мережі</h3>
            <div className={styles.socials} role="list">
              {SOCIALS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  className={styles.socialLink}
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
      </div>

      <div className={styles.wordmark}>
        <p className={styles.brandName} aria-hidden="true">WEST AUTO</p>
        <p className={styles.brandNameMobile} aria-hidden="true">WEST AUTO</p>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} West Auto Shipping. Усі права захищені.</span>
        <a href="/polityka-konfidentsiynosti">Політика конфіденційності</a>
      </div>
    </footer>
  )
}
