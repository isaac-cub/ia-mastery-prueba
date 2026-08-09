// Puntual: sube 2 capturas nuevas de testimonios a Sanity y las inserta
// al principio de `testimonials.screenshots`.
// Uso: node scripts/add-testimonials-2026-08.mjs [--dry]
import { createClient } from '@sanity/client'
import fs from 'node:fs'

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

const NEW = [
  {
    file: `${process.env.HOME}/incoming/ia-mastery/testi1.jpeg`,
    key: 'shot-discord-alejandra-75k',
    alt: 'Testimonio de Alejandra por Discord: su primer vídeo con IA superó las 75.000 visualizaciones',
  },
  {
    file: `${process.env.HOME}/incoming/ia-mastery/testi2.jpeg`,
    key: 'shot-dm-250-vs-172',
    alt: 'Testimonio por mensaje directo: pagó 250$ por un vídeo con IA y después lo hizo ella misma por 1,72$',
  },
]

const before = await client.fetch('*[_id=="home"][0].testimonials.screenshots')
console.log(`Screenshots actuales: ${before.length}`)

const items = []
for (const t of NEW) {
  const stat = fs.statSync(t.file)
  console.log(`Subiendo ${t.file} (${Math.round(stat.size / 1024)} KB)…`)
  if (DRY) continue
  const asset = await client.assets.upload('image', fs.createReadStream(t.file), {
    filename: t.file.split('/').pop(),
  })
  console.log(`  → ${asset._id}`)
  items.push({
    _key: t.key,
    _type: 'screenshot',
    src: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
    alt: t.alt,
  })
}

if (DRY) {
  console.log('--dry: no se ha escrito nada.')
  process.exit(0)
}

await client
  .patch('home')
  .insert('before', 'testimonials.screenshots[0]', items)
  .commit()

const after = await client.fetch('*[_id=="home"][0].testimonials.screenshots')
console.log(`\nScreenshots ahora: ${after.length}`)
after.forEach((s, i) => console.log(` ${i} | ${s.alt}`))
