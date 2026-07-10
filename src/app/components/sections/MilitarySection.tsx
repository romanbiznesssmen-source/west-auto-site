'use client'
import { useContactModal } from '../ContactModalContext'
import { SectionHeading } from './SectionHeading'
import styles from './sections.module.css'

export default function MilitarySection() {
  const { openForm } = useContactModal()

  return (
    <section id="viyskovym" className={`${styles.section} ${styles.militarySection}`}>
      <div className={styles.inner}>
        <div className={styles.militaryCard}>
          <SectionHeading
            title={<>Окремий підхід для тих, хто <em>служить</em> 🇺🇦</>}
            lead={
              <>
                Ми допомагаємо військовослужбовцям <strong>підібрати автомобіль</strong>, який максимально відповідає
                їхнім потребам, бюджету та поставленим завданням.
              </>
            }
          />
          <p className={styles.militaryText}>
            Менеджер допоможе визначитися з найкращими варіантами, перевірить кожен автомобіль перед покупкою та
            надасть всю необхідну інформацію для прийняття рішення.
          </p>
          <button type="button" className={styles.militaryCta} onClick={openForm}>
            Залишити заявку
            <span className={styles.militaryCtaIcon} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12 L12 2 M5 2 H12 V9" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
