// GROQ queries for Sanity

// Fields projected for project cards (list views)
const PROJECT_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  "category": category->{ title, "slug": slug.current },
  "coverImage": coverImage{ asset, alt, hotspot, crop, externalUrl },
  videoUrl,
  client,
  location,
  projectDate,
  featured
`

// Full project fields (detail view)
const PROJECT_FULL_FIELDS = `
  ${PROJECT_CARD_FIELDS},
  description,
  "gallery": gallery[]{ asset, alt, hotspot, crop },
  servicesUsed,
  liveUrl,
  additionalVideos,
  seoTitle,
  seoDescription,
  publishedAt
`

export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(publishedAt desc) {
    ${PROJECT_CARD_FIELDS}
  }
`

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(publishedAt desc)[0...6] {
    ${PROJECT_CARD_FIELDS}
  }
`

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    ${PROJECT_FULL_FIELDS}
  }
`

export const PROJECTS_BY_CATEGORY_QUERY = `
  *[_type == "project" && category->slug.current == $category] | order(publishedAt desc) {
    ${PROJECT_CARD_FIELDS}
  }
`

export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(sortOrder asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    icon
  }
`

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0] {
    siteTitle,
    heroVideoUrl,
    heroHeadline,
    heroSubline,
    contactEmail,
    availabilityNote,
    socialLinks
  }
`

export const RELATED_PROJECTS_QUERY = `
  *[_type == "project" && category->slug.current == $category && slug.current != $slug][0...3] {
    ${PROJECT_CARD_FIELDS}
  }
`
