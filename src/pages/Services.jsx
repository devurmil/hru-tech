import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Code2, BrainCircuit, Smartphone, CloudCog, Check, Plus, Minus, ArrowRight,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import Button from '../components/Button'
import CTABand from '../components/CTABand'
import { services, faqs } from '../data/site'

const icons = { Code2, BrainCircuit, Smartphone, CloudCog }

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Engineering that ends in"
        highlight="something that works"
        body="We take on the parts of a build that are hard to hire for — architecture, AI, infrastructure — and leave you with a system your own team can run."
      >
        <Button to="/contact" size="lg">
          Discuss your project
          <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </PageHero>

      <ServiceSections />
      <Engagement />
      <FAQ />
      <CTABand
        title="Not sure which of these you need?"
        body="Most clients arrive with a problem, not a service category. Describe the problem and we will tell you what it actually takes to fix."
      />
    </>
  )
}

/* ------------------------------------------------------- detailed blocks */

function ServiceSections() {
  return (
    <div className="relative">
      {services.map((service, index) => {
        const Icon = icons[service.icon]
        const flipped = index % 2 === 1

        return (
          <section
            key={service.slug}
            id={service.slug}
            className="relative scroll-mt-24 border-t border-brand-400/10 py-16 md:py-24"
          >
            <div className="container-hru grid items-center gap-12 lg:grid-cols-2">
              <div className={flipped ? 'lg:order-2' : ''}>
                <Reveal from={flipped ? 'left' : 'right'}>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-brand-400/25 bg-brand-500/12 text-cyan-glow shadow-[0_0_36px_-8px_rgba(63,230,245,.55)]">
                    <Icon size={26} />
                  </span>

                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-steel/50">
                    {String(index + 1).padStart(2, '0')} — Service
                  </p>

                  <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                    {service.title}
                  </h2>

                  <p className="mt-5 text-base leading-relaxed text-steel sm:text-lg">
                    {service.blurb}
                  </p>
                </Reveal>

                <RevealGroup className="mt-8 space-y-3.5" delay={0.1}>
                  {service.points.map((point) => (
                    <RevealItem key={point} className="flex items-start gap-3">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/15 text-cyan-glow">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="text-sm text-steel-light">{point}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </div>

              <Reveal from={flipped ? 'right' : 'left'} delay={0.12} className={flipped ? 'lg:order-1' : ''}>
                <div className="glass relative overflow-hidden rounded-3xl p-8 md:p-10">
                  <div
                    className="glow-orb"
                    style={{
                      width: 300, height: 300, top: '-6rem', right: '-6rem',
                      background: 'radial-gradient(circle, rgba(29,128,255,.35), transparent 70%)',
                    }}
                  />

                  <h3 className="relative text-xs font-semibold uppercase tracking-[0.22em] text-steel/60">
                    What you receive
                  </h3>

                  <ol className="relative mt-7 space-y-6">
                    {service.deliverables.map((item, i) => (
                      <li key={item} className="flex items-center gap-4">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-brand-400/25 bg-ink-900 font-display text-xs font-bold text-cyan-glow">
                          {i + 1}
                        </span>
                        <span className="text-sm font-medium text-white">{item}</span>
                        <span className="ml-auto h-px flex-1 bg-gradient-to-r from-brand-500/30 to-transparent" />
                      </li>
                    ))}
                  </ol>

                  <div className="relative mt-9 border-t border-brand-400/12 pt-6">
                    <Button to="/contact" variant="ghost" size="sm">
                      Scope this with us
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------ engagement models */

function Engagement() {
  const models = [
    {
      name: 'Project build',
      best: 'Best when you know what you need and want it delivered.',
      points: ['Fixed price per phase', 'Defined scope and milestones', 'Full handover at the end'],
      featured: true,
    },
    {
      name: 'Embedded team',
      best: 'Best when you have engineers already and need capacity.',
      points: ['Our engineers join your standups', 'Monthly rolling commitment', 'Your process, your repo'],
    },
    {
      name: 'Advisory & review',
      best: 'Best when the hard part is the decision, not the typing.',
      points: ['Architecture and code review', 'Security and cost audits', 'Fixed-scope engagement'],
    },
  ]

  return (
    <section className="relative border-t border-brand-400/10 py-20 md:py-28">
      <div className="container-hru">
        <SectionHeading
          align="center"
          eyebrow="Engagement models"
          title="Three ways to work with us"
          body="Whichever you choose, the code and infrastructure are yours from the first commit."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {models.map((model) => (
            <RevealItem key={model.name}>
              <div
                className={`glass relative flex h-full flex-col overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1.5 ${
                  model.featured ? 'border-cyan-glow/35 shadow-[0_0_50px_-18px_rgba(63,230,245,.6)]' : ''
                }`}
              >
                {model.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-brand-500/20 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-cyan-glow">
                    Most common
                  </span>
                )}

                <h3 className="text-xl font-semibold">{model.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{model.best}</p>

                <ul className="mt-7 space-y-3">
                  {model.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-steel-light">
                      <Check size={14} className="mt-1 shrink-0 text-cyan-glow" strokeWidth={3} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- faq */

function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-hru grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeading
          eyebrow="Questions"
          title="The things clients ask first"
          body="If yours is not here, ask it on the contact page — we answer plainly."
        />

        <div className="divide-y divide-brand-400/12 border-y border-brand-400/12">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <Reveal key={faq.q} delay={i * 0.05} from="none">
                <div>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 py-5 text-left"
                  >
                    <span className={`font-display text-base font-medium transition-colors ${isOpen ? 'text-cyan-glow' : 'text-white'}`}>
                      {faq.q}
                    </span>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-brand-400/25 text-cyan-glow">
                      {isOpen ? <Minus size={13} /> : <Plus size={13} />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-10 text-sm leading-relaxed text-steel">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
