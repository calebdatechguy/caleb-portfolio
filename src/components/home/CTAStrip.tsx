import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export function CTAStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative py-32 md:py-44 px-6 md:px-10 overflow-hidden grain">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=2000&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.25) saturate(0.5)' }}
          loading="lazy"
        />
        {/* Strong navy overlay */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(8,12,40,0.92) 0%, rgba(15,30,80,0.80) 100%)'
          }}
        />
        {/* Blue glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(30,80,255,1) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
        />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, rgba(30,80,255,0.8) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
        />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="label-tag text-blue mb-6"
            >
              Ready to begin
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="font-sans text-white leading-none"
              style={{
                fontWeight: 900,
                fontSize: 'clamp(2.8rem, 8vw, 7rem)',
                letterSpacing: '-0.03em',
              }}
            >
              LET'S CREATE<br />SOMETHING.
            </motion.h2>
          </div>

          {/* Right — CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col gap-4"
          >
            <Link
              to="/contact"
              className="group flex items-center gap-3 px-8 py-4 bg-blue text-white text-[0.65rem] font-800 tracking-[0.25em] uppercase hover:bg-blue-bright transition-all duration-300"
              style={{ fontWeight: 800 }}
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <p className="text-white/30 text-xs tracking-wider text-center">No commitment! Just a conversation.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
