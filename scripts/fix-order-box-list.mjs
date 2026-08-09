// Corrección: la lista de capacidades va en la CAJA DE COMPRA (pricing.includes),
// no en la sección "Pago único, acceso de por vida" (included.items).
//  - restaura included.items desde scripts/_backup-included-items.json
//  - sustituye pricing.includes por los 10 items
//  - pricing.bonuses NO se toca
// Uso: node scripts/fix-order-box-list.mjs [--dry]
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

const ITEMS = [
  'Creación de vídeos con look cinematográfico',
  'Generación de efectos especiales con IA',
  'Imágenes para contenido, redes y anuncios',
  'Fotos y vídeos de producto con calidad de estudio',
  'Diseño de miniaturas con IA',
  'Transformación de fondos y espacios de grabación',
  'Creación de avatares realistas',
  'Generación de hooks virales con IA',
  'Creación de páginas web profesionales con IA',
  'Métodos low cost con resultados de alta calidad',
]

const restored = JSON.parse(fs.readFileSync('scripts/_backup-included-items.json', 'utf8'))
const prevPricing = await client.fetch('*[_id=="home"][0].pricing.includes')
fs.writeFileSync('scripts/_backup-pricing-includes.json', JSON.stringify(prevPricing, null, 2))

console.log(`included.items  → restaurados ${restored.length} items originales`)
console.log(`pricing.includes → ${prevPricing.length} items viejos (backup en scripts/_backup-pricing-includes.json)`)
console.log('\nNueva lista de la caja de compra:')
ITEMS.forEach((i, n) => console.log(` ${String(n + 1).padStart(2)}. ${i}`))

if (DRY) {
  console.log('\n--dry: no se ha escrito nada.')
  process.exit(0)
}

await client
  .patch('home')
  .set({ 'included.items': restored, 'pricing.includes': ITEMS })
  .commit()

const after = await client.fetch('*[_id=="home"][0]{"inc":included.items,"pri":pricing.includes,"bon":pricing.bonuses}')
console.log(`\nOK · included.items=${after.inc.length} · pricing.includes=${after.pri.length} · pricing.bonuses=${after.bon.length} (intactos)`)
