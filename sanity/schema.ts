import { defineType, defineField, defineArrayMember } from 'sanity'

// Helpers ---------------------------------------------------------------
const S = (name: string, title: string, extra: Record<string, any> = {}) =>
  defineField({ name, title, type: 'string', ...extra })

const T = (name: string, title: string, extra: Record<string, any> = {}) =>
  defineField({ name, title, type: 'text', rows: 3, ...extra })

// Lista de strings
const SL = (name: string, title: string) =>
  defineField({ name, title, type: 'array', of: [{ type: 'string' }] })

// Imagen guardada como ruta a /assets (no asset de Sanity, para no romper el build)
const IMG = (name: string, title: string) =>
  defineField({ name, title, type: 'string', description: 'Ruta del archivo, ej. /assets/foto.jpg' })

// Botón / enlace {label, href}
const CTA = (name: string, title: string) =>
  defineField({
    name, title, type: 'object',
    options: { collapsible: true, collapsed: false },
    fields: [S('label', 'Texto del botón'), S('href', 'Enlace (URL o #ancla)')],
  })

// Objeto colapsable de sección
const section = (name: string, title: string, fields: any[]) =>
  defineField({ name, title, type: 'object', options: { collapsible: true, collapsed: true }, fields })

// -----------------------------------------------------------------------
export const homeType = defineType({
  name: 'home',
  title: 'Landing AI Mastery',
  type: 'document',
  fields: [
    // SEO
    S('seoTitle', 'SEO · Título', { validation: (r: any) => r.required() }),
    T('seoDescription', 'SEO · Descripción'),
    S('announcement', 'Barra superior (aviso)'),

    // Header
    defineField({
      name: 'nav', title: 'Menú (header)', type: 'array',
      of: [defineArrayMember({
        type: 'object', name: 'navItem',
        fields: [S('label', 'Texto'), S('href', 'Enlace')],
        preview: { select: { title: 'label', subtitle: 'href' } },
      })],
    }),
    CTA('headerCta', 'Botón del header'),

    // Hero
    section('hero', 'Hero (portada)', [
      S('badge', 'Etiqueta (badge)'),
      S('h1Line1', 'Título · línea 1'),
      S('h1Highlight', 'Título · palabra resaltada'),
      S('h1Line3', 'Título · línea final'),
      T('lead', 'Párrafo (HTML permitido)'),
      CTA('ctaPrimary', 'Botón principal'),
      CTA('ctaSecondary', 'Botón secundario'),
      SL('avatars', 'Avatares (rutas de imagen)'),
      S('socialProofCount', 'Nº prueba social'),
      S('socialProofText', 'Texto prueba social'),
      S('videoEmbed', 'URL del vídeo (embed)'),
      S('chipPrice', 'Chip · precio'),
      S('chipPriceUnit', 'Chip · unidad'),
      S('chipNote', 'Chip · nota'),
      S('handNote', 'Nota manuscrita'),
    ]),

    // Marquee
    section('marquee', 'Marquesina + plataformas', [
      SL('tools', 'Herramientas (tachadas)'),
      SL('phrases', 'Frases (doradas)'),
      S('forLabel', 'Etiqueta "Crea para"'),
      SL('platforms', 'Plataformas'),
    ]),

    // Entrada 01
    section('entry01', 'Entrada 01 · La verdad', [
      S('eyebrow', 'Eyebrow'),
      T('heading', 'Título (HTML)'),
      T('para1', 'Párrafo 1'),
      T('listTools', 'Lista herramientas (HTML con <br>)'),
      T('para2', 'Párrafo 2'),
      SL('cons', 'Contras (HTML)'),
      T('para3', 'Párrafo 3'),
      T('question', 'Pregunta destacada'),
      S('handNote', 'Nota manuscrita'),
    ]),

    // Entrada 02
    section('entry02', 'Entrada 02 · El giro', [
      S('eyebrow', 'Eyebrow'),
      S('heading', 'Título'),
      T('para1', 'Párrafo 1'),
      T('para2', 'Párrafo 2'),
      T('para3', 'Párrafo 3'),
      S('cardALabel', 'Tarjeta A · etiqueta'),
      T('cardAText', 'Tarjeta A · texto'),
      S('cardBLabel', 'Tarjeta B · etiqueta'),
      T('cardBText', 'Tarjeta B · texto (HTML)'),
      T('para4', 'Cierre (HTML)'),
      S('handNote', 'Nota manuscrita'),
    ]),

    // Entrada 03
    section('entry03', 'Entrada 03 · Los números', [
      S('eyebrow', 'Eyebrow'),
      S('heading', 'Título'),
      S('beforeLabel', 'Antes · etiqueta'),
      S('beforeValue', 'Antes · valor'),
      S('beforeUnit', 'Antes · unidad'),
      T('beforeText', 'Antes · texto'),
      S('afterBadge', 'Ahora · badge'),
      S('afterLabel', 'Ahora · etiqueta'),
      S('afterValue', 'Ahora · valor (nº anima)'),
      S('afterUnit', 'Ahora · unidad'),
      T('afterText', 'Ahora · texto (HTML)'),
      T('closer', 'Cierre (HTML)'),
    ]),

    // Programa
    section('programa', 'El programa (formatos)', [
      S('eyebrow', 'Eyebrow'),
      T('heading', 'Título (HTML)'),
      T('lead', 'Intro'),
      defineField({
        name: 'cards', title: 'Tarjetas de formato', type: 'array',
        of: [defineArrayMember({
          type: 'object', name: 'formatCard',
          fields: [
            IMG('media', 'Imagen o vídeo'),
            S('type', 'Tipo', { options: { list: ['video', 'image'] } }),
            S('badge', 'Etiqueta sobre media (opcional)'),
            S('cornerTag', 'Sello esquina (opcional, ej. NUEVO)'),
            S('title', 'Título'),
            T('text', 'Texto'),
          ],
          preview: { select: { title: 'title', subtitle: 'type' } },
        })],
      }),
      section('highlight', 'Formato destacado (avatares clonados)', [
        S('badge', 'Badge'),
        S('title', 'Título'),
        T('text', 'Texto'),
        IMG('media', 'Vídeo'),
      ]),
    ]),

    // Nuevas clases
    section('class01', 'Nueva clase 1', [
      S('eyebrow', 'Eyebrow'), S('badge', 'Sello'), S('heading', 'Título'),
      S('lead', 'Subtítulo'), T('body', 'Cuerpo'), IMG('media', 'Vídeo/imagen'),
      SL('bullets', 'Bullets'),
    ]),
    section('class02', 'Nueva clase 2', [
      S('eyebrow', 'Eyebrow'), S('badge', 'Sello'), S('heading', 'Título'),
      S('lead', 'Subtítulo'), T('body', 'Cuerpo'), IMG('media', 'Vídeo/imagen'),
      SL('bullets', 'Bullets'),
    ]),

    // Métricas
    defineField({
      name: 'metrics', title: 'Métricas de impacto', type: 'array',
      of: [defineArrayMember({
        type: 'object', name: 'metric',
        fields: [S('value', 'Valor'), T('text', 'Texto')],
        preview: { select: { title: 'value', subtitle: 'text' } },
      })],
    }),

    // Lo que te llevas
    section('included', 'Lo que te llevas', [
      S('heading', 'Título'),
      S('headingHighlight', 'Título · resaltado'),
      T('lead', 'Intro'),
      SL('items', 'Ítems (HTML permitido)'),
      S('highlightItem', 'Ítem destacado'),
      CTA('cta', 'Botón'),
      S('ctaNote', 'Nota bajo botón'),
    ]),

    // Filosofía
    section('philosophy', 'Filosofía', [
      S('headingA', 'Título · línea 1'),
      S('headingB', 'Título · línea 2'),
      T('para1', 'Párrafo 1'), T('para2', 'Párrafo 2'), T('para3', 'Párrafo 3'),
    ]),

    // Lo que NO es
    section('notIs', 'Lo que NO es', [
      S('eyebrow', 'Eyebrow'),
      S('heading', 'Título (HTML)'),
      defineField({
        name: 'cards', title: 'Tarjetas', type: 'array',
        of: [defineArrayMember({
          type: 'object', name: 'notIsCard',
          fields: [S('title', 'Título'), T('text', 'Texto')],
          preview: { select: { title: 'title' } },
        })],
      }),
      T('isText', 'Lo que SÍ es (HTML)'),
    ]),

    // Testimonios
    section('testimonials', 'Testimonios', [
      S('eyebrow', 'Eyebrow'),
      S('heading', 'Título'),
      defineField({
        name: 'screenshots', title: 'Capturas (DMs)', type: 'array',
        of: [defineArrayMember({
          type: 'object', name: 'screenshot',
          fields: [IMG('src', 'Imagen'), S('alt', 'Alt (SEO)')],
          preview: { select: { title: 'alt', subtitle: 'src' } },
        })],
      }),
      S('sliderNote', 'Nota del slider'),
      defineField({
        name: 'quotes', title: 'Testimonios de texto', type: 'array',
        of: [defineArrayMember({
          type: 'object', name: 'quote',
          fields: [T('quote', 'Cita'), S('initials', 'Iniciales'), S('name', 'Nombre'), S('role', 'Rol')],
          preview: { select: { title: 'name', subtitle: 'role' } },
        })],
      }),
      CTA('cta', 'Botón'),
    ]),

    // Certificado
    section('certificate', 'Certificado', [
      S('eyebrow', 'Eyebrow'), S('heading', 'Título'),
      T('para1', 'Párrafo 1'), T('para2', 'Párrafo 2 (HTML)'), T('para3', 'Párrafo 3 (HTML)'),
      T('cardBody', 'Texto del certificado (HTML)'),
      S('founderName', 'Firma · nombre'), S('founderRole', 'Firma · rol'),
    ]),

    // Fundador
    section('founder', 'Quién está detrás', [
      S('eyebrow', 'Eyebrow'), S('heading', 'Título'),
      IMG('image', 'Foto'), S('imageAlt', 'Alt de la foto'),
      T('para1', 'Párrafo 1 (HTML)'), T('para2', 'Párrafo 2 (HTML)'),
      S('handNote', 'Nota manuscrita'),
    ]),

    // Precio
    section('pricing', 'Precio (order box)', [
      S('eyebrow', 'Eyebrow'), S('heading', 'Título'), S('headingHighlight', 'Título · resaltado'),
      T('lead', 'Intro'),
      S('includesTitle', 'Título de "Todo lo que te llevas"'),
      SL('includes', 'Incluye (HTML)'),
      S('bonusTitle', 'Título bonus'),
      SL('bonuses', 'Bonus (HTML)'),
      S('totalValueLabel', 'Etiqueta valor total'), S('totalValue', 'Valor total'),
      IMG('boxImage', 'Imagen del order box'), S('boxImageAlt', 'Alt imagen'),
      S('boxTitle', 'Título order box'), S('discountBadge', 'Badge descuento'),
      S('anchorLabel', 'Etiqueta precio anclaje'), S('anchorPrice', 'Precio anclaje (tachado)'),
      S('price', 'PRECIO'),
      S('priceNote', 'Nota precio (HTML con <br>)'),
      T('priceSub', 'Subtexto precio'),
      CTA('cta', 'Botón de compra'),
      S('guaranteeNote', 'Nota garantía'),
      SL('boxBullets', 'Bullets del box'),
      T('boxFooter', 'Pie del box (HTML)'),
    ]),

    // Garantía
    section('guarantee', 'Garantía', [
      S('days', 'Días (nº)'), S('daysLabel', 'Etiqueta días'), S('heading', 'Título'),
      T('para1', 'Párrafo 1 (HTML)'), T('para2', 'Párrafo 2'),
    ]),

    // FAQ
    section('faq', 'FAQ', [
      S('eyebrow', 'Eyebrow'), S('heading', 'Título'),
      defineField({
        name: 'items', title: 'Preguntas', type: 'array',
        of: [defineArrayMember({
          type: 'object', name: 'faqItem',
          fields: [S('q', 'Pregunta'), T('a', 'Respuesta')],
          preview: { select: { title: 'q' } },
        })],
      }),
    ]),

    // Cierre
    section('closing', 'Cierre', [
      S('eyebrow', 'Eyebrow'),
      S('heading', 'Título (HTML con <br>)'),
      T('body', 'Cuerpo'),
      S('handNote', 'Nota manuscrita'),
      CTA('cta', 'Botón'),
      S('note', 'Nota bajo botón'),
    ]),

    // Footer
    section('footer', 'Footer', [
      S('brandSuffix', 'Sufijo de marca'),
      defineField({
        name: 'links', title: 'Enlaces', type: 'array',
        of: [defineArrayMember({
          type: 'object', name: 'footerLink',
          fields: [S('label', 'Texto'), S('href', 'Enlace')],
          preview: { select: { title: 'label', subtitle: 'href' } },
        })],
      }),
      S('copyright', 'Copyright'),
    ]),

    // Sticky bar móvil
    section('stickyBar', 'Barra fija móvil', [
      S('price', 'Precio'), S('anchorPrice', 'Precio tachado'), S('note', 'Nota'),
      CTA('cta', 'Botón'),
    ]),
  ],
  preview: { select: { title: 'seoTitle' } },
})

export const schemaTypes = [homeType]
