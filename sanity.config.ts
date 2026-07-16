import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool, defineLocations } from 'sanity/presentation'
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
  // Embebido en Astro va en /admin; el Studio alojado por Sanity va en la raíz.
  basePath: process.env.SANITY_STUDIO_BASEPATH || '/admin',
  plugins: [
    presentationTool({
      previewUrl: { preview: '/preview' },
      resolve: {
        locations: {
          home: defineLocations({
            locations: [{ title: 'Landing AI Mastery', href: '/preview' }],
            resolve: () => ({ locations: [{ title: 'Landing AI Mastery', href: '/preview' }] }),
          }),
        },
      },
    }),
    structureTool({ structure: singleton }),
  ],
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
