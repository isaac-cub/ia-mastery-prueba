// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

// Landing estática. El contenido vive en Sanity (dataset público `production`),
// se lee en build time vía `sanity:client`. El Studio se sirve embebido en /admin.
export default defineConfig({
  site: 'https://aimastery.creatorclub.store',
  integrations: [
    sanity({
      projectId: 'qqzhyit9',
      dataset: 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
      studioBasePath: '/admin',
      stega: {
        // Absoluto: en build (Node) el relativo no codifica.
        studioUrl: process.env.PUBLIC_SANITY_STUDIO_URL || 'https://ia-mastery.netlify.app/admin',
        // Codifica solo texto visible. Excluye rutas de imagen, enlaces,
        // embeds y campos SEO para no meter caracteres invisibles en URLs/atributos.
        filter: (props) => {
          const skip = new Set([
            'href', 'src', 'image', 'imageAlt', 'alt', 'media',
            'boxImage', 'boxImageAlt', 'avatars', 'videoEmbed',
            'seoTitle', 'seoDescription', 'type',
          ])
          return !props.sourcePath.some((seg) => typeof seg === 'string' && skip.has(seg))
        },
      },
    }),
    react(),
  ],
});
