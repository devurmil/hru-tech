import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, body, align = 'left', className = '' }) {
  const centered = align === 'center'

  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <Reveal from="none">
          <span className={`mb-4 inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-500/10 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-cyan-glow`}>
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-[0_0_10px_2px_rgba(63,230,245,.8)]" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.06}>
        <h2 className="text-3xl font-bold leading-[1.15] sm:text-4xl md:text-[2.75rem]">
          {title}
        </h2>
      </Reveal>

      {body && (
        <Reveal delay={0.14}>
          <p className={`mt-5 text-base leading-relaxed text-steel sm:text-lg ${centered ? 'mx-auto' : ''}`}>
            {body}
          </p>
        </Reveal>
      )}
    </div>
  )
}
