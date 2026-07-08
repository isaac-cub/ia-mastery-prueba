import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'

const token = process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error('Falta SANITY_AUTH_TOKEN (cárgalo desde .env).')
  process.exit(1)
}

const client = createClient({
  projectId: 'qqzhyit9',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Rutas de arrays de objetos -> nombre del tipo miembro en el esquema.
const memberTypes = {
  nav: 'navItem',
  'programa.cards': 'formatCard',
  metrics: 'metric',
  'notIs.cards': 'notIsCard',
  'testimonials.screenshots': 'screenshot',
  'testimonials.quotes': 'quote',
  'faq.items': 'faqItem',
  'footer.links': 'footerLink',
}

const key = () => randomUUID().replace(/-/g, '').slice(0, 12)

function transform(value, path) {
  if (Array.isArray(value)) {
    const type = memberTypes[path]
    return value.map((item) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        return { _key: key(), ...(type ? { _type: type } : {}), ...transform(item, path) }
      }
      return transform(item, path) // strings quedan igual
    })
  }
  if (value && typeof value === 'object') {
    const out = {}
    for (const k of Object.keys(value)) out[k] = transform(value[k], path ? `${path}.${k}` : k)
    return out
  }
  return value
}

const raw = JSON.parse(readFileSync(new URL('../src/content/home.json', import.meta.url), 'utf8'))
const doc = { _id: 'home', _type: 'home', ...transform(raw, '') }

const res = await client.createOrReplace(doc)
console.log('OK →', res._id, 'rev', res._rev)
