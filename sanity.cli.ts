import { defineCliConfig } from 'sanity/cli'

// Solo para `npx sanity deploy` — publica el Studio en <studioHost>.sanity.studio,
// alojado gratis por Sanity e independiente del build de Netlify.
export default defineCliConfig({
  api: { projectId: 'qqzhyit9', dataset: 'production' },
  studioHost: 'ia-mastery',
})
