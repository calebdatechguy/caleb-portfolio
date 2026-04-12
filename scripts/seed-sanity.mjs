/**
 * Seeds Sanity with the initial categories and projects from portfolio.ts
 * Run: node scripts/seed-sanity.mjs
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'u8jnmsuy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

if (!process.env.SANITY_TOKEN) {
  console.error('❌  Set SANITY_TOKEN environment variable first.')
  console.error('   Get a token at: https://www.sanity.io/manage/personal/project/u8jnmsuy/api')
  process.exit(1)
}

const categories = [
  { _id: 'cat-wedding-film',    title: 'Wedding Films',               slug: 'wedding-film',    icon: '🎬', sortOrder: 1 },
  { _id: 'cat-wedding-photo',   title: 'Wedding Photography',         slug: 'wedding-photo',   icon: '📷', sortOrder: 2 },
  { _id: 'cat-commercial-video',title: 'Commercial & Brand Video',    slug: 'commercial-video',icon: '🎥', sortOrder: 3 },
  { _id: 'cat-brand-photo',     title: 'Brand Photography',           slug: 'brand-photo',     icon: '📸', sortOrder: 4 },
  { _id: 'cat-web-design',      title: 'Web & App Design',            slug: 'web-design',      icon: '💻', sortOrder: 5 },
  { _id: 'cat-graphic-design',  title: 'Graphic Design & Branding',   slug: 'graphic-design',  icon: '🎨', sortOrder: 6 },
]

const projects = [
  {
    slug: 'morgan-hayes-wedding-film',
    title: 'Morgan & Hayes — Savannah Wedding Film',
    categoryId: 'cat-wedding-film',
    coverImageUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'A cinematic wedding film captured across the oak-lined streets of Savannah, Georgia. Morgan and Hayes chose an intimate ceremony at a historic estate, surrounded by family and the golden light of a southern evening.',
    client: 'Morgan & Hayes',
    location: 'Savannah, GA',
    projectDate: 'October 2024',
    servicesUsed: ['Cinematography', 'Color Grading', 'Editing', 'Drone Footage'],
    featured: true,
  },
  {
    slug: 'claire-james-wedding-photo',
    title: 'Claire & James — Blue Ridge Mountain Wedding',
    categoryId: 'cat-wedding-photo',
    coverImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    description: 'Claire and James exchanged vows on a misty autumn morning in the Blue Ridge Mountains. The natural palette of copper, amber, and deep green created a backdrop that no studio could replicate.',
    client: 'Claire & James',
    location: 'Blue Ridge, GA',
    projectDate: 'November 2024',
    servicesUsed: ['Wedding Photography', 'Editing', 'Print Delivery'],
    featured: true,
  },
  {
    slug: 'atlas-coffee-brand-video',
    title: 'Atlas Coffee Co. — Brand Campaign',
    categoryId: 'cat-commercial-video',
    coverImageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'A full brand campaign for Atlas Coffee Co., capturing the story of their single-origin sourcing process — from Ethiopian highlands to local Georgia roasters.',
    client: 'Atlas Coffee Co.',
    location: 'Atlanta, GA',
    projectDate: 'August 2024',
    servicesUsed: ['Commercial Videography', 'Scriptwriting', 'Color Grading', 'Motion Graphics'],
    featured: true,
  },
  {
    slug: 'nova-wellness-brand-photo',
    title: 'Nova Wellness — Brand Photography',
    categoryId: 'cat-brand-photo',
    coverImageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80',
    description: 'A complete brand photography suite for Nova Wellness, a boutique wellness studio in Atlanta. The shoot covered product photography, environmental portraits, and lifestyle content.',
    client: 'Nova Wellness',
    location: 'Atlanta, GA',
    projectDate: 'September 2024',
    servicesUsed: ['Brand Photography', 'Product Photography', 'Retouching'],
    featured: false,
  },
  {
    slug: 'meridian-architects-website',
    title: 'Meridian Architects — Website Redesign',
    categoryId: 'cat-web-design',
    coverImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    description: 'A complete website redesign for Meridian Architects — a boutique architecture firm in Savannah. The new site prioritises their project portfolio with a full-screen masonry gallery.',
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
    categoryId: 'cat-graphic-design',
    coverImageUrl: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1200&q=80',
    description: 'A full brand identity system for Solace, a mental health app startup. Deliverables included logo design, color system, typography guidelines, icon set, and a complete brand standards guide.',
    client: 'Solace App',
    projectDate: 'June 2024',
    servicesUsed: ['Logo Design', 'Brand Identity', 'Typography', 'Icon Design'],
    featured: false,
  },
  {
    slug: 'emma-ryan-wedding-film',
    title: 'Emma & Ryan — Jekyll Island Wedding Film',
    categoryId: 'cat-wedding-film',
    coverImageUrl: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'Emma and Ryan chose the timeless beauty of Jekyll Island for their ceremony — windswept dunes, Spanish moss, and a golden-hour sky that felt painted.',
    client: 'Emma & Ryan',
    location: 'Jekyll Island, GA',
    projectDate: 'May 2024',
    servicesUsed: ['Cinematography', 'Editing', 'Drone Footage', 'Audio Mix'],
    featured: false,
  },
  {
    slug: 'stride-athletic-campaign',
    title: 'Stride Athletic — Product Campaign',
    categoryId: 'cat-commercial-video',
    coverImageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'A high-energy product campaign for Stride Athletic\'s new trail shoe line. Shot across three Georgia locations with slow-motion sequences and dynamic camera movement.',
    client: 'Stride Athletic',
    location: 'Georgia',
    projectDate: 'April 2024',
    servicesUsed: ['Commercial Videography', 'Slow Motion', 'Color Grading', 'Sound Design'],
    featured: false,
  },
]

async function seed() {
  console.log('🌱 Seeding Sanity...\n')

  // Upsert categories
  console.log('📁 Creating categories...')
  for (const cat of categories) {
    await client.createOrReplace({
      _type: 'category',
      _id: cat._id,
      title: cat.title,
      slug: { _type: 'slug', current: cat.slug },
      icon: cat.icon,
      sortOrder: cat.sortOrder,
    })
    console.log(`  ✓ ${cat.title}`)
  }

  // Upsert projects
  console.log('\n📂 Creating projects...')
  for (const proj of projects) {
    await client.createOrReplace({
      _type: 'project',
      _id: `project-${proj.slug}`,
      title: proj.title,
      slug: { _type: 'slug', current: proj.slug },
      category: { _type: 'reference', _ref: proj.categoryId },
      // coverImage stored as external URL string in a custom field for now
      // (upload to Sanity assets via Studio for production)
      coverImage: {
        _type: 'image',
        asset: {
          _type: 'reference',
          // Use a placeholder — replace with real Sanity asset uploads via Studio
          _ref: 'image-placeholder',
          _weak: true,
        },
        // Store the URL as metadata so we can use it as fallback
        externalUrl: proj.coverImageUrl,
      },
      videoUrl: proj.videoUrl ?? null,
      description: [
        {
          _type: 'block',
          _key: 'desc',
          style: 'normal',
          children: [{ _type: 'span', _key: 'span', text: proj.description, marks: [] }],
          markDefs: [],
        },
      ],
      client: proj.client ?? null,
      location: proj.location ?? null,
      projectDate: proj.projectDate ?? null,
      servicesUsed: proj.servicesUsed ?? [],
      liveUrl: proj.liveUrl ?? null,
      featured: proj.featured,
      publishedAt: new Date().toISOString(),
    })
    console.log(`  ✓ ${proj.title}`)
  }

  console.log('\n✅ Seed complete!')
  console.log('\nNext steps:')
  console.log('  1. Visit /studio in your app to see the CMS')
  console.log('  2. Open each project and upload real cover images')
  console.log('  3. Replace the YouTube placeholder URLs with your actual videos')
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message)
  process.exit(1)
})
