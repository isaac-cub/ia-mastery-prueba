// Puntual: rellena el bloque `scarcity` (barra superior) del documento home.
// OJO: escribir en Sanity dispara el rebuild del sitio VIVO (repository_dispatch).
// Uso: node scripts/set-scarcity.mjs [--dry]
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

const SCARCITY = {
  claim: 'Actualizaciones de por vida incluidas · Accede hoy antes de que termine',
  badge: 'Solo hasta el 15 de septiembre',
  deadline: '2026-09-15T23:59:59+02:00',
  cta: { label: 'Entrar hoy', href: 'https://diegonxtgen.thrivecart.com/ai-mastery/' },
}

if (DRY) {
  console.log(JSON.stringify(SCARCITY, null, 2))
} else {
  await client.patch('home').set({ scarcity: SCARCITY }).commit()
  console.log('scarcity actualizado')
}
