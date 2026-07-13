// Migración puntual: pasa las imágenes de rutas /assets/* a assets nativos de Sanity,
// para que el cliente pueda subirlas desde /admin arrastrando.
// Los vídeos NO se migran: siguen siendo URLs (Bunny Stream o /assets/*.mp4).
// Uso: node scripts/migrate-media-to-sanity.mjs [--dry]
import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'

const DRY = process.argv.includes('--dry')
const env = Object.fromEntries(
  fs.readFileSync('.env', 'utf8').split('\n').filter(Boolean).map((l) => {
    const i = l.indexOf('=')
    return [l.slice(0, i), l.slice(i + 1).trim()]
  })
)
const client = createClient({
  projectId: env.SANITY_PROJECT_ID,
  dataset: env.SANITY_DATASET,
  token: env.SANITY_AUTH_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const cache = new Map()
async function upload(assetPath) {
  if (typeof assetPath !== 'string' || !assetPath.startsWith('/assets/')) return null
  if (cache.has(assetPath)) return cache.get(assetPath)
  const file = path.join('public', assetPath)
  if (!fs.existsSync(file)) throw new Error(`No existe el archivo: ${file}`)
  if (DRY) {
    console.log(`  [dry] subiría ${assetPath}`)
    cache.set(assetPath, { _type: 'image', asset: { _type: 'reference', _ref: 'DRY' } })
    return cache.get(assetPath)
  }
  const asset = await client.assets.upload('image', fs.createReadStream(file), {
    filename: path.basename(assetPath),
  })
  console.log(`  subida ${assetPath} → ${asset._id}`)
  const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
  cache.set(assetPath, ref)
  return ref
}

const doc = await client.getDocument('home')
if (!doc) throw new Error('No hay documento "home" publicado')

const set = {}
const unset = []

// hero.avatars: lista de rutas → lista de imágenes (necesitan _key)
if (Array.isArray(doc.hero?.avatars)) {
  const avatars = []
  for (const [i, a] of doc.hero.avatars.entries()) {
    const ref = await upload(a)
    avatars.push(ref ? { ...ref, _key: `avatar${i}` } : a)
  }
  set['hero.avatars'] = avatars
}

// testimonials.screenshots[].src
if (Array.isArray(doc.testimonials?.screenshots)) {
  const shots = []
  for (const s of doc.testimonials.screenshots) {
    const ref = await upload(s.src)
    shots.push(ref ? { ...s, src: ref } : s)
  }
  set['testimonials.screenshots'] = shots
}

// programa.cards[]: las de tipo image pasan a .image; las de vídeo mantienen .media
if (Array.isArray(doc.programa?.cards)) {
  const cards = []
  for (const c of doc.programa.cards) {
    if (c.type === 'image') {
      const ref = await upload(c.media)
      const { media, ...rest } = c
      cards.push(ref ? { ...rest, image: ref } : c)
    } else {
      cards.push(c)
    }
  }
  set['programa.cards'] = cards
}

// Campos sueltos
for (const [field, current] of [
  ['founder.image', doc.founder?.image],
  ['pricing.boxImage', doc.pricing?.boxImage],
]) {
  const ref = await upload(current)
  if (ref) set[field] = ref
}

console.log('\nCampos a escribir:', Object.keys(set).join(', '))
if (DRY) { console.log('\n[dry] no se ha escrito nada'); process.exit(0) }

await client.patch('home').set(set).unset(unset).commit()
console.log('\nOK — documento "home" migrado')
