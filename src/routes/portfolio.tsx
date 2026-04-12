import { useState, useMemo, useEffect } from 'react'
import { useSearch, useNavigate } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { usePageTitle } from '@/lib/usePageTitle'
import { useSanityQuery } from '@/lib/useSanity'
import { getCoverImageUrl } from '@/lib/sanity'
import { ALL_PROJECTS_QUERY, ALL_CATEGORIES_QUERY } from '@/lib/queries'
import type { SanityProjectCard, SanityCategory } from '@/lib/sanity.types'
import { CategoryFilter } from '@/components/portfolio/CategoryFilter'
import { ProjectCard } from '@/components/portfolio/ProjectCard'
import { projects as staticProjects, categoryLabels, type ProjectCategory } from '@/data/portfolio'
import type { Project } from '@/data/portfolio'

type FilterValue = ProjectCategory | 'all'

// Adapter: map Sanity project to local Project shape
function adaptProject(p: SanityProjectCard): Project {
  return {
    slug: p.slug,
    title: p.title,
    category: (p.category?.slug ?? 'wedding-film') as ProjectCategory,
    categoryLabel: p.category?.title ?? '',
    coverImage: getCoverImageUrl(p.coverImage, 1200),
    videoUrl: p.videoUrl,
    description: '',
    client: p.client,
    location: p.location,
    projectDate: p.projectDate ?? '',
    servicesUsed: [],
    featured: p.featured,
  }
}

export function PortfolioPage() {
  usePageTitle('Portfolio', 'Browse the full body of work — wedding films, photography, commercial video, web design, and brand identity by Caleb Elliott in Georgia, USA.')

  const navigate = useNavigate()
  const searchParams = useSearch({ strict: false }) as { category?: string }
  const urlCategory = (searchParams?.category as FilterValue) || 'all'
  const [active, setActive] = useState<FilterValue>(urlCategory)

  useEffect(() => { setActive(urlCategory) }, [urlCategory])

  const { data: sanityProjects, loading, error } = useSanityQuery<SanityProjectCard[]>(ALL_PROJECTS_QUERY)
  const { data: sanityCategories } = useSanityQuery<SanityCategory[]>(ALL_CATEGORIES_QUERY)

  // Use Sanity data once loaded; only fall back to static if fetch errored
  const allProjects: Project[] = useMemo(() => {
    if (!loading && sanityProjects !== null) return sanityProjects.map(adaptProject)
    if (error) return staticProjects
    return [] // still loading — show skeletons
  }, [sanityProjects, loading, error])

  // Build category labels from Sanity or fall back to static
  const liveCategoryLabels: Record<string, string> = useMemo(() => {
    if (sanityCategories && sanityCategories.length > 0) {
      return Object.fromEntries(sanityCategories.map((c) => [c.slug, c.title]))
    }
    return categoryLabels
  }, [sanityCategories])

  const handleFilter = (cat: FilterValue) => {
    setActive(cat)
    navigate({ to: '/portfolio', search: cat === 'all' ? {} : { category: cat } } as never)
  }

  const filtered = useMemo(() => {
    if (active === 'all') return allProjects
    return allProjects.filter((p) => p.category === active)
  }, [active, allProjects])

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: allProjects.length }
    for (const key of Object.keys(liveCategoryLabels)) {
      c[key] = allProjects.filter((p) => p.category === key).length
    }
    return c
  }, [allProjects, liveCategoryLabels])

  const columns = useMemo(() => {
    const cols: (typeof filtered)[] = [[], [], []]
    filtered.forEach((p, i) => cols[i % 3].push(p))
    return cols
  }, [filtered])

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 border-b border-border pb-10"
        >
          <p className="label-tag text-blue mb-5">Portfolio</p>
          <h1 className="font-sans text-foreground leading-none mb-6"
            style={{ fontWeight: 900, fontSize: 'clamp(2.8rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}>
            THE WORK
          </h1>
          <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
            A full body of work spanning wedding films, photography, commercial video, web design, and brand identity.
          </p>
        </motion.div>

        <div className="mb-12 overflow-x-auto pb-2">
          <CategoryFilter
            active={active}
            onChange={handleFilter}
            counts={counts}
            categoryLabels={liveCategoryLabels}
          />
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-project bg-card animate-pulse" />
            ))}
          </div>
        )}

        {!loading && (
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              <>
                <motion.div key={active + '-masonry'}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:grid lg:grid-cols-3 gap-4 items-start">
                  {columns.map((col, ci) => (
                    <div key={ci} className="flex flex-col gap-4">
                      {col.map((project, i) => (
                        <ProjectCard key={project.slug} project={project} index={ci * 10 + i}
                          variant={i % 3 === 0 ? 'tall' : 'normal'} />
                      ))}
                    </div>
                  ))}
                </motion.div>
                <motion.div key={active + '-tablet'}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden sm:grid lg:hidden sm:grid-cols-2 gap-4">
                  {filtered.map((project, i) => (
                    <ProjectCard key={project.slug} project={project} index={i} variant="normal" />
                  ))}
                </motion.div>
                <motion.div key={active + '-mobile'}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid sm:hidden grid-cols-1 gap-4">
                  {filtered.map((project, i) => (
                    <ProjectCard key={project.slug} project={project} index={i} variant="normal" />
                  ))}
                </motion.div>
              </>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-24 text-muted-foreground">
                <p className="font-sans text-2xl mb-2" style={{ fontWeight: 700 }}>NO PROJECTS FOUND</p>
                <p className="text-sm">Try selecting a different category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
