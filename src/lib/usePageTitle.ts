import { useEffect } from 'react'

const SITE = 'Caleb Creative'
const DEFAULT_DESC = 'Caleb Elliott is a filmmaker, photographer, and digital creative based in Georgia, USA. Wedding films, brand photography, web design, and more.'

function setMeta(property: string, content: string) {
  // Handle both name= and property= attributes
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
         ?? document.querySelector<HTMLMetaElement>(`meta[name="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    property.startsWith('og:') || property.startsWith('twitter:')
      ? el.setAttribute('property', property)
      : el.setAttribute('name', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function usePageTitle(title?: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE}` : `${SITE} — Filmmaker, Photographer & Digital Creative`
    const desc = description ?? DEFAULT_DESC

    document.title = fullTitle

    // OG
    setMeta('og:title', fullTitle)
    setMeta('og:description', desc)
    // Twitter
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', desc)
    // Standard
    setMeta('description', desc)

    return () => {
      document.title = SITE
    }
  }, [title, description])
}
