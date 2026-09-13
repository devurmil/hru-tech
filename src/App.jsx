import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'

// Home ships in the main bundle; the rest load on demand.
const Services = lazy(() => import('./pages/Services'))
const Projects = lazy(() => import('./pages/Projects'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-400/20 border-t-cyan-glow" />
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />

      <main id="main" className="flex-1">
        <Suspense fallback={<Loading />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Page><Home /></Page>} />
              <Route path="/services" element={<Page><Services /></Page>} />
              <Route path="/projects" element={<Page><Projects /></Page>} />
              <Route path="/about" element={<Page><About /></Page>} />
              <Route path="/contact" element={<Page><Contact /></Page>} />
              <Route path="*" element={<Page><NotFound /></Page>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
