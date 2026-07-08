// @ts-check
import { defineConfig } from 'astro/config';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';

// Static landing page. TinaCMS edits src/content/home.json via /admin,
// commits to Git, Netlify rebuilds.
export default defineConfig({
  site: 'https://ia-mastery.netlify.app',
  integrations: [tina()],
  vite: {
    plugins: [tinaAdminDevRedirect()],
  },
});
