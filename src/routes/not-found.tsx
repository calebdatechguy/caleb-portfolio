import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { usePageTitle } from '@/lib/usePageTitle'

export function NotFoundPage() {
  usePageTitle('Page Not Found')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="label-tag text-blue mb-5">404</p>
        <h1
          className="font-sans text-foreground leading-none mb-6"
          style={{ fontWeight: 900, fontSize: 'clamp(3rem, 10vw, 8rem)', letterSpacing: '-0.03em' }}
        >
          NOT<br />FOUND.
        </h1>
        <p className="text-muted-foreground mb-10 max-w-sm text-sm">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link
          to="/"
          className="group inline-flex items-center gap-2 label-tag text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
