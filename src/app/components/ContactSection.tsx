'use client'
import Image from 'next/image'
import { BRAND } from '../brand'
import { phoneTel } from '../seo'
import ContactForm from './ContactForm'
import { SectionHeading } from './sections/SectionHeading'
import styles from './ContactSection.module.css'

export default function ContactSection() {
  return (
    <section id="kontakt" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading
          title={<>Поговорімо<br /><em>про авто</em></>}
          lead="Залиште заявку — розрахуємо повну вартість з доставкою та розмитненням."
        />

        <div className={styles.panel}>
          <div className={styles.visual}>
            <Image
              src={BRAND.heroDesktop}
              alt="West Auto Shipping — пригін авто з США"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              className={styles.img}
            />
            <div className={styles.visualOverlay} aria-hidden="true" />
            <div className={styles.visualContent}>
              <p className={styles.visualText}>
                Підбір · аукціони США · доставка · розмитнення
              </p>
              <div className={styles.visualContacts}>
                <a href={`tel:${phoneTel(BRAND.phone)}`}>{BRAND.phone}</a>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </div>
            </div>
          </div>

          <div className={styles.formCard}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
