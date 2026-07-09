'use client'
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import ContactModal from './ContactModal'

type ContactModalContextValue = {
  openForm: () => void
  closeForm: () => void
  formOpen: boolean
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null)

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = useState(false)

  const openForm = useCallback(() => setFormOpen(true), [])
  const closeForm = useCallback(() => setFormOpen(false), [])

  useEffect(() => {
    if (!formOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [formOpen])

  return (
    <ContactModalContext.Provider value={{ openForm, closeForm, formOpen }}>
      {children}
      <ContactModal open={formOpen} onClose={closeForm} />
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext)
  if (!ctx) throw new Error('useContactModal must be used within ContactModalProvider')
  return ctx
}
