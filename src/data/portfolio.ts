export type ProjectCategory =
  | 'wedding-film'
  | 'wedding-photo'
  | 'commercial-video'
  | 'brand-photo'
  | 'web-design'
  | 'graphic-design'

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  categoryLabel: string
  coverImage: string
  videoUrl?: string
  gallery?: string[]
  description: string
  client?: string
  location?: string
  projectDate: string
  servicesUsed: string[]
  liveUrl?: string
  featured: boolean
}

export const categoryLabels: Record<ProjectCategory, string> = {
  'wedding-film': 'Wedding Films',
  'wedding-photo': 'Wedding Photography',
  'commercial-video': 'Commercial & Brand Video',
  'brand-photo': 'Brand Photography',
  'web-design': 'Web & App Design',
  'graphic-design': 'Graphic Design & Branding',
}

export const projects: Project[] = [
  {
    slug: 'morgan-hayes-wedding-film',
    title: 'Morgan & Hayes — Savannah Wedding Film',
    category: 'wedding-film',
    categoryLabel: 'Wedding Films',
    coverImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description:
      'A cinematic wedding film captured across the oak-lined streets of Savannah, Georgia. Morgan and Hayes chose an intimate ceremony at a historic estate, surrounded by family and the golden light of a southern evening. Every frame was crafted to tell their story — quiet glances, joyful tears, and a first dance that stopped time.',
    client: 'Morgan & Hayes',
    location: 'Savannah, GA',
    projectDate: 'October 2024',
    servicesUsed: ['Cinematography', 'Color Grading', 'Editing', 'Drone Footage'],
    featured: true,
  },
  {
    slug: 'claire-james-wedding-photo',
    title: 'Claire & James — Blue Ridge Mountain Wedding',
    category: 'wedding-photo',
    categoryLabel: 'Wedding Photography',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80',
      'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1200&q=80',
      'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80',
    ],
    description:
      'Claire and James exchanged vows on a misty autumn morning in the Blue Ridge Mountains. The natural palette of copper, amber, and deep green created a backdrop that no studio could replicate. This collection spans the full day — from quiet bridal preparations to the final sparkler send-off.',
    client: 'Claire & James',
    location: 'Blue Ridge, GA',
    projectDate: 'November 2024',
    servicesUsed: ['Wedding Photography', 'Editing', 'Print Delivery'],
    featured: true,
  },
  {
    slug: 'atlas-coffee-brand-video',
    title: 'Atlas Coffee Co. — Brand Campaign',
    category: 'commercial-video',
    categoryLabel: 'Commercial & Brand Video',
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description:
      'A full brand campaign for Atlas Coffee Co., capturing the story of their single-origin sourcing process — from Ethiopian highlands to local Georgia roasters. Three commercial spots were produced for web, social, and in-store display.',
    client: 'Atlas Coffee Co.',
    location: 'Atlanta, GA',
    projectDate: 'August 2024',
    servicesUsed: ['Commercial Videography', 'Scriptwriting', 'Color Grading', 'Motion Graphics'],
    featured: true,
  },
  {
    slug: 'nova-wellness-brand-photo',
    title: 'Nova Wellness — Brand Photography',
    category: 'brand-photo',
    categoryLabel: 'Brand Photography',
    coverImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80',
      'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1200&q=80',
    ],
    description:
      'A complete brand photography suite for Nova Wellness, a boutique wellness studio in Atlanta. The shoot covered product photography, environmental portraits, and lifestyle content for their rebrand launch.',
    client: 'Nova Wellness',
    location: 'Atlanta, GA',
    projectDate: 'September 2024',
    servicesUsed: ['Brand Photography', 'Product Photography', 'Retouching'],
    featured: false,
  },
  {
    slug: 'meridian-architects-website',
    title: 'Meridian Architects — Website Redesign',
    category: 'web-design',
    categoryLabel: 'Web & App Design',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&q=80',
    ],
    description:
      'A complete website redesign for Meridian Architects — a boutique architecture firm in Savannah. The new site prioritises their project portfolio with a full-screen masonry gallery, smooth scroll interactions, and a streamlined client inquiry process.',
    client: 'Meridian Architects',
    location: 'Savannah, GA',
    projectDate: 'July 2024',
    servicesUsed: ['Web Design', 'Web Development', 'UX/UI', 'SEO'],
    liveUrl: 'https://example.com',
    featured: true,
  },
  {
    slug: 'solace-brand-identity',
    title: 'Solace — Brand Identity & Logo',
    category: 'graphic-design',
    categoryLabel: 'Graphic Design & Branding',
    coverImage: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&q=80',
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    ],
    description:
      'A full brand identity system for Solace, a mental health app startup. Deliverables included logo design, color system, typography guidelines, icon set, and a complete brand standards guide.',
    client: 'Solace App',
    projectDate: 'June 2024',
    servicesUsed: ['Logo Design', 'Brand Identity', 'Typography', 'Icon Design'],
    featured: false,
  },
  {
    slug: 'emma-ryan-wedding-film',
    title: 'Emma & Ryan — Jekyll Island Wedding Film',
    category: 'wedding-film',
    categoryLabel: 'Wedding Films',
    coverImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description:
      'Emma and Ryan chose the timeless beauty of Jekyll Island for their ceremony — windswept dunes, Spanish moss, and a golden-hour sky that felt painted. This film captures every intimate moment of their coastal Georgia wedding.',
    client: 'Emma & Ryan',
    location: 'Jekyll Island, GA',
    projectDate: 'May 2024',
    servicesUsed: ['Cinematography', 'Editing', 'Drone Footage', 'Audio Mix'],
    featured: false,
  },
  {
    slug: 'stride-athletic-campaign',
    title: 'Stride Athletic — Product Campaign',
    category: 'commercial-video',
    categoryLabel: 'Commercial & Brand Video',
    coverImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description:
      'A high-energy product campaign for Stride Athletic\'s new trail shoe line. Shot across three Georgia locations — mountain trails, urban streets, and a red clay track — with slow-motion sequences and dynamic camera movement.',
    client: 'Stride Athletic',
    location: 'Georgia',
    projectDate: 'April 2024',
    servicesUsed: ['Commercial Videography', 'Slow Motion', 'Color Grading', 'Sound Design'],
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
