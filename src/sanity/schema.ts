import { categorySchema } from './schemas/category'
import { projectSchema } from './schemas/project'
import { serviceSchema } from './schemas/service'
import { siteSettingsSchema } from './schemas/siteSettings'

export const schemaTypes = [
  projectSchema,
  categorySchema,
  serviceSchema,
  siteSettingsSchema,
]
