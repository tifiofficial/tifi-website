'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/MagneticButton'
import { tifiContent } from '@/content/tifi'

interface FormState {
  name: string
  email: string
  date: string
  message: string
}

const defaultState: FormState = { name: '', email: '', date: '', message: '' }

export function ContactForm() {
  const [form, setForm] = useState<FormState>(defaultState)
  const [submitted, setSubmitted] = useState(false)
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle')

  const errors = useMemo(() => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Name is required.'
    if (!form.email.trim()) next.email = 'Email is required.'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email.'
    if (!form.message.trim()) next.message = 'Message is required.'
    return next
  }, [form])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (Object.keys(errors).length > 0) return
    setSubmitted(true)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(tifiContent.contact.bookingEmail)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 1500)
    } catch {
      setCopyState('idle')
    }
  }

  return (
    <section className="px-5 pb-20 pt-28 md:px-10" aria-labelledby="contact-title">
      <div className="mx-auto max-w-3xl">
        <h1 id="contact-title" className="font-display text-6xl md:text-7xl">
          Booking / Contact
        </h1>
        <p className="mt-4 text-cream/75">For bookings, collaborations, and press, use the form below or copy the booking email directly.</p>

        <div className="mt-8 flex items-center justify-between rounded-sm border border-ice/25 bg-ink-soft p-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-cream/60">Booking Email</p>
            <p className="mt-1 text-ice">{tifiContent.contact.bookingEmail}</p>
          </div>
          <button
            type="button"
            onClick={copyEmail}
            className="rounded-sm border border-ice/35 px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-ice hover:bg-ice/10"
          >
            {copyState === 'copied' ? 'Copied' : 'Copy Email'}
          </button>
        </div>

        <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
          <Field
            label="Name"
            id="name"
            value={form.name}
            error={errors.name}
            onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
          />

          <Field
            label="Email"
            id="email"
            type="email"
            value={form.email}
            error={errors.email}
            onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
          />

          <Field
            label="Event Date"
            id="date"
            type="date"
            value={form.date}
            onChange={(value) => setForm((prev) => ({ ...prev, date: value }))}
          />

          <div>
            <label htmlFor="message" className="text-[11px] uppercase tracking-[0.22em] text-cream/70">
              Message
            </label>
            <textarea
              id="message"
              rows={7}
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              className="mt-2 w-full rounded-sm border border-ice/25 bg-transparent px-3 py-3 outline-none transition focus:border-ice"
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              required
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-300">
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4">
            <MagneticButton type="submit" variant="primary">
              Send Inquiry
            </MagneticButton>
            <p className="text-xs uppercase tracking-[0.18em] text-cream/50">TODO: wire Resend/EmailJS</p>
          </div>
        </form>

        {submitted && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-sm border border-teal/45 bg-teal/10 p-3 text-sm text-cream/85"
          >
            Message captured locally. Connect an API route (Resend/EmailJS) to deliver submissions.
          </motion.p>
        )}
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  value,
  type = 'text',
  onChange,
  error,
}: {
  id: string
  label: string
  value: string
  type?: string
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[11px] uppercase tracking-[0.22em] text-cream/70">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-sm border border-ice/25 bg-transparent px-3 outline-none transition focus:border-ice"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        required={id !== 'date'}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  )
}
