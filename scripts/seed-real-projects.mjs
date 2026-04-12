/**
 * Seeds Caleb's real portfolio projects into Sanity
 * Run: SANITY_TOKEN=xxx node scripts/seed-real-projects.mjs
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
  console.error('❌  Set SANITY_TOKEN first.')
  process.exit(1)
}

function slug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function block(text) {
  return [{
    _type: 'block', _key: 'b1', style: 'normal', markDefs: [],
    children: [{ _type: 'span', _key: 's1', text: text.trim(), marks: [] }],
  }]
}

// Placeholder cover images by category (replace in Studio with real photos)
const covers = {
  'cat-wedding-film':     'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&q=80',
  'cat-commercial-video': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80',
  'cat-brand-photo':      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80',
  'cat-web-design':       'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
}

const projects = [
  {
    id: 'the-morgans-wedding-film',
    title: "The Morgan's",
    categoryId: 'cat-wedding-film',
    client: 'The Morgans',
    location: 'Tennessee',
    date: 'June 2025',
    description: 'Reality-style wedding film shot in Tennessee. Filmed with interviews, 2-day shoot, Sony Hi8 Camera, high quality audio, and luxury style.',
    videoUrl: 'https://www.youtube.com/watch?v=5cJMAl2AO9I',
    featured: true,
    services: ['Cinematography', 'Interview Direction', 'Color Grading', 'Editing', 'Audio Mix'],
  },
  {
    id: 'anna-kyle-moore-wedding-film',
    title: 'Anna + Kyle Moore',
    categoryId: 'cat-wedding-film',
    client: 'Anna + Kyle Moore',
    location: 'Georgia',
    date: 'July 2025',
    description: 'A simple but sweet wedding shot in Georgia over an 8-hour day.',
    videoUrl: 'https://www.youtube.com/watch?v=-XVJWjKa_h8',
    featured: false,
    services: ['Cinematography', 'Editing', 'Color Grading'],
  },
  {
    id: 'the-shumans-wedding-film',
    title: "The Shuman's Wedding",
    categoryId: 'cat-wedding-film',
    client: 'The Shumans',
    location: 'Georgia',
    date: 'July 2025',
    description: 'Storytelling-style wedding film with interviews, shot over a full wedding day in Georgia. Includes teaser and full film.\n\nFull Film: https://www.youtube.com/watch?v=b2A3403fPP0',
    videoUrl: 'https://www.youtube.com/watch?v=blNikxWVSFQ',
    featured: false,
    services: ['Cinematography', 'Interview Direction', 'Editing', 'Teaser Cut'],
  },
  {
    id: 'bca-football-hype-video-series',
    title: 'BCA Football Hype Video Series',
    categoryId: 'cat-commercial-video',
    client: 'Bethlehem Christian Academy',
    location: 'Georgia',
    date: 'September 2025',
    description: 'A series of storytelling hype videos for BCA Football — captivating audiences and hyping up the school community through cinematic storytelling.\n\nAdditional videos:\nhttps://www.youtube.com/watch?v=7P2BWI7NYoc\nhttps://vimeo.com/1135105411\nhttps://vimeo.com/1112089982/da15d725d8',
    videoUrl: 'https://vimeo.com/1118000895/e4c2d0d549',
    featured: true,
    services: ['Commercial Videography', 'Cinematic Storytelling', 'Editing', 'Color Grading'],
  },
  {
    id: 'bca-basketball-hype-video',
    title: 'BCA Basketball Hype Video',
    categoryId: 'cat-commercial-video',
    client: 'Bethlehem Christian Academy',
    location: 'Georgia',
    date: '2025',
    description: 'A super creative basketball hype video produced for BCA.',
    videoUrl: 'https://vimeo.com/1154903090/9e5efdd2d0',
    featured: false,
    services: ['Commercial Videography', 'Editing', 'Color Grading', 'Motion Graphics'],
  },
  {
    id: 'bca-igknight-retreat-recap',
    title: 'BCA IGKnight Spiritual Retreat Recap',
    categoryId: 'cat-commercial-video',
    client: 'Bethlehem Christian Academy',
    location: 'Woodlands Camp, Georgia',
    date: 'October 2025',
    description: 'A 2-day shoot at Woodlands Camp in Georgia capturing audio, video, and more — producing a full retreat recap video turned around in 48 hours.',
    videoUrl: 'https://vimeo.com/1127631778',
    featured: false,
    services: ['Event Videography', 'Fast Turnaround', 'Audio Recording', 'Editing'],
  },
  {
    id: 'bca-vs-george-walton-game-recap',
    title: 'BCA vs George Walton Game Recap',
    categoryId: 'cat-commercial-video',
    client: 'Bethlehem Christian Academy',
    location: 'Georgia',
    date: 'January 2026',
    description: 'A gameday recap video featuring behind-the-scenes pregame, post-game, and coach talks — told in a storytelling and hype format. Great promotion for the school and players.',
    videoUrl: 'https://www.youtube.com/watch?v=-ATWmOvGasU',
    featured: false,
    services: ['Sports Videography', 'Storytelling', 'Editing', 'Color Grading'],
  },
  {
    id: 'migration-calls-promo-video',
    title: 'Migration Calls Promo Video',
    categoryId: 'cat-commercial-video',
    client: 'Migration Calls',
    location: '',
    date: 'January 2026',
    description: 'A promo video for a duck call brand, showcased at a conference.',
    videoUrl: 'https://www.youtube.com/watch?v=nUCg2YpbLQQ',
    featured: false,
    services: ['Commercial Videography', 'Product Video', 'Editing'],
  },
  {
    id: 'surge-student-conference-2026-promo',
    title: 'Surge Student Conference 2026 Promo',
    categoryId: 'cat-commercial-video',
    client: 'SURGE Conferences',
    location: '',
    date: 'February 2026',
    description: 'A high-energy promo video for a student conference hosting 500 kids.',
    videoUrl: 'https://youtu.be/zZqB7U9UAX0',
    featured: true,
    services: ['Commercial Videography', 'Motion Graphics', 'Editing', 'Color Grading'],
  },
  {
    id: 'banks-county-volleyball-hype-video',
    title: 'Banks County Volleyball Hype Video',
    categoryId: 'cat-commercial-video',
    client: 'Banks County',
    location: 'Georgia',
    date: 'November 2025',
    description: "A hype video for Banks County Volleyball's 2025-26 season.",
    videoUrl: 'https://www.youtube.com/watch?v=Ug2vg2za3Hc',
    featured: true,
    services: ['Sports Videography', 'Editing', 'Color Grading'],
  },
  {
    id: 'drew-baker-baseball-series',
    title: 'Drew Baker Baseball Series',
    categoryId: 'cat-commercial-video',
    client: 'Bethlehem Christian Academy',
    location: 'Georgia',
    date: '2023',
    description: 'A multi-video series showcasing the BCA Baseball program during their 2023 championship season. Fast turnarounds, captivating storytelling, teasers, live Instagram coverage during games, and recap videos.\n\nAdditional videos:\nhttps://youtu.be/S7pH2khRUfk\nhttps://youtu.be/bG1u8tVPJY8',
    videoUrl: 'https://youtu.be/lbijZQvtw5k',
    featured: false,
    services: ['Sports Videography', 'Social Media Coverage', 'Teaser Cuts', 'Fast Turnaround'],
  },
  {
    id: 'surge-conference-2024-recap',
    title: 'Surge Conference 2024 Recap',
    categoryId: 'cat-commercial-video',
    client: 'SURGE Conferences',
    location: '',
    date: '2024',
    description: 'A recap video for the 2024 Surge Conference.',
    videoUrl: 'https://www.youtube.com/watch?v=sfQba1xrCEw',
    featured: false,
    services: ['Event Videography', 'Editing', 'Color Grading'],
  },
  {
    id: 'tyler-hammond-live-show',
    title: 'Tyler Hammond Live Show',
    categoryId: 'cat-brand-photo',
    client: 'Tyler Hammond',
    location: 'Augusta, Georgia',
    date: 'March 2026',
    description: 'Photos and video captured at a Tyler Hammond rock artist show in Augusta, Georgia — performing to a packed house.',
    videoUrl: null,
    liveUrl: 'https://photos.thecalebelliott.com/tylerhammondbrock/',
    featured: false,
    services: ['Event Photography', 'Concert Photography', 'Editing'],
  },
  {
    id: 'eric-craft-commissioner-campaign',
    title: 'Eric Craft Commissioner Campaign',
    categoryId: 'cat-web-design',
    client: 'Eric Craft',
    location: 'Georgia',
    date: 'April 2026',
    description: 'Full campaign creation and management: custom website design, development & management; family and campaign photography; and multi-platform content creation for Eric Craft\'s commissioner campaign.',
    videoUrl: null,
    liveUrl: 'https://craft4commissioner.com/',
    featured: false,
    services: ['Web Design', 'Web Development', 'Campaign Photography', 'Content Creation', 'Graphic Design'],
  },
  {
    id: 'out-west-trip-2024',
    title: 'Out-West Trip 2024',
    categoryId: 'cat-brand-photo',
    client: 'Personal Project',
    location: 'Jackson Hole, WY → Las Vegas, NV',
    date: '2024',
    description: 'A personal photography project capturing national parks and landscapes — traveling from Jackson Hole, Wyoming all the way to Las Vegas, Nevada.',
    videoUrl: null,
    liveUrl: 'https://photos.thecalebelliott.com/outwest24/',
    featured: true,
    services: ['Landscape Photography', 'Travel Photography', 'Editing'],
  },
]

async function seed() {
  console.log(`🚀 Seeding ${projects.length} real projects into Sanity...\n`)

  for (const p of projects) {
    const doc = {
      _type: 'project',
      _id: `project-${p.id}`,
      title: p.title,
      slug: { _type: 'slug', current: p.id },
      category: { _type: 'reference', _ref: p.categoryId },
      coverImage: {
        _type: 'image',
        asset: { _type: 'reference', _ref: 'image-placeholder', _weak: true },
        externalUrl: covers[p.categoryId] ?? covers['cat-commercial-video'],
      },
      videoUrl: p.videoUrl ?? null,
      description: block(p.description),
      client: p.client || null,
      location: p.location || null,
      projectDate: p.date || null,
      servicesUsed: p.services ?? [],
      liveUrl: p.liveUrl ?? null,
      featured: p.featured,
      publishedAt: new Date().toISOString(),
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${p.title}`)
  }

  console.log(`\n✅ Done — ${projects.length} projects seeded!`)
  console.log('\nNext: open /studio → Projects and upload real cover images for each one.')
}

seed().catch((err) => {
  console.error('❌', err.message)
  process.exit(1)
})
