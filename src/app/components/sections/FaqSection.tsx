'use client'
import { useState } from 'react'
import { FAQ_ITEMS } from '../../data/homeSections'
import { useContactModal } from '../ContactModalContext'
import { SectionHeading } from './SectionHeading'
import styles from './sections.module.css'

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const { openForm } = useContactModal()

  return (
    <section id="faq" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.faqLayout}>
          <div className={styles.faqIntro}>
            <SectionHeading
              title={<>Часті <em>запитання</em></>}
              lead="Відповіді на основні питання про підбір, доставку та розмитнення авто з США."
            />
            <div className={styles.faqHelp}>
              <p className={styles.faqHelpLabel}>Не знайшли відповідь?</p>
              <p className={styles.faqHelpText}>
                Напишіть нам — розрахуємо вартість і відповімо на всі питання безкоштовно.
              </p>
              <button type="button" className={styles.faqHelpBtn} onClick={openForm}>
                Задати питання
                <span className={styles.faqHelpBtnIcon} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12 L12 2 M5 2 H12 V9" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          <div className={styles.faqList}>
            {FAQ_ITEMS.map(({ question, answer }, index) => {
              const isOpen = openIndex === index
              const number = String(index + 1).padStart(2, '0')

              return (
                <div
                  key={question}
                  className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}
                >
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.faqNumber}>{number}</span>
                    <span className={styles.faqQuestionText}>{question}</span>
                    <span className={styles.faqIcon} aria-hidden="true">
                      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 1.5 L6 6.5 L11 1.5" />
                      </svg>
                    </span>
                  </button>
                  <div className={styles.faqAnswer}>
                    <div className={styles.faqAnswerInner}>
                      <p>{answer}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
