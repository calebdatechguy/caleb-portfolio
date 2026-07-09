import type { ProjectCategory } from '@/data/portfolio'

export type PortfolioGroup = 'photo' | 'video' | 'other'

export const groupToCategories: Record<PortfolioGroup, ProjectCategory[]> = {
  photo: ['wedding-photo', 'brand-photo'],
  video: ['wedding-film', 'commercial-video'],
  other: ['web-design', 'graphic-design'],
}

export const groupLabels: Record<PortfolioGroup, string> = {
  photo: 'Photography',
  video: 'Videography',
  other: 'Other Services',
}

export function isPortfolioGroup(value: unknown): value is PortfolioGroup {
  return value === 'photo' || value === 'video' || value === 'other'
}
