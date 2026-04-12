import { useRef, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Play } from 'lucide-react'
import { useSanityQuery } from '@/lib/useSanity'
import { getCoverImageUrl } from '@/lib/sanity'
import { FEATURED_PROJECTS_QUERY } from '@/lib/queries'
import type { SanityProjectCard } from '@/lib/sanity.types'
import { featuredProjects as staticFeatured } from '@/data/portfolio'
import type { Project } from '@/data/portfolio'

export function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const { data: sanityFeatured, loading: featuredLoading } = useSanityQuery<SanityProjectCard[]>(FEATURED_PROJECTS_QUERY)

  const projects: Project[] = useMemo(() => {
    if (!featuredLoading && sanityFeatured !== null) {
      return sanityFeatured.map((p) => ({
        slug: p.slug,
        title: p.title,
        category: p.category?.slug as Project['category'],
        categoryLabel: p.category?.title ?? '',
        coverImage: getCoverImageUrl(p.coverImage, 1400),
        videoUrl: p.videoUrl,
        description: '',
        client: p.client,
        location: p.location,
        projectDate: p.projectDate ?? '',
        servicesUsed: [],
        featured: true,
      }))
    }
    if (featuredLoading) return []
    return staticFeatured // only if fetch errored
  }, [sanityFeatured, featuredLoading])

  return (
    <section className="py-28 md:py-36 px-6 md:px-10 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header row */}
        <div ref={ref} className="flex items-end justify-between mb-16 md:mb-20 border-b border-border pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="label-tag text-blue mb-4">Selected Work</p>
            <h2
              className="font-sans leading-none text-foreground"
              style={{ fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.025em' }}
            >
              FEATURED<br />PROJECTS
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <Link
              to="/portfolio"
              className="group flex items-center gap-2 text-[0.7rem] font-700 tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
              style={{ fontWeight: 700 }}
            >
              View All
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {projects.slice(0, 5).map((project, i) => {
            // Layout: first card is large (spans 7 cols), second spans 5, then 4+4+4
            const colSpanMap: Record<number, string> = {
              0: 'md:col-span-7 md:row-span-2',
              1: 'md:col-span-5',
              2: 'md:col-span-5',
              3: 'md:col-span-4',
              4: 'md:col-span-8',
            }
            const heightMap: Record<number, string> = {
              0: 'h-72 md:h-auto md:min-h-[520px]',
              1: 'h-64 md:h-60',
              2: 'h-64 md:h-60',
              3: 'h-64 md:h-56',
              4: 'h-64 md:h-56',
            }

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
                className={colSpanMap[i] || 'md:col-span-4'}
              >
                <Link
                  to={`/portfolio/${project.slug}` as string}
                  className={`group relative overflow-hidden bg-muted block w-full ${heightMap[i] || 'h-64'}`}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-500" />

                  {/* Blue accent line on hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue group-hover:w-full transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                    <div className="translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 mb-2">
                      <span className="label-tag text-blue block mb-1.5">{project.categoryLabel}</span>
                    </div>
                    <h3
                      className="font-sans text-white leading-tight transition-all duration-400"
                      style={{ fontWeight: 700, fontSize: i === 0 ? '1.4rem' : '1rem', letterSpacing: '-0.01em' }}
                    >
                      {project.title}
                    </h3>
                    {project.location && (
                      <p className="mt-1 text-white/50 text-xs font-500 tracking-wide">{project.location}</p>
                    )}
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5">
                      <span className="label-tag text-white/70">View Project</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/70" />
                    </div>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="label-tag px-2.5 py-1 bg-background/70 backdrop-blur-sm text-foreground/80">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Video play indicator */}
                  {project.videoUrl && (
                    <div className="absolute top-4 right-4 w-9 h-9 bg-blue/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue transition-colors">
                      <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile view all */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            to="/portfolio"
            className="flex items-center gap-2 text-[0.7rem] font-700 tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            style={{ fontWeight: 700 }}
          >
            View All Work <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
