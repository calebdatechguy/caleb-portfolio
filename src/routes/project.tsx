import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight as ArrowRightIcon, ArrowUpRight, Play, ExternalLink, MapPin, Calendar, Tag, X } from 'lucide-react'
import { useSanityQuery } from '@/lib/useSanity'
import { getCoverImageUrl, getVideoEmbedUrl, blockToText } from '@/lib/sanity'
import { PROJECT_BY_SLUG_QUERY, RELATED_PROJECTS_QUERY } from '@/lib/queries'
import type { SanityProject, SanityProjectCard, SanityImage } from '@/lib/sanity.types'
import { projects as staticProjects } from '@/data/portfolio'
import { usePageTitle } from '@/lib/usePageTitle'

function imgUrl(image: SanityImage, width = 1200) {
  return getCoverImageUrl(image, width)
}

function VideoEmbed({ url, cover }: { url: string; cover: string }) {
  const [playing, setPlaying] = useState(false)
  const embedUrl = getVideoEmbedUrl(url)

  if (playing && embedUrl) {
    return (
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        <iframe src={`${embedUrl}?autoplay=1&rel=0`} className="w-full h-full"
          allow="autoplay; fullscreen" allowFullScreen title="Project video" />
      </div>
    )
  }

  return (
    <button onClick={() => setPlaying(true)}
      className="group relative w-full aspect-video bg-black overflow-hidden block" aria-label="Play video">
      <img src={cover} alt="Video thumbnail"
        className="w-full h-full object-cover opacity-70 group-hover:opacity-60 transition-opacity duration-300" />
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, rgba(15,30,80,0.4) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-blue/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue transition-all duration-300">
          <Play className="w-7 h-7 text-white fill-white ml-1" />
        </div>
      </div>
      <div className="absolute bottom-5 left-5">
        <span className="label-tag text-white/60">Click to Play</span>
      </div>
    </button>
  )
}

function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIndex)
  const touchStartX = useRef<number | null>(null)

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length)
  const next = () => setCurrent((c) => (c + 1) % images.length)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/96 flex items-center justify-center"
      onClick={onClose} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <button className="absolute top-5 right-5 w-10 h-10 bg-blue/80 flex items-center justify-center text-white hover:bg-blue transition-colors"
        onClick={onClose} aria-label="Close">
        <X className="w-4 h-4" />
      </button>
      {images.length > 1 && (
        <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 flex items-center justify-center text-white hover:bg-blue transition-colors"
          onClick={(e) => { e.stopPropagation(); prev() }}>
          <ArrowRightIcon className="w-5 h-5 rotate-180" />
        </button>
      )}
      {images.length > 1 && (
        <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 flex items-center justify-center text-white hover:bg-blue transition-colors"
          onClick={(e) => { e.stopPropagation(); next() }}>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      )}
      <motion.img key={current} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }} src={images[current]} alt={`Gallery image ${current + 1}`}
        className="max-w-[85vw] max-h-[85vh] object-contain select-none"
        onClick={(e) => e.stopPropagation()} draggable={false} />
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
        <div className="flex gap-1.5">
          {images.map((_, i) => (
            <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
              className={`transition-all duration-200 ${i === current ? 'w-5 h-1.5 bg-blue' : 'w-1.5 h-1.5 bg-white/30'}`} />
          ))}
        </div>
        <span className="label-tag text-white/40">{current + 1} / {images.length}</span>
      </div>
    </motion.div>
  )
}

