import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, Clock, ShieldCheck,
} from 'lucide-react'
import Backdrop from '../components/Backdrop'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import { company, services } from '../data/site'

const budgets = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'Not sure yet',
]

const empty = {
  name: '', email: '', phone: '', company: '',
  service: '', budget: '', message: '', website: '', // `website` is the honeypot
}

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [serverError, setServerError] = useState('')

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      next.email = 'Please enter a valid email address.'
    }
    if (form.message.trim().length < 10) {
      next.message = 'Please tell us a little more about your project.'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    if (!validate()) return

    setStatus('sending')
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok && data.ok) {
        setStatus('success')
        setForm(empty)
        return
      }

      if (data.errors) setErrors(data.errors)
      setServerError(data.error || 'Something went wrong. Please try again.')
      setStatus('error')
    } catch {
      setServerError(
        'We could not reach the server. Please check your connection or email us directly.',
      )
      setStatus('error')
    }
  }

  return (
    <>
      <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
        <Backdrop />

        <div className="container-hru">
          <div className="max-w-3xl">
            <Reveal from="none">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cyan-glow">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-[0_0_10px_2px_rgba(63,230,245,.8)]" />
                Contact
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="text-4xl font-extrabold leading-[1.08] sm:text-5xl md:text-6xl">
                Tell us what you&rsquo;re{' '}
                <span className="text-gradient">trying to build</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
                A real engineer reads every message that comes through this form. Send us
                the problem, the constraint and the deadline, and we&rsquo;ll come back with
                an honest view within one business day.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.35fr]">
            <ContactAside />
            <FormCard
              form={form}
              errors={errors}
              status={status}
              serverError={serverError}
              update={update}
              onSubmit={onSubmit}
              onReset={() => setStatus('idle')}
            />
          </div>
        </div>
      </section>
    </>
  )
}

/* ----------------------------------------------------------------- aside */

function ContactAside() {
  const items = [
    { icon: Mail, label: 'Email us', value: company.email, href: `mailto:${company.email}` },
    { icon: Phone, label: 'Call us', value: company.phone, href: `tel:${company.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Find us', value: company.address },
  ]

  return (
    <RevealGroup className="space-y-4">
      {items.map(({ icon: Icon, label, value, href }) => {
        const inner = (
          <div className="glass flex items-start gap-4 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-glow/35">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-brand-400/25 bg-brand-500/12 text-cyan-glow">
              <Icon size={19} />
            </span>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.18em] text-steel/55">{label}</p>
              <p className="mt-1.5 break-words text-sm font-medium text-white">{value}</p>
            </div>
          </div>
        )

        return (
          <RevealItem key={label}>
            {href ? <a href={href} className="block">{inner}</a> : inner}
          </RevealItem>
        )
      })}

      <RevealItem>
        <div className="glass rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white">What happens next</h2>
          <ul className="mt-5 space-y-4">
            {[
              { icon: Clock, text: 'We reply within one business day — no automated brush-off.' },
              { icon: ShieldCheck, text: 'Your details stay with us. We never share or sell them.' },
              { icon: CheckCircle2, text: 'A 30-minute call to work out whether we are a fit, free either way.' },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3 text-sm leading-relaxed text-steel">
                <Icon size={15} className="mt-0.5 shrink-0 text-cyan-glow" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </RevealItem>
    </RevealGroup>
  )
}

/* ------------------------------------------------------------------ form */

function FormCard({ form, errors, status, serverError, update, onSubmit, onReset }) {
  const sending = status === 'sending'

  return (
    <Reveal from="left" delay={0.1}>
      <div className="glass relative overflow-hidden rounded-3xl p-7 md:p-10">
        <div
          className="glow-orb"
          style={{
            width: 360, height: 360, top: '-8rem', right: '-8rem',
            background: 'radial-gradient(circle, rgba(29,128,255,.3), transparent 70%)',
          }}
        />

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative grid min-h-[28rem] place-items-center text-center"
            >
              <div>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
                  className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-cyan-glow/40 bg-cyan-glow/10 text-cyan-glow shadow-[0_0_40px_-6px_rgba(63,230,245,.7)]"
                >
                  <CheckCircle2 size={30} />
                </motion.span>

                <h2 className="mt-7 text-2xl font-bold">Message sent</h2>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-steel">
                  Thanks for reaching out. We&rsquo;ve sent a confirmation to your inbox and
                  someone from the team will reply within one business day.
                </p>

                <button
                  type="button"
                  onClick={onReset}
                  className="mt-8 rounded-full border border-brand-400/25 px-5 py-2.5 text-sm text-steel-light transition-colors hover:border-cyan-glow/45 hover:text-white"
                >
                  Send another message
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              noValidate
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" required error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Jane Mehta"
                    autoComplete="name"
                    className={inputCls(errors.name)}
                  />
                </Field>

                <Field label="Email address" required error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="jane@company.com"
                    autoComplete="email"
                    className={inputCls(errors.email)}
                  />
                </Field>

                <Field label="Phone" hint="optional">
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={update('phone')}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    className={inputCls()}
                  />
                </Field>

                <Field label="Company" hint="optional">
                  <input
                    type="text"
                    value={form.company}
                    onChange={update('company')}
                    placeholder="Acme Ltd."
                    autoComplete="organization"
                    className={inputCls()}
                  />
                </Field>

                <Field label="What do you need?" hint="optional">
                  <select value={form.service} onChange={update('service')} className={inputCls()}>
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Something else">Something else</option>
                  </select>
                </Field>

                <Field label="Budget range" hint="optional">
                  <select value={form.budget} onChange={update('budget')} className={inputCls()}>
                    <option value="">Select a range</option>
                    {budgets.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Your message" required error={errors.message}>
                <textarea
                  rows={6}
                  value={form.message}
                  onChange={update('message')}
                  placeholder="What are you trying to solve? Any deadline or constraint we should know about?"
                  className={`${inputCls(errors.message)} resize-y`}
                />
              </Field>

              {/* Honeypot — hidden from people, irresistible to bots. */}
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={update('website')}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />

              <AnimatePresence>
                {status === 'error' && serverError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      {serverError}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 px-7 py-3.5 text-sm font-medium text-white shadow-[0_8px_30px_-10px_rgba(29,128,255,.85)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_44px_-10px_rgba(63,230,245,.7)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>

                <p className="text-xs leading-relaxed text-steel/60">
                  By sending this you agree we may contact you about your enquiry.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

/* --------------------------------------------------------------- helpers */

function inputCls(error) {
  return `w-full rounded-xl border bg-ink-950/60 px-4 py-3 text-sm text-white placeholder:text-steel/35 transition-all duration-300 outline-none ${
    error
      ? 'border-red-500/50 focus:border-red-400'
      : 'border-brand-400/18 focus:border-cyan-glow/55 focus:shadow-[0_0_0_3px_rgba(63,230,245,.12)]'
  }`
}

function Field({ label, hint, required, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-steel/70">
        {label}
        {required && <span className="text-cyan-glow">*</span>}
        {hint && <span className="normal-case tracking-normal text-steel/40">({hint})</span>}
      </span>

      {children}

      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 flex items-center gap-1.5 text-xs text-red-300"
          >
            <AlertCircle size={12} />
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  )
}
