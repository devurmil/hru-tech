import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { LinkedInIcon, GitHubIcon } from './BrandIcons'
import Logo from './Logo'
import { company, services } from '../data/site'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-400/12 bg-ink-950">
      <div
        className="glow-orb"
        style={{
          width: 620, height: 320, bottom: '-14rem', left: '50%', transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(29,128,255,.30), transparent 70%)',
        }}
      />

      <div className="container-hru relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-steel">
              {company.tagline}. We design, build and run software for teams that need
              engineering they can depend on.
            </p>

            <div className="mt-6 flex gap-2">
              {[
                { href: company.social.linkedin, icon: LinkedInIcon, label: 'LinkedIn' },
                { href: company.social.github, icon: GitHubIcon, label: 'GitHub' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-brand-400/20 bg-white/[0.03] text-steel transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-glow/40 hover:text-cyan-glow"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-steel/60">Navigate</h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-steel transition-colors hover:text-cyan-glow"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-steel/60">Services</h3>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services#${s.slug}`}
                    className="text-sm text-steel transition-colors hover:text-cyan-glow"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-steel/60">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <a href={`mailto:${company.email}`} className="group flex items-start gap-3 text-steel transition-colors hover:text-cyan-glow">
                  <Mail size={16} className="mt-0.5 shrink-0 text-brand-400" />
                  {company.email}
                </a>
              </li>
              <li>
                <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="flex items-start gap-3 text-steel transition-colors hover:text-cyan-glow">
                  <Phone size={16} className="mt-0.5 shrink-0 text-brand-400" />
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3 text-steel">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-400" />
                {company.address}
              </li>
            </ul>

            <Link
              to="/contact"
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white"
            >
              Start a conversation
              <ArrowUpRight size={15} className="text-cyan-glow transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-brand-400/10 pt-8 text-xs text-steel/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className="font-medium tracking-wide text-steel/50">{company.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
