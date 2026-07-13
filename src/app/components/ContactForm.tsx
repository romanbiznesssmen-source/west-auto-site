'use client'
import { useState } from 'react'
import { SERVICES } from '../brand'
import { formatUaPhone, isCompleteUaPhone } from '../lib/phone'
import { getStoredUtm } from '../lib/utm'
import styles from './ContactSection.module.css'

type FormState = { name: string; phone: string; service: string; comment: string; consent: boolean }
type Status = 'idle' | 'loading' | 'success' | 'error'

type ContactFormProps = {
  idPrefix?: string
  onSuccess?: () => void
  className?: string
}

export default function ContactForm({ idPrefix = '', onSuccess, className }: ContactFormProps) {
  const [form, setForm] = useState<FormState>({ name: '', phone: '', service: '', comment: '', consent: false })
  const [status, setStatus] = useState<Status>('idle')
  const [phoneError, setPhoneError] = useState(false)

  const id = (name: string) => (idPrefix ? `${idPrefix}-${name}` : name)

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
    setForm(f => ({ ...f, [k]: val }))
  }

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatUaPhone(e.target.value)
    setForm(f => ({ ...f, phone: formatted }))
    if (phoneError && isCompleteUaPhone(formatted)) setPhoneError(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.consent) return

    if (!isCompleteUaPhone(form.phone)) {
      setPhoneError(true)
      return
    }

    setStatus('loading')

    try {
      const utm = getStoredUtm()
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          service: form.service,
          comment: form.comment,
          utm,
        }),
      })

      if (!response.ok) {
        setStatus('error')
        return
      }

      setStatus('success')
      onSuccess?.()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'error') {
    return (
      <div className={styles.success}>
        <h3>Не вдалося надіслати</h3>
        <p>Спробуйте ще раз або зателефонуйте нам напряму.</p>
        <button type="button" className={styles.submit} onClick={() => setStatus('idle')}>
          Спробувати знову
        </button>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="var(--primary-red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="24" cy="24" r="20"/>
          <path d="M14 24 L21 31 L34 18"/>
        </svg>
        <h3>Дякуємо!</h3>
        <p>Ми зв&apos;яжемося з вами найближчим часом.</p>
      </div>
    )
  }

  return (
    <form className={`${styles.form} ${className ?? ''}`.trim()} onSubmit={handleSubmit} noValidate>
      <p className={styles.formTitle}>Заявка на підбір</p>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={id('name')}>Ім&apos;я</label>
          <input id={id('name')} type="text" placeholder="Ваше ім&apos;я" value={form.name} onChange={set('name')} required />
        </div>
        <div className={styles.field}>
          <label htmlFor={id('phone')}>Телефон</label>
          <input
            id={id('phone')}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+38 (0__) ___ __ __"
            value={form.phone}
            onChange={onPhoneChange}
            aria-invalid={phoneError}
            required
          />
          {phoneError && (
            <p className={styles.fieldError}>Введіть повний номер у форматі +38 (0XX) XXX XX XX</p>
          )}
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor={id('service')}>Послуга</label>
        <div className={styles.selectWrap}>
          <select id={id('service')} value={form.service} onChange={set('service')}>
            <option value="">Оберіть варіант</option>
            {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <svg className={styles.chevron} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--dark-gray)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 6 L8 11 L13 6"/>
          </svg>
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor={id('comment')}>Коментар</label>
        <textarea id={id('comment')} placeholder="Марка, бюджет, рік..." rows={3} value={form.comment} onChange={set('comment')} />
      </div>
      <label className={styles.consent}>
        <input type="checkbox" checked={form.consent} onChange={set('consent')} required />
        <span>
          Надсилаючи форму, ви погоджуєтесь на{' '}
          <a href="/polityka-konfidentsiynosti" target="_blank" rel="noopener noreferrer">
            обробку персональних даних
          </a>
        </span>
      </label>
      <button type="submit" className={styles.submit} disabled={!form.consent || status === 'loading'}>
        {status === 'loading' ? 'Надсилання…' : 'Надіслати заявку'}
        {status !== 'loading' && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 14 L14 2 M6 2 H14 V10"/>
          </svg>
        )}
      </button>
    </form>
  )
}
