import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './src/sanity/schemaTypes'
import { structure, singletonTypes } from './src/sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'Haniya Deeq',

  projectId: 'shapc1fi',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
  ],

  schema: {
    types: schemaTypes,
  },
  
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((item) => !singletonTypes.has(item.templateId))
        : prev,
    actions: (prev, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? prev.filter(({ action }) => action && !['unpublish', 'delete', 'duplicate'].includes(action))
        : prev,
  },
})
