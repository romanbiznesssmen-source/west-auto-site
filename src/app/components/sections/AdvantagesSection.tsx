import { ADVANTAGES } from '../../data/homeSections'
import { SectionHeading } from './SectionHeading'
import styles from './sections.module.css'

function AdvantageIcon({ type }: { type: string }) {
  const props = { width: 56, height: 56, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.25, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

  switch (type) {
    case 'payment':
      return (
        <svg {...props}>
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <path d="M2 10h20" />
        </svg>
      )
    case 'search':
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3-3" />
        </svg>
      )
    case 'check':
      return (
        <svg {...props}>
          <path d="M9 12l2 2 4-4" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
    case 'delivery':
      return (
        <svg {...props}>
          <path d="M3 7h11v8H3z" />
          <path d="M14 10h4l3 3v2h-7v-5z" />
          <circle cx="7" cy="17" r="2" fill="currentColor" stroke="none" />
          <circle cx="17" cy="17" r="2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'customs':
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <path d="M12 2l2.5 7.5H22l-6 4.5 2.5 7.5L12 17l-6.5 4.5 2.5-7.5-6-4.5h7.5z" />
        </svg>
      )
  }
}

export default function AdvantagesSection() {
  return (
    <section id="perevahy" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          title={<>Наші <em>переваги</em></>}
          lead="Повний цикл послуг — від підбору до передачі ключів. Прозоро, швидко, з оплатою в Україні."
        />
        <div className={styles.advantagesGrid}>
          {ADVANTAGES.map(({ title, description, icon }) => (
            <article key={title} className={styles.advantageCard}>
              <div className={styles.advantageIcon}>
                <AdvantageIcon type={icon} />
              </div>
              <h3 className={styles.advantageTitle}>{title}</h3>
              <p className={styles.advantageText}>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
