import { useEffect } from 'react'
import { Outlet, useLocation } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'

export function Root() {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const location = useLocation()
  const isStudio = location.pathname.startsWith('/studio')

  // Studio gets the raw Outlet — no Nav, no Footer, no page transition
  if (isStudio) {
    return <Outlet />
  }

  return (
    <div className="min-h-svh flex flex-col">
      <Nav />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
