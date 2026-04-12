import { useRef } from 'react'
import { urlFor } from '@/lib/sanity'

const ABOUT_PHOTO = { asset: { _ref: 'image-90573175ef52bb0f0aa18d69cf5edaa56ce66320-1024x1365-jpg' } }
import { Link } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export function AboutSnippet() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-28 md:py-36 px-6 md:px-10 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75 }}
            className="relative order-2 lg:order-1"
          >
            {/* Blue accent block behind image */}
            <div className="absolute -top-4 -left-4 w-1/2 h-1/2 bg-blue-muted z-0" />
            <div className="relative z-10 aspect-[3/4] overflow-hidden">
              <img
                src={urlFor(ABOUT_PHOTO).width(900).quality(80).auto('format').url()}
                alt="Caleb Elliott"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Stat callout */}
            <div className="absolute -bottom-6 -right-0 md:-right-8 z-20 bg-blue px-6 py-5">
              <p className="font-sans text-white/60 text-[0.6rem] font-700 tracking-[0.25em] uppercase mb-1">Based in</p>
              <p className="font-sans text-white text-sm font-800 tracking-wide" style={{ fontWeight: 800 }}>
                Georgia, USA
              </p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="order-1 lg:order-2"
          >
            <p className="label-tag text-blue mb-6">About</p>
            <h2
              className="font-sans leading-none text-foreground mb-8"
              style={{ fontWeight: 800, fontSize: 'clamp(2rem, 4.5vw, 3.8rem)', letterSpacing: '-0.025em' }}
            >
              THE PERSON<br />BEHIND THE<br />LENS
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              What's Up! I'm Caleb — a filmmaker, photographer, and digital creative based in Athens, Georgia. I love making dreams reality, and making your vision come true.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-10 text-sm">
              From wedding films that you will show your kids, to branding campaigns, I like to shake things up from the original.
            </p>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-[0.7rem] font-700 tracking-[0.2em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-blue hover:text-blue transition-all duration-300"
              style={{ fontWeight: 700 }}
            >
              Read More
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
