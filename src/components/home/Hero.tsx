import { useRef, useEffect, useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { useSanityQuery } from '@/lib/useSanity'
import { getCoverImageUrl } from '@/lib/sanity'
import type { SanityImage } from '@/lib/sanity.types'

const HERO_VIDEO_DESKTOP = 'https://res.cloudinary.com/dc7kinqks/video/upload/f_auto,q_auto,w_1280/v1775610126/bgvideoforwebsite_eqeeye'
const HERO_VIDEO_MOBILE = 'https://res.cloudinary.com/dc7kinqks/video/upload/f_auto,q_auto:low,w_720/v1775610126/bgvideoforwebsite_eqeeye'

const HERO_COVERS_QUERY = `*[_type == "project" && slug.current == "out-west-trip-2024"][0]{
  "coverImage": coverImage{ asset, hotspot, crop, externalUrl },
  "gallery": gallery[]{ asset, hotspot, crop, externalUrl }
}`

const TYPEWRITER_TEXT = 'thecalebelliott.com'
const CHAR_INTERVAL_MS = 110  // 15 chars × 110ms ≈ 1.65s total typing
const PAUSE_AFTER_MS = 500    // hold full text before fading

type IntroPhase = 'typing' | 'fading' | 'done'

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [introPhase, setIntroPhase] = useState<IntroPhase>('typing')
  const [typedText, setTypedText] = useState('')

  const { data: outWest } = useSanityQuery<{ coverImage: SanityImage; gallery?: SanityImage[] }>(HERO_COVERS_QUERY)

  const posterUrl = useMemo(() => {
    if (!outWest) return undefined
    const pool: SanityImage[] = [outWest.coverImage, ...(outWest.gallery ?? [])].filter(Boolean)
    if (pool.length === 0) return undefined
    const pick = pool[Math.floor(Math.random() * pool.length)]
    return getCoverImageUrl(pick, 1080)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outWest])

  // Typewriter intro — 300ms delay before first character
  useEffect(() => {
    let charIndex = 0
    const start = setTimeout(() => {
    const ticker = setInterval(() => {
      charIndex++
      setTypedText(TYPEWRITER_TEXT.slice(0, charIndex))
      if (charIndex >= TYPEWRITER_TEXT.length) {
        clearInterval(ticker)
        setTimeout(() => setIntroPhase('fading'), PAUSE_AFTER_MS)
      }
    }, CHAR_INTERVAL_MS)
    }, 300)
    return () => { clearTimeout(start) }
  }, [])

  // Device detection
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Autoplay video
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.playsInline = true
    v.play().catch(() => {})
  }, [posterUrl])

  const heroReady = introPhase === 'done'

  return (
    <>
      {/* ── Intro overlay ── covers nav + everything until typing finishes */}
      <AnimatePresence onExitComplete={() => setIntroPhase('done')}>
        {introPhase !== 'done' && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
            style={{ background: 'rgba(8,12,30,0.97)' }}
            initial={{ opacity: 1 }}
            animate={introPhase === 'fading' ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            <div className="flex items-center gap-0.5">
              <span
                className="font-sans text-white tracking-[0.04em]"
                style={{ fontWeight: 700, fontSize: 'clamp(1.4rem, 4vw, 2.4rem)', fontFamily: "'Montserrat', sans-serif" }}
              >
                {typedText}
              </span>
              {/* Blinking cursor — visible only while still typing */}
              {introPhase === 'typing' && (
                <motion.span
                  className="inline-block w-[2px] bg-blue ml-0.5"
                  style={{ height: 'clamp(1.4rem, 4vw, 2.4rem)' }}
                  animate={{ opacity: [1, 1, 0, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear', times: [0, 0.45, 0.5, 0.95, 1] }}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero section ── */}
      <section className="relative min-h-screen flex items-end overflow-hidden grain">

        {/* Background video */}
        <div className="absolute inset-0">
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
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(160deg, rgba(8,12,30,0.5) 0%, rgba(8,12,30,0.15) 40%, rgba(8,12,30,0.85) 100%)' }}
          />
          <div className="absolute inset-x-0 bottom-0 h-40"
            style={{ background: 'linear-gradient(to top, rgba(30,60,180,0.18), transparent)' }}
          />
        </div>

        {/* Content — only animates in after intro fades */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pb-16 md:pb-24">

          {/* Top label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex items-center gap-4 mb-8 md:mb-10"
          >
            <span className="w-8 h-px bg-blue" />
            <span className="label-tag text-blue">Georgia, USA · Caleb Elliott</span>
          </motion.div>

          {/* CALEB — slides up */}
          <div className="overflow-hidden mb-0">
            <motion.div
              initial={{ y: '110%' }}
              animate={heroReady ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <span
                className="font-sans leading-none text-white block"
                style={{ fontWeight: 900, fontSize: 'clamp(3.5rem, 11vw, 10rem)', letterSpacing: '-0.02em', lineHeight: 1 }}
              >
                CALEB
              </span>
            </motion.div>
          </div>

          {/* ELLIOTT — SVG ghost text, slides up */}
          <div className="overflow-hidden mb-10 md:mb-14">
            <motion.div
              initial={{ y: '110%' }}
              animate={heroReady ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
            >
              <svg
                viewBox="0 0 1000 120"
                className="w-full overflow-visible"
                style={{ height: 'clamp(3.2rem, 10.5vw, 9.6rem)' }}
                aria-label="ELLIOTT"
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
                  ELLIOTT
                </text>
              </svg>
            </motion.div>
          </div>

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroReady ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.45 }}
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
          animate={heroReady ? { opacity: 1 } : {}}
          transition={{ delay: 0.9 }}
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
    </>
  )
}
