import { usePageTitle } from '@/lib/usePageTitle'
import { Hero } from '@/components/home/Hero'
import { CategorySplit } from '@/components/home/CategorySplit'
import { FeaturedWork } from '@/components/home/FeaturedWork'
import { AboutSnippet } from '@/components/home/AboutSnippet'
import { ServicesTeaser } from '@/components/home/ServicesTeaser'
import { CTAStrip } from '@/components/home/CTAStrip'

export function HomePage() {
  usePageTitle()
  return (
    <div>
      <Hero />
      <CategorySplit />
      <FeaturedWork />
      <AboutSnippet />
      <ServicesTeaser />
      <CTAStrip />
    </div>
  )
}
