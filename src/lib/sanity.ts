import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'u8jnmsuy',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // false = always fresh data (enable CDN only after confirmed working in prod)
})

// Image URL builder
const builder = imageUrlBuilder(sanityClient)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source)
}

// Safe image URL — uses externalUrl fallback when no real Sanity asset is uploaded
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getCoverImageUrl(image: any, width = 1200): string {
  if (!image) return ''
  // Real Sanity asset uploaded
  if (image.asset?._ref && image.asset._ref !== 'image-placeholder') {
    return urlFor(image).width(width).quality(80).auto('format').url()
  }
  // Fallback to externalUrl stored during seed
  return image.externalUrl ?? ''
}

// Convert YouTube/Vimeo URL → embed URL
export function getVideoEmbedUrl(url: string): string | null {
  if (!url) return null

  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/
  )
  if (ytMatch) return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}`

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`

  return url // already an embed URL
}

// Portable text: extract plain string from block content
export function blockToText(blocks: { _type: string; children?: { text: string }[] }[] = []): string {
  return blocks
    .filter((b) => b._type === 'block')
    .map((b) => b.children?.map((c) => c.text).join('') ?? '')
    .join('\n\n')
}
