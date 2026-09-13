import Backdrop from './Backdrop'
import Reveal from './Reveal'

/** Compact hero used at the top of every interior page. */
export default function PageHero({ eyebrow, title, highlight, body, children }) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
      <Backdrop />

      <div className="container-hru">
        {eyebrow && (
          <Reveal from="none">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cyan-glow">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-[0_0_10px_2px_rgba(63,230,245,.8)]" />
              {eyebrow}
            </span>
          </Reveal>
        )}

        <Reveal delay={0.06}>
          <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] sm:text-5xl md:text-6xl">
            {title}{' '}
            {highlight && <span className="text-gradient">{highlight}</span>}
          </h1>
        </Reveal>

        {body && (
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-steel sm:text-lg">
              {body}
            </p>
          </Reveal>
        )}

        {children && <Reveal delay={0.26}><div className="mt-9">{children}</div></Reveal>}
      </div>
    </section>
  )
}
