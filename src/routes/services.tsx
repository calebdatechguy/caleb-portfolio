import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import { Film, Camera, Monitor, Palette, ArrowUpRight } from 'lucide-react'
import { usePageTitle } from '@/lib/usePageTitle'
import { urlFor } from '@/lib/sanity'

const FILM_COVER = { asset: { _ref: 'image-bcf7c468f50375f8035a6ae15b61fe0da70c0670-1024x539-png' } }
const PHOTO_COVER = { asset: { _ref: 'image-2d0c4c8251127de313cf13a460e45924575f67c1-1024x1535-jpg' } }

const serviceGroups = [
  {
    id: 'film',
    icon: Film,
    title: 'Film & Video Production',
    description: 'Cinematic storytelling for life\'s most important moments and your brand\'s biggest messages.',
    services: ['Wedding Films', 'Commercial & Brand Videos', 'Event Coverage', 'Highlight Reels', 'Sports Hype Videos', 'Short Form Content'],
    coverImage: urlFor(FILM_COVER).width(900).quality(80).auto('format').url(),
  },
  {
    id: 'photo',
    icon: Camera,
    title: 'Photography',
    description: 'Every image is a frame from a larger story — captured with intention and edited for impact.',
    services: ['Wedding Photography', 'Brand & Business Photography', 'Event Photography', 'Sports Photography', 'Brand Content Creation', 'Social Media Content'],
    coverImage: urlFor(PHOTO_COVER).width(900).quality(80).auto('format').url(),
    imagePosition: 'center 20%',
  },
  {
    id: 'web',
    icon: Monitor,
    title: 'Web & Digital',
    description: 'Websites that look as good as your work and perform even better. Custom-built under Lyko Digital.',
    services: ['Website Design & Development', 'Backend Development', 'Landing Pages', 'Website Maintenance', 'Social Media Management'],
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
  },
  {
    id: 'brand',
    icon: Palette,
    title: 'Brand & Design',
    description: 'Build a brand identity that communicates who you are before you say a word.',
    services: ['Logo & Brand Identity', 'Graphic Design', 'Marketing Materials', 'Business Branding'],
    coverImage: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=900&q=80',
  },
]

export function ServicesPage() {
  usePageTitle('Services', 'Film & video production, photography, web design, and brand identity services by Caleb Elliott — Caleb Creative & Lyko Digital, Georgia.')
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="label-tag text-blue mb-5"
        >
          Services
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-sans text-foreground leading-none mb-8"
          style={{ fontWeight: 900, fontSize: 'clamp(2.8rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
        >
          WHAT I<br />OFFER
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-muted-foreground text-base max-w-md leading-relaxed"
        >
          Every project is custom based on client needs. Here's where we can start.
        </motion.p>
      </div>

      {/* Service groups */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-4">
        {serviceGroups.map((group, i) => (
          <ServiceGroupCard key={group.id} group={group} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-20 max-w-7xl mx-auto px-6 md:px-10">
        <div className="p-12 md:p-16 bg-blue-muted border border-blue/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p
              className="font-sans text-foreground mb-2"
              style={{ fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}
            >
              NOT SURE WHAT YOU NEED?
            </p>
            <p className="text-muted-foreground text-sm">Let's talk through your project together.</p>
          </div>
          <Link
            to="/contact"
            className="group flex items-center gap-3 px-8 py-4 bg-blue text-white text-[0.65rem] font-800 tracking-[0.25em] uppercase hover:bg-blue-bright transition-colors duration-300 flex-shrink-0"
            style={{ fontWeight: 800 }}
          >
            Get in Touch
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}

function ServiceGroupCard({
  group,
  index,
}: {
  group: typeof serviceGroups[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = group.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      id={group.id}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.04 }}
      className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden border border-border hover:border-blue/30 transition-colors duration-500"
    >
      {/* Image */}
      <div className={`relative h-64 lg:h-auto lg:min-h-[320px] ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <img
          src={group.coverImage}
          alt={group.title}
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.45) saturate(0.7)', objectPosition: group.imagePosition ?? 'center' }}
          loading="lazy"
        />
        {/* Blue tint */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(15,30,100,0.5) 0%, transparent 100%)' }}
        />
        {/* Icon */}
        <div className="absolute top-6 left-6 w-11 h-11 bg-blue flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className={`p-10 md:p-12 bg-card flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <h2
          className="font-sans text-foreground mb-4 leading-tight"
          style={{ fontWeight: 800, fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', letterSpacing: '-0.02em' }}
        >
          {group.title.toUpperCase()}
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-8 text-sm">{group.description}</p>
        <ul className="space-y-2.5 mb-8">
          {group.services.map((s) => (
            <li key={s} className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-blue flex-shrink-0" />
              {s}
            </li>
          ))}
        </ul>
        <Link
          to={`/contact?service=${group.id}` as string}
          className="group inline-flex items-center gap-2 text-[0.65rem] font-700 tracking-[0.2em] uppercase text-blue hover:text-blue-bright transition-colors self-start"
          style={{ fontWeight: 700 }}
        >
          Inquire About This
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  )
}
