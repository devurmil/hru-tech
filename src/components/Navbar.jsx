import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import Button from './Button'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setOpen(false), [pathname])

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'border-b border-brand-400/12 bg-ink-950/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="container-hru flex h-[4.5rem] items-center justify-between">
          <Logo />

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-steel hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full border border-brand-400/25 bg-brand-500/12"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {link.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Button to="/contact" size="sm">
              Start a project
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-lg border border-brand-400/20 bg-white/[0.03] text-steel-light transition-colors hover:text-cyan-glow md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-xl md:hidden"
          >
            <div className="container-hru flex h-full flex-col pt-28 pb-10">
              <ul className="flex flex-col gap-1">
                {[...links, { to: '/contact', label: 'Contact' }].map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.4 }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `flex items-center justify-between border-b border-brand-400/10 py-5 font-display text-2xl font-semibold transition-colors ${
                          isActive ? 'text-cyan-glow' : 'text-white'
                        }`
                      }
                    >
                      {link.label}
                      <ArrowUpRight size={20} className="text-steel/50" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-auto"
              >
                <Button to="/contact" size="lg" className="w-full">
                  Start a project
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
