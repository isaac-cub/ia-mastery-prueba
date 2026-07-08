import { defineConfig } from 'tinacms';

// Tina Cloud creds (set as env vars on Netlify for browser editing at /admin).
// Local `tinacms dev` works WITHOUT these.
const branch =
  process.env.TINA_BRANCH ||
  process.env.HEAD ||
  process.env.GITHUB_BRANCH ||
  'main';

const ta = { component: 'textarea' } as const;

const cta = (name: string, label: string) => ({
  type: 'object' as const,
  name,
  label,
  fields: [
    { type: 'string' as const, name: 'label', label: 'Texto del botón' },
    { type: 'string' as const, name: 'href', label: 'Enlace (URL o #ancla)' },
  ],
});

const stringList = (name: string, label: string) => ({
  type: 'string' as const,
  name,
  label,
  list: true,
});

export default defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'assets',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'home',
        label: 'Landing AI Mastery',
        path: 'src/content',
        format: 'json',
        match: { include: 'home' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          // ---- SEO ----
          { type: 'string', name: 'seoTitle', label: 'SEO · Título', isTitle: true, required: true },
          { type: 'string', name: 'seoDescription', label: 'SEO · Descripción', ui: ta },
          { type: 'string', name: 'announcement', label: 'Barra superior (aviso)' },

          // ---- Header ----
          {
            type: 'object', name: 'nav', label: 'Menú (header)', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.label }) },
            fields: [
              { type: 'string', name: 'label', label: 'Texto' },
              { type: 'string', name: 'href', label: 'Enlace' },
            ],
          },
          cta('headerCta', 'Botón del header'),

          // ---- Hero ----
          {
            type: 'object', name: 'hero', label: 'Hero (portada)',
            fields: [
              { type: 'string', name: 'badge', label: 'Etiqueta (badge)' },
              { type: 'string', name: 'h1Line1', label: 'Título · línea 1' },
              { type: 'string', name: 'h1Highlight', label: 'Título · palabra resaltada' },
              { type: 'string', name: 'h1Line3', label: 'Título · línea final' },
              { type: 'string', name: 'lead', label: 'Párrafo (HTML permitido)', ui: ta },
              cta('ctaPrimary', 'Botón principal'),
              cta('ctaSecondary', 'Botón secundario'),
              { type: 'image', name: 'avatars', label: 'Avatares (prueba social)', list: true },
              { type: 'string', name: 'socialProofCount', label: 'Nº prueba social' },
              { type: 'string', name: 'socialProofText', label: 'Texto prueba social' },
              { type: 'string', name: 'videoEmbed', label: 'URL del vídeo (embed)' },
              { type: 'string', name: 'chipPrice', label: 'Chip · precio' },
              { type: 'string', name: 'chipPriceUnit', label: 'Chip · unidad' },
              { type: 'string', name: 'chipNote', label: 'Chip · nota' },
              { type: 'string', name: 'handNote', label: 'Nota manuscrita' },
            ],
          },

          // ---- Marquee ----
          {
            type: 'object', name: 'marquee', label: 'Marquesina + plataformas',
            fields: [
              stringList('tools', 'Herramientas (tachadas)'),
              stringList('phrases', 'Frases (doradas)'),
              { type: 'string', name: 'forLabel', label: 'Etiqueta "Crea para"' },
              stringList('platforms', 'Plataformas'),
            ],
          },

          // ---- Entradas 01-03 ----
          {
            type: 'object', name: 'entry01', label: 'Entrada 01 · La verdad',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Título (HTML)', ui: ta },
              { type: 'string', name: 'para1', label: 'Párrafo 1', ui: ta },
              { type: 'string', name: 'listTools', label: 'Lista herramientas (HTML con <br>)', ui: ta },
              { type: 'string', name: 'para2', label: 'Párrafo 2', ui: ta },
              stringList('cons', 'Contras (HTML)'),
              { type: 'string', name: 'para3', label: 'Párrafo 3', ui: ta },
              { type: 'string', name: 'question', label: 'Pregunta destacada', ui: ta },
              { type: 'string', name: 'handNote', label: 'Nota manuscrita' },
            ],
          },
          {
            type: 'object', name: 'entry02', label: 'Entrada 02 · El giro',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Título' },
              { type: 'string', name: 'para1', label: 'Párrafo 1', ui: ta },
              { type: 'string', name: 'para2', label: 'Párrafo 2', ui: ta },
              { type: 'string', name: 'para3', label: 'Párrafo 3', ui: ta },
              { type: 'string', name: 'cardALabel', label: 'Tarjeta A · etiqueta' },
              { type: 'string', name: 'cardAText', label: 'Tarjeta A · texto', ui: ta },
              { type: 'string', name: 'cardBLabel', label: 'Tarjeta B · etiqueta' },
              { type: 'string', name: 'cardBText', label: 'Tarjeta B · texto (HTML)', ui: ta },
              { type: 'string', name: 'para4', label: 'Cierre (HTML)', ui: ta },
              { type: 'string', name: 'handNote', label: 'Nota manuscrita' },
            ],
          },
          {
            type: 'object', name: 'entry03', label: 'Entrada 03 · Los números',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Título' },
              { type: 'string', name: 'beforeLabel', label: 'Antes · etiqueta' },
              { type: 'string', name: 'beforeValue', label: 'Antes · valor' },
              { type: 'string', name: 'beforeUnit', label: 'Antes · unidad' },
              { type: 'string', name: 'beforeText', label: 'Antes · texto', ui: ta },
              { type: 'string', name: 'afterBadge', label: 'Ahora · badge' },
              { type: 'string', name: 'afterLabel', label: 'Ahora · etiqueta' },
              { type: 'string', name: 'afterValue', label: 'Ahora · valor (nº anima)' },
              { type: 'string', name: 'afterUnit', label: 'Ahora · unidad' },
              { type: 'string', name: 'afterText', label: 'Ahora · texto (HTML)', ui: ta },
              { type: 'string', name: 'closer', label: 'Cierre (HTML)', ui: ta },
            ],
          },

          // ---- Programa ----
          {
            type: 'object', name: 'programa', label: 'El programa (formatos)',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Título (HTML)', ui: ta },
              { type: 'string', name: 'lead', label: 'Intro', ui: ta },
              {
                type: 'object', name: 'cards', label: 'Tarjetas de formato', list: true,
                ui: { itemProps: (i: any) => ({ label: i?.title }) },
                fields: [
                  { type: 'image', name: 'media', label: 'Imagen o vídeo' },
                  { type: 'string', name: 'type', label: 'Tipo', options: ['video', 'image'] },
                  { type: 'string', name: 'badge', label: 'Etiqueta sobre media (opcional)' },
                  { type: 'string', name: 'cornerTag', label: 'Sello esquina (opcional, ej. NUEVO)' },
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'text', label: 'Texto', ui: ta },
                ],
              },
              {
                type: 'object', name: 'highlight', label: 'Formato destacado (avatares clonados)',
                fields: [
                  { type: 'string', name: 'badge', label: 'Badge' },
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'text', label: 'Texto', ui: ta },
                  { type: 'image', name: 'media', label: 'Vídeo' },
                ],
              },
            ],
          },

          // ---- Clases nuevas ----
          ...(['class01', 'class02'].map((n, idx) => ({
            type: 'object' as const, name: n, label: `Nueva clase ${idx + 1}`,
            fields: [
              { type: 'string' as const, name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string' as const, name: 'badge', label: 'Sello' },
              { type: 'string' as const, name: 'heading', label: 'Título' },
              { type: 'string' as const, name: 'lead', label: 'Subtítulo' },
              { type: 'string' as const, name: 'body', label: 'Cuerpo', ui: ta },
              { type: 'image' as const, name: 'media', label: 'Vídeo/imagen' },
              stringList('bullets', 'Bullets'),
            ],
          }))),

          // ---- Métricas ----
          {
            type: 'object', name: 'metrics', label: 'Métricas de impacto', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.value }) },
            fields: [
              { type: 'string', name: 'value', label: 'Valor' },
              { type: 'string', name: 'text', label: 'Texto', ui: ta },
            ],
          },

          // ---- Lo que te llevas ----
          {
            type: 'object', name: 'included', label: 'Lo que te llevas',
            fields: [
              { type: 'string', name: 'heading', label: 'Título' },
              { type: 'string', name: 'headingHighlight', label: 'Título · resaltado' },
              { type: 'string', name: 'lead', label: 'Intro', ui: ta },
              stringList('items', 'Ítems (HTML permitido)'),
              { type: 'string', name: 'highlightItem', label: 'Ítem destacado' },
              cta('cta', 'Botón'),
              { type: 'string', name: 'ctaNote', label: 'Nota bajo botón' },
            ],
          },

          // ---- Filosofía ----
          {
            type: 'object', name: 'philosophy', label: 'Filosofía',
            fields: [
              { type: 'string', name: 'headingA', label: 'Título · línea 1' },
              { type: 'string', name: 'headingB', label: 'Título · línea 2' },
              { type: 'string', name: 'para1', label: 'Párrafo 1', ui: ta },
              { type: 'string', name: 'para2', label: 'Párrafo 2', ui: ta },
              { type: 'string', name: 'para3', label: 'Párrafo 3', ui: ta },
            ],
          },

          // ---- Lo que NO es ----
          {
            type: 'object', name: 'notIs', label: 'Lo que NO es',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Título (HTML)' },
              {
                type: 'object', name: 'cards', label: 'Tarjetas', list: true,
                ui: { itemProps: (i: any) => ({ label: i?.title }) },
                fields: [
                  { type: 'string', name: 'title', label: 'Título' },
                  { type: 'string', name: 'text', label: 'Texto', ui: ta },
                ],
              },
              { type: 'string', name: 'isText', label: 'Lo que SÍ es (HTML)', ui: ta },
            ],
          },

          // ---- Testimonios ----
          {
            type: 'object', name: 'testimonials', label: 'Testimonios',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Título' },
              {
                type: 'object', name: 'screenshots', label: 'Capturas (DMs)', list: true,
                ui: { itemProps: (i: any) => ({ label: i?.alt }) },
                fields: [
                  { type: 'image', name: 'src', label: 'Imagen' },
                  { type: 'string', name: 'alt', label: 'Alt (SEO)' },
                ],
              },
              { type: 'string', name: 'sliderNote', label: 'Nota del slider' },
              {
                type: 'object', name: 'quotes', label: 'Testimonios de texto', list: true,
                ui: { itemProps: (i: any) => ({ label: i?.name }) },
                fields: [
                  { type: 'string', name: 'quote', label: 'Cita', ui: ta },
                  { type: 'string', name: 'initials', label: 'Iniciales' },
                  { type: 'string', name: 'name', label: 'Nombre' },
                  { type: 'string', name: 'role', label: 'Rol' },
                ],
              },
              cta('cta', 'Botón'),
            ],
          },

          // ---- Certificado ----
          {
            type: 'object', name: 'certificate', label: 'Certificado',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Título' },
              { type: 'string', name: 'para1', label: 'Párrafo 1', ui: ta },
              { type: 'string', name: 'para2', label: 'Párrafo 2 (HTML)', ui: ta },
              { type: 'string', name: 'para3', label: 'Párrafo 3 (HTML)', ui: ta },
              { type: 'string', name: 'cardBody', label: 'Texto del certificado (HTML)', ui: ta },
              { type: 'string', name: 'founderName', label: 'Firma · nombre' },
              { type: 'string', name: 'founderRole', label: 'Firma · rol' },
            ],
          },

          // ---- Fundador ----
          {
            type: 'object', name: 'founder', label: 'Quién está detrás',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Título' },
              { type: 'image', name: 'image', label: 'Foto' },
              { type: 'string', name: 'imageAlt', label: 'Alt de la foto' },
              { type: 'string', name: 'para1', label: 'Párrafo 1 (HTML)', ui: ta },
              { type: 'string', name: 'para2', label: 'Párrafo 2 (HTML)', ui: ta },
              { type: 'string', name: 'handNote', label: 'Nota manuscrita' },
            ],
          },

          // ---- Precio ----
          {
            type: 'object', name: 'pricing', label: 'Precio (order box)',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Título' },
              { type: 'string', name: 'headingHighlight', label: 'Título · resaltado' },
              { type: 'string', name: 'lead', label: 'Intro', ui: ta },
              { type: 'string', name: 'includesTitle', label: 'Título de "Todo lo que te llevas"' },
              stringList('includes', 'Incluye (HTML)'),
              { type: 'string', name: 'bonusTitle', label: 'Título bonus' },
              stringList('bonuses', 'Bonus (HTML)'),
              { type: 'string', name: 'totalValueLabel', label: 'Etiqueta valor total' },
              { type: 'string', name: 'totalValue', label: 'Valor total' },
              { type: 'image', name: 'boxImage', label: 'Imagen del order box' },
              { type: 'string', name: 'boxImageAlt', label: 'Alt imagen' },
              { type: 'string', name: 'boxTitle', label: 'Título order box' },
              { type: 'string', name: 'discountBadge', label: 'Badge descuento' },
              { type: 'string', name: 'anchorLabel', label: 'Etiqueta precio anclaje' },
              { type: 'string', name: 'anchorPrice', label: 'Precio anclaje (tachado)' },
              { type: 'string', name: 'price', label: 'PRECIO' },
              { type: 'string', name: 'priceNote', label: 'Nota precio (HTML con <br>)' },
              { type: 'string', name: 'priceSub', label: 'Subtexto precio', ui: ta },
              cta('cta', 'Botón de compra'),
              { type: 'string', name: 'guaranteeNote', label: 'Nota garantía' },
              stringList('boxBullets', 'Bullets del box'),
              { type: 'string', name: 'boxFooter', label: 'Pie del box (HTML)', ui: ta },
            ],
          },

          // ---- Garantía ----
          {
            type: 'object', name: 'guarantee', label: 'Garantía',
            fields: [
              { type: 'string', name: 'days', label: 'Días (nº)' },
              { type: 'string', name: 'daysLabel', label: 'Etiqueta días' },
              { type: 'string', name: 'heading', label: 'Título' },
              { type: 'string', name: 'para1', label: 'Párrafo 1 (HTML)', ui: ta },
              { type: 'string', name: 'para2', label: 'Párrafo 2', ui: ta },
            ],
          },

          // ---- FAQ ----
          {
            type: 'object', name: 'faq', label: 'FAQ',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Título' },
              {
                type: 'object', name: 'items', label: 'Preguntas', list: true,
                ui: { itemProps: (i: any) => ({ label: i?.q }) },
                fields: [
                  { type: 'string', name: 'q', label: 'Pregunta' },
                  { type: 'string', name: 'a', label: 'Respuesta', ui: ta },
                ],
              },
            ],
          },

          // ---- Cierre ----
          {
            type: 'object', name: 'closing', label: 'Cierre',
            fields: [
              { type: 'string', name: 'eyebrow', label: 'Eyebrow' },
              { type: 'string', name: 'heading', label: 'Título (HTML con <br>)' },
              { type: 'string', name: 'body', label: 'Cuerpo', ui: ta },
              { type: 'string', name: 'handNote', label: 'Nota manuscrita' },
              cta('cta', 'Botón'),
              { type: 'string', name: 'note', label: 'Nota bajo botón' },
            ],
          },

          // ---- Footer ----
          {
            type: 'object', name: 'footer', label: 'Footer',
            fields: [
              { type: 'string', name: 'brandSuffix', label: 'Sufijo de marca' },
              {
                type: 'object', name: 'links', label: 'Enlaces', list: true,
                ui: { itemProps: (i: any) => ({ label: i?.label }) },
                fields: [
                  { type: 'string', name: 'label', label: 'Texto' },
                  { type: 'string', name: 'href', label: 'Enlace' },
                ],
              },
              { type: 'string', name: 'copyright', label: 'Copyright' },
            ],
          },

          // ---- Sticky bar móvil ----
          {
            type: 'object', name: 'stickyBar', label: 'Barra fija móvil',
            fields: [
              { type: 'string', name: 'price', label: 'Precio' },
              { type: 'string', name: 'anchorPrice', label: 'Precio tachado' },
              { type: 'string', name: 'note', label: 'Nota' },
              cta('cta', 'Botón'),
            ],
          },
        ],
      },
    ],
  },
});