export function ProjectPage() {
  const { slug } = useParams({ strict: false }) as { slug: string }
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const { data: sanityProject, loading } = useSanityQuery<SanityProject>(
    PROJECT_BY_SLUG_QUERY, { slug }
  )

  // Fallback to static data while Sanity loads or if project not in Sanity yet
  const staticProject = staticProjects.find((p) => p.slug === slug)

  // Determine which data source to use
  const hasSanity = !loading && sanityProject != null
  const title = hasSanity ? sanityProject.title : staticProject?.title
  const description = hasSanity
    ? blockToText(sanityProject.description)
    : staticProject?.description ?? ''
  const categoryLabel = hasSanity ? sanityProject.category?.title : staticProject?.categoryLabel
  const client = hasSanity ? sanityProject.client : staticProject?.client
  const location = hasSanity ? sanityProject.location : staticProject?.location
  const projectDate = hasSanity ? sanityProject.projectDate : staticProject?.projectDate
  const servicesUsed = hasSanity ? (sanityProject.servicesUsed ?? []) : (staticProject?.servicesUsed ?? [])
  const liveUrl = hasSanity ? sanityProject.liveUrl : staticProject?.liveUrl
  const videoUrl = hasSanity ? sanityProject.videoUrl : staticProject?.videoUrl
  const additionalVideos: string[] = hasSanity ? (sanityProject.additionalVideos ?? []) : []
  const coverImageUrl = hasSanity
    ? imgUrl(sanityProject.coverImage, 1800)
    : staticProject?.coverImage ?? ''
  const galleryUrls: string[] = hasSanity && sanityProject.gallery
    ? sanityProject.gallery.map((img) => imgUrl(img, 1600))
    : staticProject?.gallery ?? []
  const categorySlug = hasSanity ? sanityProject.category?.slug : staticProject?.category

  // Related projects
  const { data: sanityRelated } = useSanityQuery<SanityProjectCard[]>(
    RELATED_PROJECTS_QUERY,
    { category: categorySlug ?? '', slug }
  )
  const staticRelated = staticProjects
    .filter((p) => p.category === staticProject?.category && p.slug !== slug)
    .slice(0, 3)

  usePageTitle(
    title,
    title && categoryLabel
      ? `${categoryLabel} by Caleb Elliott${location ? ` — ${location}` : ''}. ${description.slice(0, 120)}...`
      : undefined
  )

  // JSON-LD structured data
  useEffect(() => {
    if (!title) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'project-jsonld'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
      creator: { '@type': 'Person', name: 'Caleb Elliott', url: 'https://calebcreative.com' },
      dateCreated: projectDate,
      description,
      url: `https://calebcreative.com/portfolio/${slug}`,
      image: coverImageUrl,
      ...(client ? { contributor: { '@type': 'Organization', name: client } } : {}),
      ...(location ? { locationCreated: { '@type': 'Place', name: location } } : {}),
    })
    document.head.appendChild(script)
    return () => { document.getElementById('project-jsonld')?.remove() }
  }, [title, description, projectDate, slug, coverImageUrl, client, location])

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="w-32 h-4 bg-card animate-pulse" />
          <div className="w-full aspect-video bg-card animate-pulse" />
          <div className="w-2/3 h-8 bg-card animate-pulse" />
          <div className="w-full h-4 bg-card animate-pulse" />
          <div className="w-5/6 h-4 bg-card animate-pulse" />
        </div>
      </div>
    )
  }

  if (!hasSanity && !staticProject) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
        <p className="font-sans text-foreground" style={{ fontWeight: 800, fontSize: '2rem', letterSpacing: '-0.02em' }}>
          PROJECT NOT FOUND
        </p>
        <Link to="/portfolio" className="flex items-center gap-2 label-tag text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Portfolio
        </Link>
      </div>
    )
  }

  // Use Sanity related projects; only fall back to static if query hasn't returned anything
  const relatedToShow = (sanityRelated && sanityRelated.length > 0) ? sanityRelated : (hasSanity ? [] : staticRelated)

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-10">
        <Link to="/portfolio"
          className="group inline-flex items-center gap-2 label-tag text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero media */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-14">
        {videoUrl ? (
          <VideoEmbed url={videoUrl} cover={coverImageUrl} />
        ) : (
          <div className="relative w-full aspect-video overflow-hidden bg-muted">
            <img src={coverImageUrl} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        {additionalVideos.length > 0 && (
          <div className={`mt-3 grid gap-3 ${additionalVideos.length === 1 ? 'grid-cols-1 max-w-xl' : 'grid-cols-1 sm:grid-cols-2'}`}>
            {additionalVideos.map((url, i) => {
              const embedUrl = getVideoEmbedUrl(url)
              if (!embedUrl) return null
              return (
                <div key={i} className="relative w-full aspect-video bg-black overflow-hidden">
                  <iframe src={embedUrl} className="w-full h-full"
                    allow="autoplay; fullscreen" allowFullScreen title={`Additional video ${i + 1}`} />
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">

          {/* Main */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {categoryLabel && <span className="label-tag text-blue block mb-4">{categoryLabel}</span>}
              <h1 className="font-sans text-foreground leading-none mb-8"
                style={{ fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', letterSpacing: '-0.025em' }}>
                {title}
              </h1>
              <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
            </motion.div>

            {/* Gallery */}
            {galleryUrls.length > 0 && (
              <div className="mt-14">
                <p className="label-tag text-muted-foreground/50 mb-6">Gallery</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                  {galleryUrls.map((img, i) => (
                    <button key={i} onClick={() => setLightboxIndex(i)}
                      className="group relative aspect-square overflow-hidden bg-muted block">
                      <img src={img} alt={`Gallery ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-blue/20 transition-colors duration-300" />
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue group-hover:w-full transition-all duration-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-0 border border-border">
              {client && (
                <div className="px-6 py-5 border-b border-border">
                  <p className="label-tag text-muted-foreground/50 mb-1.5">Client</p>
                  <p className="text-sm font-600" style={{ fontWeight: 600 }}>{client}</p>
                </div>
              )}
              {location && (
                <div className="px-6 py-5 border-b border-border">
                  <p className="label-tag text-muted-foreground/50 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-2.5 h-2.5" /> Location
                  </p>
                  <p className="text-sm font-600" style={{ fontWeight: 600 }}>{location}</p>
                </div>
              )}
              {projectDate && (
                <div className="px-6 py-5 border-b border-border">
                  <p className="label-tag text-muted-foreground/50 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-2.5 h-2.5" /> Date
                  </p>
                  <p className="text-sm font-600" style={{ fontWeight: 600 }}>{projectDate}</p>
                </div>
              )}
              {servicesUsed.length > 0 && (
                <div className="px-6 py-5 border-b border-border">
                  <p className="label-tag text-muted-foreground/50 mb-3 flex items-center gap-1.5">
                    <Tag className="w-2.5 h-2.5" /> Services
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {servicesUsed.map((s) => (
                      <span key={s} className="px-2.5 py-1 bg-blue-muted border border-blue/20 text-blue text-[0.6rem] font-700 tracking-wider" style={{ fontWeight: 700 }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {liveUrl && (
                <div className="px-6 py-5 border-b border-border">
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 label-tag text-blue hover:text-blue-bright transition-colors">
                    <ExternalLink className="w-3 h-3" /> View Live Site
                  </a>
                </div>
              )}
              <div className="p-6 bg-blue-muted">
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">Interested in a project like this?</p>
                <Link to="/contact"
                  className="group flex items-center justify-center gap-2 w-full py-3.5 bg-blue text-white text-[0.62rem] font-800 tracking-[0.22em] uppercase hover:bg-blue-bright transition-colors duration-300"
                  style={{ fontWeight: 800 }}>
                  Start a Project Like This
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedToShow.length > 0 && (
          <div className="mt-24 pt-12 border-t border-border">
            <p className="label-tag text-blue mb-4">More Like This</p>
            <h3 className="font-sans text-foreground leading-none mb-12"
              style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.025em' }}>
              RELATED WORK
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedToShow.map((related) => {
                const relSlug = 'slug' in related ? (typeof related.slug === 'string' ? related.slug : related.slug) : ''
                const relTitle = related.title
                const relCover = 'coverImage' in related && related.coverImage && typeof related.coverImage === 'object' && 'asset' in related.coverImage
                  ? imgUrl(related.coverImage as SanityImage, 800)
                  : ('coverImage' in related ? related.coverImage as string : '')
                const relCatLabel = 'category' in related && related.category && typeof related.category === 'object' && 'title' in related.category
                  ? (related.category as { title: string }).title
                  : ('categoryLabel' in related ? related.categoryLabel as string : '')

                return (
                  <Link key={relSlug} to={`/portfolio/${relSlug}` as string}
                    className="group block relative overflow-hidden aspect-project bg-muted">
                    <img src={relCover} alt={relTitle}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/55 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue group-hover:w-full transition-all duration-500" />
                    <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                      {relCatLabel && <span className="label-tag text-blue block mb-1.5">{relCatLabel}</span>}
                      <p className="font-sans text-white leading-tight" style={{ fontWeight: 700, fontSize: '0.95rem', letterSpacing: '-0.01em' }}>
                        {relTitle}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && galleryUrls.length > 0 && (
          <Lightbox images={galleryUrls} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
