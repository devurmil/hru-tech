import { ArrowRight } from 'lucide-react'
import Button from './Button'
import Reveal from './Reveal'
import { company } from '../data/site'

export default function CTABand({
  title = 'Have something you want built?',
  body = 'Tell us what you are trying to solve. We will come back within one business day with an honest view on scope, cost and timeline.',
}) {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-hru">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-7 py-14 text-center md:px-16 md:py-20">
            <div
              className="glow-orb animate-pulse-glow"
              style={{
                width: 520, height: 300, top: '-6rem', left: '50%', transform: 'translateX(-50%)',
                background: 'radial-gradient(circle, rgba(29,128,255,.45), transparent 70%)',
              }}
            />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight sm:text-4xl md:text-[2.6rem]">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-steel">
                {body}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button to="/contact" size="lg">
                  Start a project
                  <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                <Button as="a" href={`mailto:${company.email}`} variant="ghost" size="lg">
                  {company.email}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
