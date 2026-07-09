'use client'
import { useRef, useState, useCallback, useEffect } from 'react'
import { INSTAGRAM_POSTS } from '../../data/homeSections'
import { SOCIAL_LINKS } from '../../brand'
import { useContactModal } from '../ContactModalContext'
import { SectionHeading } from './SectionHeading'
import styles from './sections.module.css'

export default function CarsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const { openForm } = useContactModal()
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateNav = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const { scrollLeft, scrollWidth, clientWidth } = track
    setCanPrev(scrollLeft > 8)
    setCanNext(scrollLeft + clientWidth < scrollWidth - 8)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateNav()
    track.addEventListener('scroll', updateNav, { passive: true })
    window.addEventListener('resize', updateNav)
    return () => {
      track.removeEventListener('scroll', updateNav)
      window.removeEventListener('resize', updateNav)
    }
  }, [updateNav])

  const scroll = (direction: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>(`.${styles.instagramCard}`)
    const gap = 20
    const amount = card ? card.offsetWidth + gap : track.clientWidth * 0.85
    track.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' })
  }

  return (
    <section id="avto" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.carsHeader}>
          <SectionHeading
            title={<>Приклади <em>автомобілів</em></>}
            lead="Реальні варіанти з аукціонів США — підбір під ваш бюджет і побажання."
          />
          <div className={styles.carouselNav}>
            <button
              type="button"
              className={styles.carouselBtn}
              onClick={() => scroll('prev')}
              disabled={!canPrev}
              aria-label="Попередній пост"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M11 3 L5 9 L11 15" />
              </svg>
            </button>
            <button
              type="button"
              className={styles.carouselBtn}
              onClick={() => scroll('next')}
              disabled={!canNext}
              aria-label="Наступний пост"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 3 L13 9 L7 15" />
              </svg>
            </button>
          </div>
        </div>

        <div className={styles.carouselViewport}>
          <div ref={trackRef} className={styles.carouselTrack}>
            {INSTAGRAM_POSTS.map((post) => (
              <article key={post.id} className={styles.instagramCard}>
                <iframe
                  src={`${post.url}embed/`}
                  title={`Instagram — ${post.id}`}
                  className={styles.instagramEmbed}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </article>
            ))}
          </div>
        </div>

        <div className={styles.instagramFooter}>
          <p className={styles.instagramFollow}>
            Більше прикладів — у нашому{' '}
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
              Instagram @west_auto_shipping
            </a>
          </p>
          <button type="button" className={styles.instagramCta} onClick={openForm}>
            Розрахувати ціну під ключ
            <span className={styles.instagramCtaIcon} aria-hidden="true">
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
