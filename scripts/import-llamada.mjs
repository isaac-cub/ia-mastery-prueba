// Crea el doc `llamada` desde la semilla. Si ya existe NO lo toca: la fuente de verdad pasa a ser Sanity (/admin).
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})
const seed = JSON.parse(readFileSync(new URL('../src/content/llamada.json', import.meta.url)))
const res = await client.createIfNotExists(seed)
console.log(res._id, res._rev, res._createdAt)
