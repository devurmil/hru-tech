import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Code2, BrainCircuit, Smartphone, CloudCog,
  Sparkles, CheckCircle2, Quote,
} from 'lucide-react'
import Backdrop from '../components/Backdrop'
import Button from '../components/Button'
import Counter from '../components/Counter'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import CTABand from '../components/CTABand'
import { company, services, stats, process, projects, industries } from '../data/site'

const icons = { Code2, BrainCircuit, Smartphone, CloudCog }

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ServicesPreview />
      <Process />
      <FeaturedWork />
      <Industries />
      <Testimonial />
      <CTABand />
    </>
  )
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <Backdrop />

      <div className="container-hru grid items-center gap-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal from="none">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-cyan-glow">
              <Sparkles size={13} />
              Software · AI · Mobile · Cloud
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-7 text-[2.6rem] font-extrabold leading-[1.05] sm:text-6xl lg:text-[4.1rem]">
              We build software
              <br />
              with <span className="text-gradient">intelligence in</span>
              <br />
              <span className="text-gradient">every line</span>
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-steel sm:text-lg">
              {company.name} is an engineering partner for companies that have outgrown
              off-the-shelf tools. We design, build and run the systems your business
              actually depends on — and we hand them over so your team can own them.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" size="lg">
                Start a project
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button to="/projects" variant="ghost" size="lg">
                See our work
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.38}>
            <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3">
              {['Fixed-price phases', 'Code you own outright', 'Reply within 1 business day'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-steel">
                  <CheckCircle2 size={15} className="text-cyan-glow" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto hidden aspect-square w-full max-w-md place-items-center lg:grid"
    >
      {/* concentric rotating rings */}
      {[
        { size: '100%', dur: 26, dir: 1, dash: '3 12', opacity: 0.5 },
        { size: '78%', dur: 19, dir: -1, dash: '1 9', opacity: 0.6 },
        { size: '56%', dur: 14, dir: 1, dash: '5 14', opacity: 0.45 },
      ].map((ring, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full border border-dashed"
          style={{
            width: ring.size,
            height: ring.size,
            borderColor: 'rgba(63,230,245,.35)',
            opacity: ring.opacity,
            borderStyle: 'dashed',
          }}
          animate={{ rotate: 360 * ring.dir }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: 'linear' }}
        />
      ))}

      <div
        className="glow-orb animate-pulse-glow"
        style={{
          width: '80%', height: '80%',
          background: 'radial-gradient(circle, rgba(29,128,255,.45), transparent 68%)',
        }}
      />

      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <img
          src="/hru-logo.jpeg"
          alt="HRU Technologies emblem"
          width="288"
          height="288"
          className="h-72 w-72 rounded-[2rem] object-cover shadow-[0_30px_90px_-20px_rgba(29,128,255,.6)] ring-1 ring-cyan-glow/25"
        />
      </motion.div>

      {/* orbiting chips */}
      {[
        { label: 'React', pos: 'top-4 -left-4', delay: 0 },
        { label: 'Python', pos: 'bottom-10 -left-8', delay: 0.6 },
        { label: 'AWS', pos: 'top-16 -right-6', delay: 1.2 },
        { label: 'Kubernetes', pos: 'bottom-4 -right-2', delay: 1.8 },
      ].map((chip) => (
        <motion.span
          key={chip.label}
          className={`glass absolute ${chip.pos} rounded-full px-3.5 py-1.5 text-xs font-medium text-steel-light`}
          animate={{ y: [0, -9, 0] }}
          transition={{ duration: 5, delay: chip.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {chip.label}
        </motion.span>
      ))}
    </motion.div>
  )
}

/* ----------------------------------------------------------------- stats */

function Stats() {
  return (
    <section className="relative border-y border-brand-400/10 bg-ink-950/60">
      <div className="container-hru">
        <RevealGroup className="grid grid-cols-2 divide-brand-400/10 md:grid-cols-4 md:divide-x">
          {stats.map((stat) => (
            <RevealItem key={stat.label} className="px-2 py-10 text-center md:py-12">
              <div className="font-display text-4xl font-extrabold text-gradient md:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-steel/70 sm:text-sm sm:tracking-[0.1em]">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- services */

function ServicesPreview() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-hru">
        <SectionHeading
          eyebrow="What we do"
          title="Four practices, one engineering team"
          body="Most of our work spans more than one of these. Having them under one roof is what keeps a project from stalling at the handover between them."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service) => {
            const Icon = icons[service.icon]
            return (
              <RevealItem key={service.slug}>
                <Link
                  to={`/services#${service.slug}`}
                  className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-glow/35 md:p-9"
                >
                  <span className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/10 blur-3xl transition-all duration-700 group-hover:bg-cyan-glow/20" />

                  <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-brand-400/25 bg-brand-500/12 text-cyan-glow transition-all duration-500 group-hover:scale-110 group-hover:border-cyan-glow/50">
                    <Icon size={22} />
                  </span>

                  <h3 className="relative mt-6 text-xl font-semibold">{service.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-steel">{service.blurb}</p>

                  <span className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-glow">
                    Explore this service
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- process */

function Process() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-hru">
        <SectionHeading
          align="center"
          eyebrow="How we work"
          title="A process with no black boxes"
          body="You always know what is being built, why, and what it will cost before it starts."
        />

        <div className="relative mt-16">
          {/* connecting line on desktop */}
          <div className="absolute left-0 right-0 top-[2.15rem] hidden h-px bg-gradient-to-r from-transparent via-brand-500/35 to-transparent lg:block" />

          <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.13}>
            {process.map((item) => (
              <RevealItem key={item.step} className="relative text-center lg:text-left">
                <div className="mx-auto grid h-[4.3rem] w-[4.3rem] place-items-center rounded-2xl border border-brand-400/25 bg-ink-900 font-display text-lg font-bold text-cyan-glow shadow-[0_0_30px_-6px_rgba(63,230,245,.4)] lg:mx-0">
                  {item.step}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-steel">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- featured work */

function FeaturedWork() {
  const featured = projects.slice(0, 3)

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-hru">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Problems we have solved lately"
            body="A few projects that show the range — and the numbers they moved."
          />
          <Reveal delay={0.2}>
            <Button to="/projects" variant="ghost" className="shrink-0">
              All projects
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
          {featured.map((project) => (
            <RevealItem key={project.slug}>
              <Link
                to="/projects"
                className={`group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-glow/35`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                <div className="relative flex items-center gap-2 text-xs text-steel/70">
                  <span className="rounded-full border border-brand-400/25 px-2.5 py-1 font-medium text-cyan-glow">
                    {project.client}
                  </span>
                  <span>{project.year}</span>
                </div>

                <h3 className="relative mt-5 text-lg font-semibold">{project.title}</h3>
                <p className="relative mt-3 flex-1 text-sm leading-relaxed text-steel">{project.summary}</p>

                <div className="relative mt-6 border-t border-brand-400/12 pt-5">
                  <div className="font-display text-2xl font-bold text-gradient">
                    {project.outcome[0].metric}
                  </div>
                  <p className="mt-1 text-xs text-steel/70">{project.outcome[0].label}</p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ industries */

function Industries() {
  const row = [...industries, ...industries]

  return (
    <section className="relative overflow-hidden border-y border-brand-400/10 py-14">
      <Reveal from="none">
        <p className="container-hru mb-9 text-center text-xs uppercase tracking-[0.24em] text-steel/50">
          Industries we build for
        </p>
      </Reveal>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-900 to-transparent" />

        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {row.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="glass whitespace-nowrap rounded-full px-6 py-3 font-display text-sm font-medium text-steel-light"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- testimonial */

function Testimonial() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-hru">
        <Reveal>
          <figure className="glass relative mx-auto max-w-3xl overflow-hidden rounded-3xl p-9 text-center md:p-14">
            <Quote size={40} className="mx-auto text-brand-500/40" />
            <blockquote className="mt-7 font-display text-xl font-medium leading-relaxed text-white md:text-2xl">
              “They told us in the first week that half of what we had specified was not
              worth building. That conversation saved us a quarter, and the half they did
              build has run without incident since.”
            </blockquote>
            <figcaption className="mt-8 text-sm text-steel">
              <span className="font-semibold text-cyan-glow">Operations Director</span>
              <span className="mx-2 text-steel/40">·</span>
              Logistics client, 400-vehicle fleet
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
