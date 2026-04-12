import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const services = [
  {
    num: '01',
    label: 'Film & Video',
    description: 'Wedding films, brand campaigns, and event coverage that move people.',
    to: '/services#film',
  },
  {
    num: '02',
    label: 'Photography',
    description: 'Wedding, brand, and lifestyle photography with a cinematic eye.',
    to: '/services#photo',
  },
  {
    num: '03',
    label: 'Web & Digital',
    description: 'Websites and digital experiences built under Lyko Digital.',
    to: '/services#web',
  },
  {
    num: '04',
    label: 'Brand & Design',
    description: 'Logos, identities, and marketing materials that make brands unforgettable.',
    to: '/services#brand',
  },
]

export function ServicesTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 md:py-36 px-6 md:px-10 bg-card">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left — heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <p className="label-tag text-blue mb-6">What I Do</p>
            <h2
              className="font-sans leading-none text-foreground mb-8"
              style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.025em' }}
            >
              SERVICES
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-10 max-w-xs">
              Every project is approached with the same intent — to make work that outlasts the moment it was made.
            </p>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-blue text-blue text-[0.65rem] font-800 tracking-[0.2em] uppercase hover:bg-blue hover:text-white transition-all duration-300"
              style={{ fontWeight: 800 }}
            >
              All Services
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Right — numbered service list */}
          <div className="lg:col-span-8">
            {services.map((service, i) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              >
                <Link
                  to={service.to as string}
                  className="group flex items-center gap-6 py-7 border-b border-border hover:border-blue/40 transition-colors duration-300"
                >
                  {/* Number */}
                  <span
                    className="font-sans text-xs text-muted-foreground/40 group-hover:text-blue/60 transition-colors tabular-nums flex-shrink-0 w-8"
                    style={{ fontWeight: 700, letterSpacing: '0.05em' }}
                  >
                    {service.num}
                  </span>

                  {/* Label */}
                  <span
                    className="font-sans text-xl md:text-2xl text-foreground group-hover:text-blue transition-colors duration-300 flex-1"
                    style={{ fontWeight: 700, letterSpacing: '-0.015em' }}
                  >
                    {service.label}
                  </span>

                  {/* Description — appears on hover */}
                  <span className="hidden md:block text-xs text-muted-foreground max-w-[220px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-right leading-relaxed">
                    {service.description}
                  </span>

                  {/* Arrow */}
                  <ArrowUpRight
                    className="w-5 h-5 text-muted-foreground/30 group-hover:text-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
