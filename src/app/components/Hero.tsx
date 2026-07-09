'use client'
import Image from 'next/image'
import { BRAND } from '../brand'
import { phoneTel } from '../seo'
import { useContactModal } from './ContactModalContext'
import styles from './Hero.module.css'

export default function Hero() {
  const { openForm } = useContactModal()

  return (
    <section className={styles.hero} aria-label="Головний банер">
      <div className={styles.bg} aria-hidden="true">
        <Image
          src={BRAND.heroDesktop}
          alt="Пригін автомобілів з США — West Auto Shipping"
          fill
          priority
          sizes="100vw"
          className={`${styles.bgImage} ${styles.bgDesktop}`}
        />
        <Image
          src={BRAND.heroMobile}
          alt="Доставка авто з Америки в Україну — West Auto Shipping"
          fill
          priority
          sizes="100vw"
          className={`${styles.bgImage} ${styles.bgMobile}`}
        />
      </div>
      <div className={styles.overlay} />

      <div className={styles.body}>
        <div className={styles.copy}>
          <h1 className={styles.headline}>
            Твоє авто<br />з <em>Америки</em>
          </h1>
          <p className={styles.subheadline}>
            Підбір, купівля та доставка під ключ — з гарантією прозорої ціни
          </p>
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.contact}>
            <a className={styles.phone} href={`tel:${phoneTel(BRAND.phone)}`}>{BRAND.phone}</a>
            <address className={styles.address}>
              {BRAND.address}<br />{BRAND.city}
            </address>
          </div>

          <button type="button" className={styles.card} onClick={openForm}>
            <div className={styles.cardText}>
              <p className={styles.cardLabel}>Безкоштовна консультація</p>
              <p className={styles.cardTitle}>Заявка на підбір</p>
              <p className={styles.cardSub}>Отримайте розрахунок вартості<br />авто з доставкою та розмитненням</p>
            </div>
            <div className={styles.cardArrow}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 14 L14 2 M6 2 H14 V10" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
