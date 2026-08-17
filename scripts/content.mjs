// Lee y escribe campos del doc `home` de Sanity sin tener que escribir un script nuevo cada vez.
//   node scripts/content.mjs get hero
//   node scripts/content.mjs get hero.h1Line1 hero.h1Highlight
//   node scripts/content.mjs set hero.h1Line1='Deja que la IA cree' hero.h1Highlight=contenido [--dry]
// OJO: `set` publica en el doc vivo. El sitio es estático → hace falta rebuild para verlo.
import { createClient } from '@sanity/client'
import fs from 'node:fs'

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

const DRY = process.argv.includes('--dry')
const [cmd, ...rest] = process.argv.slice(2).filter((a) => a !== '--dry')
const args = rest.filter(Boolean)

if (cmd === 'get') {
  const paths = args.length ? args : ['']
  const proj = paths.map((p, n) => `"${p || 'home'}": ${p || '@'}`).join(',')
  const doc = await client.fetch(`*[_id=="home"][0]{${proj}}`)
  console.log(JSON.stringify(doc, null, 2))
} else if (cmd === 'set') {
  const patch = {}
  for (const a of args) {
    const i = a.indexOf('=')
    if (i < 0) throw new Error(`Formato esperado ruta=valor · recibido: ${a}`)
    patch[a.slice(0, i)] = a.slice(i + 1)
  }
  const before = await client.fetch(
    `*[_id=="home"][0]{${Object.keys(patch).map((p) => `"${p}": ${p}`).join(',')}}`
  )
  for (const [k, v] of Object.entries(patch)) console.log(`${k}\n  antes: ${JSON.stringify(before[k])}\n  ahora: ${JSON.stringify(v)}`)
  if (DRY) {
    console.log('\n--dry: no se ha escrito nada.')
    process.exit(0)
  }
  await client.patch('home').set(patch).commit()
  console.log('\nOK · doc `home` actualizado. Falta rebuild para que se vea en producción.')
} else {
  console.log('Uso: node scripts/content.mjs get <ruta...> | set <ruta=valor...> [--dry]')
  process.exit(1)
}
