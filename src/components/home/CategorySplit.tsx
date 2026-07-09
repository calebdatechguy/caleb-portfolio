import { useRef, useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useSanityQuery } from '@/lib/useSanity'
import { getCoverImageUrl } from '@/lib/sanity'
import type { SanityImage } from '@/lib/sanity.types'
import { groupToCategories, type PortfolioGroup } from '@/lib/portfolioGroups'

const COVERS_QUERY = `{
  "photo": *[_type == "project" && category->slug.current in ["wedding-photo","brand-photo"]] | order(publishedAt desc)[0].coverImage{ asset, hotspot, crop, externalUrl },
  "video": *[_type == "project" && category->slug.current in ["wedding-film","commercial-video"]] | order(publishedAt desc)[0].coverImage{ asset, hotspot, crop, externalUrl },
  "other": *[_type == "project" && category->slug.current in ["web-design","graphic-design"]] | order(publishedAt desc)[0].coverImage{ asset, hotspot, crop, externalUrl }
}`

type PanelCovers = Record<PortfolioGroup, SanityImage | null>

interface Panel {
  group: PortfolioGroup
  label: string
  title: string
  tagline: string
  fallback: string
}

const PANELS: Panel[] = [
  {
    group: 'photo',
    label: 'Photography',
    title: 'PHOTO',
    tagline: 'Weddings · Brand · Sports',
    fallback: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80',
  },
  {
    group: 'video',
    label: 'Videography',
    title: 'FILM',
    tagline: 'Cinematic · Commercial · Hype',
    fallback: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&q=80',
  },
  {
    group: 'other',
    label: 'Other Services',
    title: 'WEB & BRAND',
    tagline: 'Design · Development · Identity',
    fallback: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&q=80',
  },
]

export function CategorySplit() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hovered, setHovered] = useState<PortfolioGroup | null>(null)

  const { data } = useSanityQuery<PanelCovers>(COVERS_QUERY)

  const covers = useMemo<Record<PortfolioGroup, string>>(() => {
    const map = {} as Record<PortfolioGroup, string>
    for (const panel of PANELS) {
      const sanityImage = data?.[panel.group] ?? null
      map[panel.group] = sanityImage ? getCoverImageUrl(sanityImage, 1600) : panel.fallback
    }
    return map
  }, [data])

  return (
    <section ref={ref} className="relative w-full h-screen min-h-[600px] overflow-hidden bg-background">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full">
        {PANELS.map((panel, index) => {
          const cats = groupToCategories[panel.group]
          const isHovered = hovered === panel.group
          const dimmed = hovered !== null && !isHovered

          return (
            <motion.div
              key={panel.group}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.12 }}
              className="relative"
              onMouseEnter={() => setHovered(panel.group)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link
                to="/portfolio"
                search={{ group: panel.group } as never}
                className="group block relative w-full h-full min-h-[300px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue"
                aria-label={`View ${panel.label} work — ${cats.length} categories`}
              >
                {/* Background image */}
                <motion.img
                  src={covers[panel.group]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                  animate={{
                    scale: isHovered ? 1.06 : 1,
                    filter: dimmed
                      ? 'brightness(0.28) saturate(0.4)'
                      : isHovered
                      ? 'brightness(0.85) saturate(1.1)'
                      : 'brightness(0.42) saturate(0.75)',
                  }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Gradient wash */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: isHovered ? 0.35 : 0.75 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(8,12,30,0.15) 0%, rgba(8,12,30,0.4) 40%, rgba(8,12,30,0.95) 100%)',
                  }}
                />

                {/* Blue accent that appears on hover */}
                <motion.div
                  className="absolute inset-x-0 bottom-0 h-1 bg-blue origin-left"
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Vertical divider (all but last) */}
                {index < PANELS.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-white/10 z-10" />
                )}

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 md:px-8">
                  <motion.p
                    className="label-tag text-blue mb-6"
                    animate={{ opacity: isHovered ? 1 : 0.75 }}
                    transition={{ duration: 0.35 }}
                  >
                    0{index + 1} / {panel.label}
                  </motion.p>

                  <motion.h3
                    className="font-sans text-white leading-none mb-4"
                    style={{
                      fontWeight: 900,
                      fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                      letterSpacing: '-0.03em',
                    }}
                    animate={{ y: isHovered ? -4 : 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {panel.title}
                  </motion.h3>

                  <p className="text-white/60 text-xs md:text-sm tracking-wide mb-8 max-w-xs">
                    {panel.tagline}
                  </p>

                  <motion.div
                    className="flex items-center gap-2 text-white text-[0.65rem] font-800 tracking-[0.25em] uppercase"
                    animate={{
                      y: isHovered ? 0 : 8,
                      opacity: isHovered ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.4 }}
                    style={{ fontWeight: 800 }}
                  >
                    View Work
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
