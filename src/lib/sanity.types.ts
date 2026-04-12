export interface SanityImage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  asset: any
  alt?: string
  externalUrl?: string // fallback URL used when no real Sanity asset is uploaded yet
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface SanityCategory {
  _id: string
  title: string
  slug: string
  description?: string
  icon?: string
}

export interface SanityProjectCard {
  _id: string
  title: string
  slug: string
  category: { title: string; slug: string }
  coverImage: SanityImage
  videoUrl?: string
  client?: string
  location?: string
  projectDate?: string
  featured: boolean
}

export interface SanityProject extends SanityProjectCard {
  description: { _type: string; children?: { text: string }[] }[]
  gallery?: SanityImage[]
  servicesUsed?: string[]
  liveUrl?: string
  additionalVideos?: string[]
  seoTitle?: string
  seoDescription?: string
  publishedAt?: string
}

export interface SanitySettings {
  siteTitle?: string
  heroVideoUrl?: string
  heroHeadline?: string
  heroSubline?: string
  contactEmail?: string
  availabilityNote?: string
  socialLinks?: {
    instagram?: string
    youtube?: string
    tiktok?: string
    linkedin?: string
  }
}
