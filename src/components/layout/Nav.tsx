import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Work', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="group flex items-baseline gap-3" onClick={() => setMobileOpen(false)}>
            <span className="font-sans text-base font-900 tracking-[0.12em] uppercase text-foreground group-hover:text-blue-bright transition-colors duration-300"
              style={{ fontWeight: 900 }}>
              Caleb Creative
            </span>
            <span className="hidden sm:block w-px h-3.5 bg-border self-center" />
            <span className="hidden sm:block font-sans text-[0.6rem] font-600 tracking-[0.28em] uppercase text-muted-foreground">
              Lyko Digital
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to as string}
                className="font-sans text-[0.7rem] font-700 tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
                style={{ fontWeight: 700 }}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-blue group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-4 px-6 py-2.5 bg-blue text-white text-[0.65rem] font-800 tracking-[0.2em] uppercase hover:bg-blue-bright transition-colors duration-200"
              style={{ fontWeight: 800 }}
            >
              Hire Me
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background flex flex-col"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between h-20 px-6">
              <span className="font-sans text-base tracking-[0.12em] uppercase" style={{ fontWeight: 900 }}>
                Caleb Creative
              </span>
              <button onClick={() => setMobileOpen(false)} className="p-2 text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-border" />

            {/* Links */}
            <nav className="flex flex-col px-6 pt-12 gap-1 flex-1">
              {[{ label: 'Home', to: '/' }, ...navLinks].map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.3 }}
                >
                  <Link
                    to={link.to as string}
                    onClick={() => setMobileOpen(false)}
                    className="block py-5 font-sans text-4xl tracking-tight text-foreground hover:text-blue transition-colors border-b border-border/40"
                    style={{ fontWeight: 800 }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-6"
            >
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-4 bg-blue text-white text-xs font-800 tracking-[0.25em] uppercase"
                style={{ fontWeight: 800 }}
              >
                Start a Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
