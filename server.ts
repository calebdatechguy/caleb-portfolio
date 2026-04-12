/**
 * Production static file server for the Vite/React SPA.
 * Serves dist/ and falls back to index.html for client-side routing.
 */
import { join } from 'path'

const DIST = join(import.meta.dir, 'dist')
const PORT = Number(process.env.PORT) || 3000

const mimeTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain',
  '.xml':  'application/xml',
}

function mime(path: string): string {
  const ext = path.match(/\.[^.]+$/)?.[0] ?? ''
  return mimeTypes[ext] ?? 'application/octet-stream'
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url)
    let pathname = decodeURIComponent(url.pathname)

    // Try exact file first
    const tryFile = async (p: string) => {
      const file = Bun.file(join(DIST, p))
      return (await file.exists()) ? file : null
    }

    let file = await tryFile(pathname)

    // Try with /index.html appended for directory paths
    if (!file && !pathname.endsWith('/')) {
      file = await tryFile(pathname + '/index.html')
    }

    // SPA fallback — serve index.html for all unmatched routes
    if (!file) {
      file = Bun.file(join(DIST, 'index.html'))
    }

    const headers: Record<string, string> = {
      'Content-Type': mime(file.name ?? 'index.html'),
    }

    // Cache hashed assets aggressively; HTML never cached
    if (pathname.startsWith('/assets/')) {
      headers['Cache-Control'] = 'public, max-age=31536000, immutable'
    } else {
      headers['Cache-Control'] = 'no-cache'
    }

    return new Response(file, { headers })
  },
})

console.log(`🚀 Frontend server running on port ${PORT}`)
