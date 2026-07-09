'use client'
import { useState, useEffect } from 'react'
import { BRAND, SOCIAL_LINKS } from '../brand'
import Logo from './Logo'
import TelegramIcon from './TelegramIcon'
import { useContactModal } from './ContactModalContext'
import styles from './Navbar.module.css'

export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { openForm, formOpen } = useContactModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = (menuOpen || formOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, formOpen])

  const onHero = transparent && !scrolled

  return (
    <>
      <nav className={`${styles.nav} ${onHero ? styles.onHero : styles.scrolled}`}>
        <a href="/" className={styles.brand} aria-label={BRAND.name}>
          <Logo className={styles.brandLogo} aria-hidden="true" />
          <span className={styles.brandText}>West Auto</span>
        </a>

        <div className={styles.center}>
          <a href="/#proces">Покупка</a>
          <a href="/#avto">Автомобілі</a>
          <a href="/#faq">Питання</a>
          <a href="/kontakty">Контакти</a>
        </div>

        <div className={styles.right}>
          <a
            href={SOCIAL_LINKS.telegram}
            className={styles.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <TelegramIcon size={40} />
          </a>
          <button type="button" className={styles.cta} onClick={openForm}>
            Безкоштовна консультація
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 12 L12 2 M5 2 H12 V9"/>
            </svg>
          </button>
        </div>

        <div className={styles.mobileActions}>
          <a
            href={SOCIAL_LINKS.telegram}
            className={styles.telegramMobile}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <TelegramIcon size={36} />
          </a>
          <button
            type="button"
            className={styles.formBtn}
            onClick={openForm}
            aria-label="Відкрити форму заявки"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2 14 L14 2 M6 2 H14 V10"/>
            </svg>
          </button>
          <button className={styles.hamburger} onClick={() => setMenuOpen(true)} aria-label="Відкрити меню">
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      <div className={`${styles.drawer} ${menuOpen ? styles.open : ''}`} role="dialog" aria-modal="true">
        <div className={styles.drawerTop}>
          <a href="/" className={styles.drawerBrand} onClick={() => setMenuOpen(false)} aria-label={BRAND.name}>
            <Logo className={styles.brandLogo} aria-hidden="true" />
            <span className={styles.brandText}>West Auto</span>
          </a>
          <button className={styles.drawerClose} onClick={() => setMenuOpen(false)} aria-label="Закрити">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4 L20 20 M20 4 L4 20"/>
            </svg>
          </button>
        </div>
        <nav className={styles.drawerNav} aria-label="Мобільна навігація">
          <a href="/#proces" onClick={() => setMenuOpen(false)}>Покупка</a>
          <a href="/#avto" onClick={() => setMenuOpen(false)}>Автомобілі</a>
          <a href="/#faq" onClick={() => setMenuOpen(false)}>Питання</a>
          <a href="/kontakty" onClick={() => setMenuOpen(false)}>Контакти</a>
        </nav>
        <button
          type="button"
          className={styles.drawerCta}
          onClick={() => { setMenuOpen(false); openForm() }}
        >
          Безкоштовна консультація
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 12 L12 2 M5 2 H12 V9"/>
          </svg>
        </button>
      </div>
    </>
  )
}
