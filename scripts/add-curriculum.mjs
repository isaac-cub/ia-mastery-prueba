// Puntual: escribe el temario (módulos) en el doc `home` de Sanity.
// Literal del doc del cliente "BAJA CONTENIDOS IA" (26 ago 2026).
// Uso: node scripts/add-curriculum.mjs [--dry]
import { createClient } from '@sanity/client'
import fs from 'node:fs'
import crypto from 'node:crypto'

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

const key = () => crypto.randomBytes(6).toString('hex')

const items = [
  { tag: 'Módulo 1', title: 'Empieza por aquí', text: 'Conoce el funcionamiento de la academia, accede a la comunidad de alumnos y descubre cómo te mantenemos actualizado.', meta: '3 lecciones · aprox. 1 hora' },
  { tag: 'Módulo 2', title: 'Iniciación en inteligencia artificial y modelos', text: 'Aprende las bases de la inteligencia artificial, mejora tu prompting y descubre cómo acceder a modelos avanzados sin depender de suscripciones mensuales.', meta: '3 lecciones · aprox. 1 hora' },
  { tag: 'Módulo 3', title: 'Generación de imágenes con IA desde cero', text: 'Crea imágenes ultrarrealistas desde cero, controla diferentes estilos fotográficos y diseña contenido, logos con ejemplos prácticos.', meta: '5 lecciones · aprox. 1 h 40 min' },
  { tag: 'Módulo 4', title: 'Thumbnails realistas con IA', text: 'Diseña miniaturas virales para YouTube en unos clics, aunque no seas diseñador.', meta: '1 lección · aprox. 30 min' },
  { tag: 'Módulo 5', title: 'Generación de vídeo con IA desde cero', text: 'Convierte imágenes y textos en vídeos, crea escenas realistas con diálogo, genera avatares propios, añade efectos visuales y consigue audio profesional sin grabaciones complejas.', meta: '6 lecciones · aprox. 2 horas' },
  { tag: 'Nuevo', title: 'Ahorra dinero generando con IA', text: 'Nuestro secreto para conseguir resultados de alta calidad reduciendo hasta un 80 % el coste de generación.', meta: '2 lecciones · aprox. 40 min', hot: true },
  { tag: 'Módulo 6', title: 'Avatares realistas para contenido y anuncios', text: 'Crea avatares realistas desde cero y dales vida con movimientos, expresiones y una apariencia natural y consistente. También aprenderás a:', bullets: ['Crear vídeos UGC y unboxings de productos.', 'Formato podcast y conversaciones entre avatares.', 'Clonarte para generar contenido sin volver a grabarte cada vez.'], meta: '5 lecciones · aprox. 1 h 10 min' },
  { tag: 'Módulo 7', title: 'Creación avanzada: VFX, realismo y contenido viral', text: 'Aplica la inteligencia artificial a proyectos reales. Transforma cualquier vídeo, imagen o espacio con IA: cambia fondos, crea efectos especiales y escenas cinematográficas, genera contenido profesional para productos y Real Estate y diseña hooks virales para redes.', meta: '17 lecciones · aprox. 5 h 40 min' },
  { tag: 'Módulo 8', title: 'Workflows avanzados con Spaces', text: 'Sistematiza y crea procesos automáticos con IA. Es un módulo opcional para quienes quieran profundizar en esta herramienta.', meta: '3 lecciones · aprox. 2 horas' },
  { tag: 'Módulo 9', title: 'Creación profesional de páginas web con IA', text: 'Crea y diseña una página web moderna y profesional utilizando inteligencia artificial, aunque nunca hayas programado ni diseñado una web.', meta: '1 lección · aprox. 30 min' },
  { tag: 'Bonus', title: 'Agente de IA para guiones virales', text: 'Utiliza nuestro agente para no quedarte nunca sin ideas con potencial viral ni guiones para redes sociales.', meta: '1 lección · aprox. 20 min', hot: true },
]

const curriculum = {
  eyebrow: 'El temario completo',
  heading: 'Esto es exactamente lo que recibes ',
  headingHighlight: 'dentro de AI Mastery.',
  lead: 'No te pedimos que compres a ciegas. Aquí tienes el temario real de la academia, módulo a módulo, con el número de clases y su duración aproximada.',
  sub: 'Mira todo lo que aprenderás antes de pagar y decide sabiendo exactamente dónde estás entrando.',
  badge: '47 lecciones · más de 15 horas · actualizado ago 2026',
  items: items.map((m) => ({ _key: key(), _type: 'module', hot: false, ...m })),
  total: '47 lecciones · más de 15 horas de contenido práctico · 9 módulos + módulo extra + bonus',
  close: 'Un solo pago · acceso inmediato · actualizaciones de por vida',
  cta: { label: 'Quiero entrar en AI Mastery', href: '#precio' },
}

if (DRY) {
  console.log(JSON.stringify(curriculum, null, 2))
  process.exit(0)
}

await client.patch('home').set({ curriculum }).commit()
const check = await client.fetch('*[_id=="home"][0].curriculum.items[].title')
console.log(`Módulos escritos: ${check.length}`)
check.forEach((t, i) => console.log(` ${i + 1}. ${t}`))
