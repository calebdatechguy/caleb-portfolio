import { usePageTitle } from '@/lib/usePageTitle'
import { Hero } from '@/components/home/Hero'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { ServicesTeaser } from '@/components/home/ServicesTeaser'
import { AboutSnippet } from '@/components/home/AboutSnippet'
import { CTAStrip } from '@/components/home/CTAStrip'

export function HomePage() {
  usePageTitle()
  return (
    <div>
      <Hero />
      <FeaturedWork />
      <ServicesTeaser />
      <AboutSnippet />
      <CTAStrip />
    </div>
  )
}
