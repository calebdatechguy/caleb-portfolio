import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schema'

export default defineConfig({
  name: 'caleb-creative',
  title: 'Caleb Creative',

  projectId: 'u8jnmsuy',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Projects')
              .schemaType('project')
              .child(S.documentTypeList('project').title('All Projects')),
            S.listItem()
              .title('Categories')
              .schemaType('category')
              .child(S.documentTypeList('category').title('Categories')),
            S.listItem()
              .title('Services')
              .schemaType('service')
              .child(S.documentTypeList('service').title('Services')),
            S.divider(),
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
