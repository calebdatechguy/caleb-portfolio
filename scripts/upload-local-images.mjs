/**
 * Uploads local assets to Sanity CDN and prints the asset IDs/URLs.
 * Run: SANITY_TOKEN=xxx node scripts/upload-local-images.mjs
 */
import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

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

const images = [
  {
    key: 'about-hero',
    path: 'src/assets/uploads/IMG_3884-1776002503368-4o3kfa.jpg',
    label: 'About Hero (Yellowstone selfie)',
  },
  {
    key: 'services-film',
    path: 'src/assets/uploads/Screenshot-2026-04-12-at-10.05.35-AM-1776002840981-towskq.png',
    label: 'Services — Film & Video cover (wedding screenshot)',
  },
  {
    key: 'services-photo',
    path: 'src/assets/uploads/georgialibertymd-29-1776002843235-0v4f20.jpg',
    label: 'Services — Photography cover (Georgia Liberty baseball)',
  },
]

async function run() {
  console.log('🚀 Uploading images to Sanity CDN...\n')

  const results = {}

  for (const img of images) {
    const fullPath = resolve(root, img.path)
    const filename = img.path.split('/').pop()
    const contentType = filename.endsWith('.png') ? 'image/png' : 'image/jpeg'

    process.stdout.write(`  Uploading: ${img.label}... `)
    try {
      const asset = await client.assets.upload(
        'image',
        createReadStream(fullPath),
        { filename, contentType }
      )
      console.log(`✓`)
      console.log(`    Asset ID : ${asset._id}`)
      console.log(`    CDN URL  : ${asset.url}\n`)
      results[img.key] = { id: asset._id, url: asset.url }
    } catch (err) {
      console.log(`❌ FAILED`)
      console.error(`    ${err.message}\n`)
    }
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('✅ Upload complete. Asset IDs:\n')
  for (const [key, val] of Object.entries(results)) {
    console.log(`  ${key}: "${val.id}"`)
  }
  console.log('\nPaste these IDs into your components to use the Sanity CDN.')
}

run().catch((err) => {
  console.error('❌', err.message)
  process.exit(1)
})
