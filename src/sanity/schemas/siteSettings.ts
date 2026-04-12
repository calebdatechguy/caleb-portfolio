import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Caleb Creative',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      type: 'url',
      description: 'Direct MP4 URL for the homepage hero background video (Cloudinary or Vercel Blob)',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      initialValue: 'Caleb Creative',
    }),
    defineField({
      name: 'heroSubline',
      title: 'Hero Sub-line',
      type: 'string',
      initialValue: 'Filmmaker. Photographer. Digital Creative.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'hello@calebcreative.com',
    }),
    defineField({
      name: 'availabilityNote',
      title: 'Availability Note',
      type: 'string',
      description: 'e.g. Currently booking 2025 weddings',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube URL', type: 'url' }),
        defineField({ name: 'tiktok', title: 'TikTok URL', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL', type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'siteTitle' },
  },
})
