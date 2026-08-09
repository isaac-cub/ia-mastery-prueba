// Puntual: borra `testimonials.quotes` (los 3 testimonios de solo texto) del doc `home`.
// Hace backup en scripts/_backup-quotes.json antes de tocar nada.
// Uso: node scripts/unset-quote-testimonials.mjs [--dry]
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

const quotes = await client.fetch('*[_id=="home"][0].testimonials.quotes')
if (!quotes?.length) {
  console.log('No hay quotes que borrar.')
  process.exit(0)
}
fs.writeFileSync('scripts/_backup-quotes.json', JSON.stringify(quotes, null, 2))
console.log(`Backup de ${quotes.length} quotes en scripts/_backup-quotes.json`)

if (DRY) {
  console.log('--dry: no se ha borrado nada.')
  process.exit(0)
}
await client.patch('home').unset(['testimonials.quotes']).commit()
console.log('testimonials.quotes borrado del doc home.')
