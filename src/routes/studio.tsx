import { Studio } from 'sanity'
import config from '../../sanity.config'

// Sanity Studio embedded at /studio
// Renders the full Studio UI, overlaying the entire viewport
export function StudioPage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        // Reset any inherited dark-mode CSS vars so Sanity renders its own theme
        colorScheme: 'light',
      }}
    >
      <Studio config={config} basePath="/studio" />
    </div>
  )
}
