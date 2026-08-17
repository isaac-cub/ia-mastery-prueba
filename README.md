# IA Mastery — landing

Astro + Sanity. Producción: **https://iamastery.creatorclub.store** (Cloudflare Pages, proyecto `ia-mastery`, cuenta del **cliente** Creator Club).

Ojo con la grafía: `iamastery` es esta landing. `aimastery` (a-i) es otra cosa y hace 301 al sitio del cliente.

## Contenido

El contenido vivo sale de **Sanity**, no de `src/content/home.json` (eso es solo la semilla original del import). Existe un único doc publicado, `home`, sin draft. Las imágenes son assets nativos de Sanity, no rutas `/assets/*`.

Dos formas de editarlo:

- **Studio** en `/admin` (es lo que usa el cliente).
- **CLI**, para cambios rápidos o en lote:

```bash
npm run content -- get hero                      # vuelca el objeto entero
npm run content -- get hero.h1Line1 hero.badge   # campos sueltos
npm run content -- set hero.h1Line1='Deja que la IA cree' --dry
```

Para subir imágenes nuevas, copiar el bloque de cliente de `scripts/migrate-media-to-sanity.mjs` (`client.assets.upload` + `client.patch('home')`).

## Deploy

El sitio es **build estático**: cambiar contenido en Sanity no se ve hasta un rebuild.

- `git push origin main` → GitHub Actions (`.github/workflows/deploy-cloudflare.yml`) → Cloudflare Pages. Los secrets `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` ya están en el repo.
- El workflow también escucha `repository_dispatch: sanity-publish`, para que publicar en el Studio dispare el rebuild sin tocar git. Requiere un webhook configurado en manage.sanity.io apuntando a la API de GitHub.
- Deploy manual de emergencia: `npm run build && source ~/.config/cloudflare-creatorclub/env && npx wrangler@latest pages deploy dist --project-name ia-mastery --branch main`.

## Preview local

```bash
npm run dev                                              # http://localhost:4321
SHOT_WAIT=load python3 ~/.local/bin/shot.py http://localhost:4321/ out.png 1440 0
```

`SHOT_WAIT=load` es obligatorio: con `networkidle` (el defecto) la captura nunca termina, porque el vídeo del hero y el HMR de Vite mantienen la red abierta.

## Trampas conocidas de Cloudflare Pages

- La regla SPA `200` de `netlify.toml` se ignora en silencio en Pages: el rewrite del Studio se hace con `functions/admin/[[path]].js`.
- Pages hace soft-404 (cualquier ruta inexistente devuelve 200 con la home). Hay que añadir `404.html` si importa el SEO.
