import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X, Target, Wrench, TrendingUp } from 'lucide-react'
import PageHero from '../components/PageHero'
import Reveal from '../components/Reveal'
import Button from '../components/Button'
import CTABand from '../components/CTABand'
import { projects } from '../data/site'

export default function Projects() {
  const sectors = useMemo(
    () => ['All', ...new Set(projects.map((p) => p.client))],
    [],
  )
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)

  const visible = filter === 'All' ? projects : projects.filter((p) => p.client === filter)

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Work we can"
        highlight="point at"
        body="Every project below started as a business problem rather than a feature list. Open one to see what was broken, what we built and what changed."
      />

      <section className="relative pb-20 md:pb-28">
        <div className="container-hru">
          {/* filters */}
          <Reveal from="none">
            <div className="flex flex-wrap gap-2">
              {sectors.map((sector) => {
                const isActive = filter === sector
                return (
                  <button
                    key={sector}
                    type="button"
                    onClick={() => setFilter(sector)}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-steel hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-cyan-glow/35 bg-brand-500/15"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {sector}
                  </button>
                )
              })}
            </div>
          </Reveal>

          {/* grid */}
          <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((project) => (
                <motion.button
                  key={project.slug}
                  layout
                  type="button"
                  onClick={() => setActive(project)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="group glass relative flex flex-col overflow-hidden rounded-2xl p-7 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-cyan-glow/35"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  <div className="relative flex items-center gap-2 text-xs text-steel/70">
                    <span className="rounded-full border border-brand-400/25 px-2.5 py-1 font-medium text-cyan-glow">
                      {project.client}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  <h2 className="relative mt-5 text-lg font-semibold">{project.title}</h2>
                  <p className="relative mt-3 flex-1 text-sm leading-relaxed text-steel">
                    {project.summary}
                  </p>

                  <div className="relative mt-6 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-md border border-brand-400/15 bg-white/[0.03] px-2 py-1 text-[0.68rem] text-steel/80">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span className="rounded-md px-2 py-1 text-[0.68rem] text-steel/50">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>

                  <span className="relative mt-6 inline-flex items-center gap-1.5 border-t border-brand-400/12 pt-5 text-sm font-medium text-cyan-glow">
                    Read the case study
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CaseStudyModal project={active} onClose={() => setActive(null)} />

      <CTABand
        title="Your project could be the next one here."
        body="Tell us the problem and the constraint you are working within. We will tell you honestly whether we are the right team for it."
      />
    </>
  )
}

/* ------------------------------------------------------- case study modal */

function CaseStudyModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink-950/85 p-0 backdrop-blur-md sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} case study`}
        >
          <motion.article
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border-brand-400/25 bg-ink-850 p-7 sm:rounded-3xl md:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-brand-400/20 bg-ink-900 text-steel transition-colors hover:text-cyan-glow"
            >
              <X size={16} />
            </button>

            <div className="flex items-center gap-2 text-xs text-steel/70">
              <span className="rounded-full border border-brand-400/25 px-2.5 py-1 font-medium text-cyan-glow">
                {project.client}
              </span>
              <span>{project.year}</span>
            </div>

            <h2 className="mt-5 pr-10 text-2xl font-bold md:text-3xl">{project.title}</h2>

            <div className="mt-8 space-y-7">
              {[
                { icon: Target, label: 'The problem', body: project.problem },
                { icon: Wrench, label: 'What we built', body: project.solution },
              ].map(({ icon: Icon, label, body }) => (
                <div key={label}>
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-steel/60">
                    <Icon size={14} className="text-brand-400" />
                    {label}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-steel-light">{body}</p>
                </div>
              ))}

              <div>
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-steel/60">
                  <TrendingUp size={14} className="text-brand-400" />
                  The outcome
                </h3>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {project.outcome.map((o) => (
                    <div key={o.label} className="rounded-xl border border-brand-400/15 bg-white/[0.03] p-4">
                      <div className="font-display text-xl font-bold text-gradient">{o.metric}</div>
                      <p className="mt-1 text-xs leading-snug text-steel/80">{o.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-steel/60">Stack</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-md border border-brand-400/15 bg-white/[0.03] px-2.5 py-1 text-xs text-steel-light">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-9 border-t border-brand-400/12 pt-6">
              <Button to="/contact" size="sm">
                Talk about something similar
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
