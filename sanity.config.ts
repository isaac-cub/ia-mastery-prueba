import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schema'

// Documento único: el cliente edita SIEMPRE el mismo doc `home`.
const singleton = (S: any) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Landing AI Mastery')
        .id('home')
        .child(S.document().schemaType('home').documentId('home')),
    ])

export default defineConfig({
  name: 'default',
  title: 'AI Mastery',
  projectId: 'qqzhyit9',
  dataset: 'production',
  basePath: '/admin',
  plugins: [structureTool({ structure: singleton })],
  schema: {
    types: schemaTypes,
    // Sin plantillas de "crear nuevo" para el singleton.
    templates: (prev) => prev.filter((t) => t.schemaType !== 'home'),
  },
  document: {
    // Oculta duplicar / borrar / despublicar en el singleton.
    actions: (prev, { schemaType }) =>
      schemaType === 'home'
        ? prev.filter(({ action }) =>
            ['publish', 'discardChanges', 'restore'].includes(action as string),
          )
        : prev,
  },
})
