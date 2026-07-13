import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from 'sanity:client'

const builder = createImageUrlBuilder(sanityClient)

// Devuelve la URL del CDN de Sanity para una imagen del documento.
// Tolera valores vacíos (campo sin rellenar) y rutas antiguas tipo "/assets/foto.jpg".
export function img(source: any, width?: number): string | undefined {
  if (!source) return undefined
  if (typeof source === 'string') return source
  if (!source.asset?._ref) return undefined
  const b = builder.image(source).auto('format').fit('max')
  return (width ? b.width(width) : b).url()
}
