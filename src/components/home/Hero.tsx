import { useRef, useEffect, useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { useSanityQuery } from '@/lib/useSanity'
import { getCoverImageUrl } from '@/lib/sanity'
import type { SanityImage } from '@/lib/sanity.types'

// Desktop: 1280px, auto quality — looks crisp on large screens
const HERO_VIDEO_DESKTOP = 'https://res.cloudinary.com/dc7kinqks/video/upload/f_auto,q_auto,w_1280/v1775610126/bgvideoforwebsite_eqeeye'
// Mobile: 720px, lower quality — roughly 3-4× smaller file, still beautiful on phone screens
const HERO_VIDEO_MOBILE = 'https://res.cloudinary.com/dc7kinqks/video/upload/f_auto,q_auto:low,w_720/v1775610126/bgvideoforwebsite_eqeeye'

// Pull the cover + gallery from the Out-West Trip project for mobile hero backgrounds
const HERO_COVERS_QUERY = `*[_type == "project" && slug.current == "out-west-trip-2024"][0]{
  "coverImage": coverImage{ asset, hotspot, crop, externalUrl },
  "gallery": gallery[]{ asset, hotspot, crop, externalUrl }
}`

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  const { data: outWest } = useSanityQuery<{ coverImage: SanityImage; gallery?: SanityImage[] }>(HERO_COVERS_QUERY)

  // Pool = cover + all gallery images from Out-West Trip; pick one randomly on mount
  // Used as the video poster so there's zero blank-screen flash while the video buffers
  const posterUrl = useMemo(() => {
    if (!outWest) return undefined
    const pool: SanityImage[] = [
      outWest.coverImage,
      ...(outWest.gallery ?? []),
    ].filter(Boolean)
    if (pool.length === 0) return undefined
    const pick = pool[Math.floor(Math.random() * pool.length)]
    return getCoverImageUrl(pick, 1080)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outWest])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.playsInline = true
    v.play().catch(() => {
      // autoplay blocked — poster image stays visible as fallback
    })
  }, [posterUrl])

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden grain">
      {/* Background — video + fallback image */}
      <div className="absolute inset-0">
        {/* Video plays on all devices.
            poster = random Out-West Trip image → shows instantly while video buffers.
            Mobile gets a 720p/low-quality stream (~3-4× smaller than desktop). */}
        <video
          ref={videoRef}
          src={isDesktop ? HERO_VIDEO_DESKTOP : HERO_VIDEO_MOBILE}
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.38)' }}
        />
        {/* Deep navy gradient overlay */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, rgba(8,12,30,0.5) 0%, rgba(8,12,30,0.15) 40%, rgba(8,12,30,0.85) 100%)'
          }}
        />
        {/* Blue tint strip at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: 'linear-gradient(to top, rgba(30,60,180,0.18), transparent)'
          }}
        />
      </div>

      {/* Content — bottom-anchored editorial layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24">

        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center gap-4 mb-8 md:mb-10"
        >
          <span className="w-8 h-px bg-blue" />
          <span className="label-tag text-blue">Georgia, USA · Caleb Elliott</span>
        </motion.div>

        {/* Main headline — massive, bold */}
        <div className="overflow-hidden mb-0">
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <span
              className="font-sans leading-none text-white block"
              style={{
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 11vw, 10rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              CALEB
            </span>
          </motion.div>
        </div>

        {/* "CREATIVE" — SVG outline text (clean stroke, no counter-bleed) */}
        <div className="overflow-hidden mb-10 md:mb-14">
          <motion.div
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
          >
            <svg
              viewBox="0 0 1000 120"
              className="w-full overflow-visible"
              style={{ height: 'clamp(3.2rem, 10.5vw, 9.6rem)' }}
              aria-label="CREATIVE"
            >
              <text
                x="0"
                y="100%"
                dominantBaseline="auto"
                fontFamily="'Montserrat', sans-serif"
                fontWeight="900"
                fontSize="120"
                letterSpacing="-2"
                fill="rgba(255,255,255,0.30)"
                stroke="none"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                CREATIVE
              </text>
            </svg>
          </motion.div>
        </div>

        {/* Bottom row — descriptor + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8"
        >
          <div>
            <p className="font-sans text-sm font-400 text-white/60 leading-relaxed max-w-xs">
              Filmmaker. Photographer.<br />Digital Creative.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/portfolio"
              className="group flex items-center gap-3 px-7 py-3.5 bg-blue text-white text-[0.65rem] font-800 tracking-[0.25em] uppercase hover:bg-blue-bright transition-colors duration-300"
              style={{ fontWeight: 800 }}
            >
              View My Work
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Side label — desktop only */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4"
      >
        <div className="h-24 w-px bg-border" />
        <span
          className="label-tag text-muted-foreground"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', letterSpacing: '0.3em' }}
        >
          Scroll to explore
        </span>
        <div className="h-8 w-px bg-blue/50" />
      </motion.div>
    </section>
  )
}
