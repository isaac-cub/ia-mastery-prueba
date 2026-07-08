// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

// Landing estática. El contenido vive en Sanity (dataset público `production`),
// se lee en build time vía `sanity:client`. El Studio se sirve embebido en /admin.
export default defineConfig({
  site: 'https://ia-mastery.netlify.app',
  integrations: [
    sanity({
      projectId: 'qqzhyit9',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
      studioBasePath: '/admin',
    }),
    react(),
  ],
});
