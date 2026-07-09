import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HomeSections from './components/HomeSections'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import JsonLd from './components/JsonLd'
import { ContactModalProvider } from './components/ContactModalContext'
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, absoluteUrl } from './seo'

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: absoluteUrl('/'),
  },
}

export default function HomePage() {
  return (
    <ContactModalProvider>
      <JsonLd />
      <Navbar transparent />
      <main id="main-content">
        <Hero />
        <HomeSections />
        <ContactSection />
      </main>
      <Footer />
    </ContactModalProvider>
  )
}
