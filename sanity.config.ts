import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool, defineLocations, defineDocuments } from 'sanity/presentation'
import { schemaTypes } from './sanity/schema'
import { PreviewNavigator } from './sanity/PreviewNavigator'

// Documento único: el cliente edita SIEMPRE el mismo doc `home`.
const singleton = (S: any) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Landing AI Mastery')
        .id('home')
        .child(S.document().schemaType('home').documentId('home')),
      S.listItem()
        .title('Página de llamada (Content Accelerator)')
        .id('llamada')
        .child(S.document().schemaType('llamada').documentId('llamada')),
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
      components: { unstable_navigator: { component: PreviewNavigator, minWidth: 220, maxWidth: 300 } },
      resolve: {
        // Al navegar en el panel, el editor abre solo el documento de esa página.
        mainDocuments: defineDocuments([
          { route: ['/preview', '/preview/'], filter: `_id == "home"` },
          { route: ['/preview/llamada', '/preview/llamada/'], filter: `_id == "llamada"` },
        ]),
        locations: {
          home: defineLocations({
            locations: [{ title: 'Landing AI Mastery', href: '/preview' }],
            resolve: () => ({ locations: [{ title: 'Landing AI Mastery', href: '/preview' }] }),
          }),
          llamada: defineLocations({
            locations: [{ title: 'Página de llamada', href: '/preview/llamada' }],
            resolve: () => ({ locations: [{ title: 'Página de llamada', href: '/preview/llamada' }] }),
          }),
        },
      },
    }),
    structureTool({ structure: singleton }),
  ],
  schema: {
    types: schemaTypes,
    // Sin plantillas de "crear nuevo" para el singleton.
    templates: (prev) => prev.filter((t) => !['home', 'llamada'].includes(t.schemaType)),
  },
  document: {
    // Oculta duplicar / borrar / despublicar en el singleton.
    actions: (prev, { schemaType }) =>
      ['home', 'llamada'].includes(schemaType)
        ? prev.filter(({ action }) =>
            ['publish', 'discardChanges', 'restore'].includes(action as string),
          )
        : prev,
  },
})
