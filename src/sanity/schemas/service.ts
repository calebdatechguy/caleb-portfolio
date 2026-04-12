import { defineType, defineField } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service Group',
  type: 'document',
  fields: [
    defineField({
      name: 'groupName',
      title: 'Group Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (emoji or name)',
      type: 'string',
    }),
    defineField({
      name: 'subServices',
      title: 'Sub-Services',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'groupName', subtitle: 'icon' },
  },
})
