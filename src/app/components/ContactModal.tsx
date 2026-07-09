'use client'
import { useEffect } from 'react'
import ContactForm from './ContactForm'
import formStyles from './ContactSection.module.css'
import styles from './ContactModal.module.css'

type ContactModalProps = {
  open: boolean
  onClose: () => void
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <div
      className={`${styles.overlay} ${open ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      aria-hidden={!open}
    >
      <button type="button" className={styles.backdrop} onClick={onClose} aria-label="Закрити" tabIndex={open ? 0 : -1} />
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 id="contact-modal-title" className={styles.title}>Безкоштовна консультація</h2>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Закрити">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 4 L20 20 M20 4 L4 20"/>
            </svg>
          </button>
        </div>
        <div className={styles.body}>
          <ContactForm idPrefix="modal" className={formStyles.modalForm} />
        </div>
      </div>
    </div>
  )
}
