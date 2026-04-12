import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { usePageTitle } from '@/lib/usePageTitle'
import { urlFor } from '@/lib/sanity'

const ABOUT_HERO_IMAGE = { asset: { _ref: 'image-90573175ef52bb0f0aa18d69cf5edaa56ce66320-1024x1365-jpg' } }

const gear = [
  { category: 'Video', items: ['Cinematography', 'Wedding Films', 'Commercial Production', 'Sports Hype Videos', 'Short Form Content', 'Drone Footage'] },
  { category: 'Photo', items: ['Wedding Photography', 'Sports Photography', 'Brand & Business', 'Social Media Content'] },
  { category: 'Web & Dev', items: ['Frontend Development', 'Backend Development', 'UI/UX Design', 'Landing Pages', 'Website Maintenance'] },
  { category: 'Brand', items: ['Brand Identity', 'Logo Design', 'Graphic Design', 'Marketing Materials'] },
]

export function AboutPage() {
  usePageTitle('About', 'Caleb Elliott is a filmmaker, photographer, and digital creative based in Georgia, USA — the person behind Caleb Creative and Lyko Digital.')
  const heroRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLDivElement>(null)
  const gearRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })
  const bioInView = useInView(bioRef, { once: true, margin: '-60px' })
  const gearInView = useInView(gearRef, { once: true, margin: '-60px' })

  return (
    <div className="min-h-screen pt-20">

      {/* Hero — full bleed */}
      <div ref={heroRef} className="relative h-[80vh] overflow-hidden">
        <img
          src={urlFor(ABOUT_HERO_IMAGE).width(1800).quality(80).auto('format').url()}
          alt="Caleb Elliott"
          className="w-full h-full object-cover object-top"
          style={{ filter: 'brightness(0.35) saturate(0.6)' }}
        />
        {/* Navy gradient */}
        <div className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(8,12,30,0.3) 0%, rgba(8,12,30,0.0) 40%, rgba(8,12,30,0.9) 100%)'
          }}
        />

        {/* Blue side accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue opacity-60" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute bottom-10 left-6 md:left-10 right-6 md:right-10"
        >
          <p className="label-tag text-blue mb-5">About</p>
          <h1
            className="font-sans text-white leading-none"
            style={{ fontWeight: 900, fontSize: 'clamp(2.5rem, 7vw, 6rem)', letterSpacing: '-0.03em' }}
          >
            CALEB<br />ELLIOTT
          </h1>
          <p className="mt-3 label-tag text-white/50">Filmmaker · Photographer · Digital Creative</p>
        </motion.div>
      </div>

      {/* Bio */}
      <div ref={bioRef} className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={bioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="label-tag text-blue mb-6">About Me</p>
            <h2
              className="font-sans text-foreground leading-none mb-10"
              style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              CRAFT MEETS<br />INTENTION
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-sm">
              <p>
                What's up! My name is Caleb Elliott — an entrepreneur at heart, photographer, filmmaker, and digital creative based in Georgia, USA. Since I was 8 years old, I've been creating businesses, digital assets, websites, videos, all kinds of stuff.
              </p>
              <p>
                I started Caleb Creative as an outlet for my work, but it has since scaled into multiple different entities, and a great way for me to help people who want their vision to come alive. Everything is intentional.
              </p>
              <p>
                Caleb Creative is a division under Lyko Digital, a company I also own.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={bioInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-10"
          >
            {/* Quote */}
            <div className="border-l-2 border-blue pl-7 py-2">
              <p className="text-foreground font-display text-lg leading-relaxed italic">
                "I believe the work that lasts is made by people who care. I got into this because I wanted to make things that meant something — not just deliverables, but memories."
              </p>
            </div>


          </motion.div>
        </div>
      </div>

      {/* Gear */}
      <div ref={gearRef} className="bg-card border-t border-border py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={gearInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="label-tag text-blue mb-5">What I Do</p>
            <h2
              className="font-sans text-foreground leading-none"
              style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
            >
              SKILLS &amp; SERVICES
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
            {gear.map((g, i) => (
              <motion.div
                key={g.category}
                initial={{ opacity: 0, y: 20 }}
                animate={gearInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <p className="label-tag text-blue mb-4">{g.category}</p>
                <ul className="space-y-2.5">
                  {g.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground flex items-start gap-2.5">
                      <span className="w-1 h-1 bg-blue mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <h2
            className="font-sans text-foreground leading-none mb-2"
            style={{ fontWeight: 800, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', letterSpacing: '-0.025em' }}
          >
            READY TO WORK TOGETHER?
          </h2>
          <p className="text-muted-foreground text-sm">Let's make something worth remembering.</p>
        </div>
        <Link
          to="/contact"
          className="group flex items-center gap-3 px-8 py-4 bg-blue text-white text-[0.65rem] font-800 tracking-[0.25em] uppercase hover:bg-blue-bright transition-colors duration-300 flex-shrink-0"
          style={{ fontWeight: 800 }}
        >
          Work With Me
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
