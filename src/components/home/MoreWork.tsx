import { useRef, useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import { useSanityQuery } from '@/lib/useSanity'
import { getCoverImageUrl } from '@/lib/sanity'
import { ALL_PROJECTS_QUERY } from '@/lib/queries'
import type { SanityProjectCard } from '@/lib/sanity.types'
import { projects as staticProjects } from '@/data/portfolio'
import type { Project } from '@/data/portfolio'

const FILTERS = [
  { slug: 'all', label: 'All' },
  { slug: 'wedding-film', label: 'Wedding Film' },
  { slug: 'wedding-photo', label: 'Photography' },
  { slug: 'commercial-video', label: 'Commercial' },
  { slug: 'brand-photo', label: 'Brand' },
  { slug: 'web-design', label: 'Web' },
  { slug: 'graphic-design', label: 'Design' },
]

export function MoreWork() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' })
  const [activeFilter, setActiveFilter] = useState('all')

  const { data: sanityProjects, loading } = useSanityQuery<SanityProjectCard[]>(ALL_PROJECTS_QUERY)

  const allProjects: Project[] = useMemo(() => {
    if (!loading && sanityProjects !== null) {
      return sanityProjects.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category?.slug as Project['category'],
        categoryLabel: p.category?.title ?? '',
        coverImage: getCoverImageUrl(p.coverImage, 900),
        videoUrl: p.videoUrl,
        description: '',
        client: p.client,
        location: p.location,
        projectDate: p.projectDate ?? '',
        servicesUsed: [],
        featured: p.featured ?? false,
      }))
    }
    if (loading) return []
    return staticProjects
  }, [sanityProjects, loading])

  const filtered = activeFilter === 'all'
    ? allProjects
    : allProjects.filter((p) => p.category === activeFilter)

  // Hide filter tabs that have no matching projects
  const availableFilters = FILTERS.filter(
    (f) => f.slug === 'all' || allProjects.some((p) => p.category === f.slug)
  )

  return (
    <section className="py-20 md:py-28 px-6 md:px-10 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="label-tag text-blue mb-3">All Work</p>
            <h2
              className="font-sans leading-none text-foreground"
              style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              BROWSE THE<br />PORTFOLIO
            </h2>
          </motion.div>

          {/* Category filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-2"
          >
            {availableFilters.map((f) => (
              <button
                key={f.slug}
                onClick={() => setActiveFilter(f.slug)}
                className={`px-4 py-1.5 text-[0.62rem] font-700 tracking-[0.18em] uppercase transition-all duration-200 ${
                  activeFilter === f.slug
                    ? 'bg-blue text-white'
                    : 'border border-border text-muted-foreground hover:border-blue hover:text-blue'
                }`}
                style={{ fontWeight: 700 }}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Link
                  to={`/portfolio/${project.slug}` as string}
                  className="group relative block overflow-hidden bg-muted h-64"
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/55 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue group-hover:w-full transition-all duration-500" />

                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-1.5">
                      <span className="label-tag text-blue">{project.categoryLabel}</span>
                    </div>
                    <h3
                      className="font-sans text-white leading-tight"
                      style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.01em' }}
                    >
                      {project.title}
                    </h3>
                    {project.location && (
                      <p className="mt-1 text-white/50 text-xs">{project.location}</p>
                    )}
                    <div className="mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
                      <span className="label-tag text-white/70">View Project</span>
                      <ArrowUpRight className="w-3 h-3 text-white/70" />
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="label-tag px-2 py-0.5 bg-background/70 backdrop-blur-sm text-foreground/70 text-[0.55rem]">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {project.videoUrl && (
                    <div className="absolute top-3 right-3 w-7 h-7 bg-blue/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue transition-colors">
                      <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                    </div>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer row */}
        <div className="mt-10 flex items-center justify-between">
          <p className="label-tag text-muted-foreground/40">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          </p>
          <Link
            to="/portfolio"
            className="group flex items-center gap-2 text-[0.7rem] font-700 tracking-[0.2em] uppercase text-foreground border-b border-foreground/20 pb-1 hover:border-blue hover:text-blue transition-all duration-300"
            style={{ fontWeight: 700 }}
          >
            Full Portfolio
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
