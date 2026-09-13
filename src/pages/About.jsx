import {
  Compass, ShieldCheck, Layers, MessageSquareCode, ArrowRight, Users,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal, { RevealGroup, RevealItem } from '../components/Reveal'
import Counter from '../components/Counter'
import Button from '../components/Button'
import CTABand from '../components/CTABand'
import { company, values, team, timeline, stats } from '../data/site'

const icons = { Compass, ShieldCheck, Layers, MessageSquareCode }

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="An engineering team, not"
        highlight="a resourcing desk"
        body={`${company.name} has been building software since ${company.founded}. We are twenty-six people who would rather deliver one system properly than staff five projects thinly.`}
      >
        <Button to="/contact" size="lg">
          Meet the team
          <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </PageHero>

      <Story />
      <Values />
      <Timeline />
      <Team />
      <CTABand
        title="Work with people who will tell you the truth."
        body="Including when the truth is that you should not build the thing you came to us for."
      />
    </>
  )
}

/* ----------------------------------------------------------------- story */

function Story() {
  return (
    <section className="relative border-t border-brand-400/10 py-20 md:py-28">
      <div className="container-hru grid items-center gap-14 lg:grid-cols-2">
        <Reveal from="right">
          <div className="space-y-5 text-base leading-relaxed text-steel sm:text-lg">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
              Why we started
            </h2>
            <p>
              We kept meeting the same company: one that had paid for a system, received a
              demo that looked right, and then found it could not be changed, could not be
              scaled, and could not be maintained by anyone but the people who wrote it.
            </p>
            <p>
              {company.name} was founded in {company.founded} on a simple correction to that —
              build the thing properly, document it honestly, and hand it over completely.
              We are measured by whether the system still works a year after we stop touching it.
            </p>
            <p className="border-l-2 border-cyan-glow/50 pl-5 font-display text-lg text-white">
              “{company.tagline}” is not a slogan about AI. It is about the decisions that go
              into every function, migration and deploy we ship.
            </p>
          </div>
        </Reveal>

        <Reveal from="left" delay={0.12}>
          <div className="relative">
            <div
              className="glow-orb animate-pulse-glow"
              style={{
                width: 380, height: 380, top: '-3rem', right: '-3rem',
                background: 'radial-gradient(circle, rgba(29,128,255,.38), transparent 70%)',
              }}
            />

            <div className="relative grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`glass rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1 ${
                    i % 2 === 1 ? 'mt-8' : ''
                  }`}
                >
                  <div className="font-display text-3xl font-extrabold text-gradient">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="mt-2 text-xs leading-snug text-steel/75">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- values */

function Values() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-hru">
        <SectionHeading
          align="center"
          eyebrow="How we operate"
          title="Four things we do not compromise on"
          body="These are not aspirations on a wall. They are the reasons clients come back."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {values.map((value) => {
            const Icon = icons[value.icon]
            return (
              <RevealItem key={value.title}>
                <div className="glass group relative h-full overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-glow/35">
                  <span className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-500/10 blur-2xl transition-all duration-700 group-hover:bg-cyan-glow/20" />

                  <span className="relative grid h-12 w-12 place-items-center rounded-xl border border-brand-400/25 bg-brand-500/12 text-cyan-glow transition-transform duration-500 group-hover:scale-110">
                    <Icon size={22} />
                  </span>

                  <h3 className="relative mt-6 text-lg font-semibold">{value.title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-steel">{value.body}</p>
                </div>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- timeline */

function Timeline() {
  return (
    <section className="relative border-t border-brand-400/10 py-20 md:py-28">
      <div className="container-hru">
        <SectionHeading
          eyebrow="Our story"
          title="Six years, one direction"
        />

        <div className="relative mt-14 pl-8 md:pl-0">
          {/* vertical rail */}
          <div className="absolute bottom-0 left-[0.3rem] top-2 w-px bg-gradient-to-b from-cyan-glow/50 via-brand-500/30 to-transparent md:left-1/2" />

          <div className="space-y-12">
            {timeline.map((item, i) => {
              const right = i % 2 === 1
              return (
                <Reveal key={item.year} from={right ? 'left' : 'right'} delay={0.05}>
                  <div className={`relative md:flex md:items-center ${right ? 'md:flex-row-reverse' : ''}`}>
                    <span className="absolute -left-8 top-1.5 h-3 w-3 rounded-full bg-cyan-glow shadow-[0_0_14px_3px_rgba(63,230,245,.6)] md:left-1/2 md:-translate-x-1/2" />

                    <div className={`md:w-1/2 ${right ? 'md:pl-14' : 'md:pr-14 md:text-right'}`}>
                      <span className="font-display text-sm font-bold tracking-[0.18em] text-cyan-glow">
                        {item.year}
                      </span>
                      <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-steel">{item.body}</p>
                    </div>

                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ team */

function Team() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-hru">
        <SectionHeading
          align="center"
          eyebrow="The team"
          title="Twenty-six people, four disciplines"
          body="Small enough that everyone knows your project. Large enough to cover the whole stack."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((group) => (
            <RevealItem key={group.name}>
              <div className="glass h-full rounded-2xl p-7 text-center transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-glow/35">
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-brand-400/25 bg-brand-500/12 text-cyan-glow">
                  <Users size={19} />
                </span>
                <div className="mt-5 font-display text-3xl font-extrabold text-gradient">
                  <Counter value={group.count} />
                </div>
                <h3 className="mt-1 text-base font-semibold">{group.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-steel/75">{group.note}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
