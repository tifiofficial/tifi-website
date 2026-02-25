import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { ContactForm } from '@/components/ContactForm'

export const metadata = {
  title: 'Contact | TIFI',
  description: 'Booking and contact for TIFI.',
}

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main>
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
