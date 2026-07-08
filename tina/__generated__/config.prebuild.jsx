// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.TINA_BRANCH || process.env.HEAD || process.env.GITHUB_BRANCH || "main";
var ta = { component: "textarea" };
var cta = (name, label) => ({
  type: "object",
  name,
  label,
  fields: [
    { type: "string", name: "label", label: "Texto del bot\xF3n" },
    { type: "string", name: "href", label: "Enlace (URL o #ancla)" }
  ]
});
var stringList = (name, label) => ({
  type: "string",
  name,
  label,
  list: true
});
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_PUBLIC_CLIENT_ID || process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "assets",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "home",
        label: "Landing AI Mastery",
        path: "src/content",
        format: "json",
        match: { include: "home" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          // ---- SEO ----
          { type: "string", name: "seoTitle", label: "SEO \xB7 T\xEDtulo", isTitle: true, required: true },
          { type: "string", name: "seoDescription", label: "SEO \xB7 Descripci\xF3n", ui: ta },
          { type: "string", name: "announcement", label: "Barra superior (aviso)" },
          // ---- Header ----
          {
            type: "object",
            name: "nav",
            label: "Men\xFA (header)",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.label }) },
            fields: [
              { type: "string", name: "label", label: "Texto" },
              { type: "string", name: "href", label: "Enlace" }
            ]
          },
          cta("headerCta", "Bot\xF3n del header"),
          // ---- Hero ----
          {
            type: "object",
            name: "hero",
            label: "Hero (portada)",
            fields: [
              { type: "string", name: "badge", label: "Etiqueta (badge)" },
              { type: "string", name: "h1Line1", label: "T\xEDtulo \xB7 l\xEDnea 1" },
              { type: "string", name: "h1Highlight", label: "T\xEDtulo \xB7 palabra resaltada" },
              { type: "string", name: "h1Line3", label: "T\xEDtulo \xB7 l\xEDnea final" },
              { type: "string", name: "lead", label: "P\xE1rrafo (HTML permitido)", ui: ta },
              cta("ctaPrimary", "Bot\xF3n principal"),
              cta("ctaSecondary", "Bot\xF3n secundario"),
              { type: "image", name: "avatars", label: "Avatares (prueba social)", list: true },
              { type: "string", name: "socialProofCount", label: "N\xBA prueba social" },
              { type: "string", name: "socialProofText", label: "Texto prueba social" },
              { type: "string", name: "videoEmbed", label: "URL del v\xEDdeo (embed)" },
              { type: "string", name: "chipPrice", label: "Chip \xB7 precio" },
              { type: "string", name: "chipPriceUnit", label: "Chip \xB7 unidad" },
              { type: "string", name: "chipNote", label: "Chip \xB7 nota" },
              { type: "string", name: "handNote", label: "Nota manuscrita" }
            ]
          },
          // ---- Marquee ----
          {
            type: "object",
            name: "marquee",
            label: "Marquesina + plataformas",
            fields: [
              stringList("tools", "Herramientas (tachadas)"),
              stringList("phrases", "Frases (doradas)"),
              { type: "string", name: "forLabel", label: 'Etiqueta "Crea para"' },
              stringList("platforms", "Plataformas")
            ]
          },
          // ---- Entradas 01-03 ----
          {
            type: "object",
            name: "entry01",
            label: "Entrada 01 \xB7 La verdad",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "T\xEDtulo (HTML)", ui: ta },
              { type: "string", name: "para1", label: "P\xE1rrafo 1", ui: ta },
              { type: "string", name: "listTools", label: "Lista herramientas (HTML con <br>)", ui: ta },
              { type: "string", name: "para2", label: "P\xE1rrafo 2", ui: ta },
              stringList("cons", "Contras (HTML)"),
              { type: "string", name: "para3", label: "P\xE1rrafo 3", ui: ta },
              { type: "string", name: "question", label: "Pregunta destacada", ui: ta },
              { type: "string", name: "handNote", label: "Nota manuscrita" }
            ]
          },
          {
            type: "object",
            name: "entry02",
            label: "Entrada 02 \xB7 El giro",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "T\xEDtulo" },
              { type: "string", name: "para1", label: "P\xE1rrafo 1", ui: ta },
              { type: "string", name: "para2", label: "P\xE1rrafo 2", ui: ta },
              { type: "string", name: "para3", label: "P\xE1rrafo 3", ui: ta },
              { type: "string", name: "cardALabel", label: "Tarjeta A \xB7 etiqueta" },
              { type: "string", name: "cardAText", label: "Tarjeta A \xB7 texto", ui: ta },
              { type: "string", name: "cardBLabel", label: "Tarjeta B \xB7 etiqueta" },
              { type: "string", name: "cardBText", label: "Tarjeta B \xB7 texto (HTML)", ui: ta },
              { type: "string", name: "para4", label: "Cierre (HTML)", ui: ta },
              { type: "string", name: "handNote", label: "Nota manuscrita" }
            ]
          },
          {
            type: "object",
            name: "entry03",
            label: "Entrada 03 \xB7 Los n\xFAmeros",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "T\xEDtulo" },
              { type: "string", name: "beforeLabel", label: "Antes \xB7 etiqueta" },
              { type: "string", name: "beforeValue", label: "Antes \xB7 valor" },
              { type: "string", name: "beforeUnit", label: "Antes \xB7 unidad" },
              { type: "string", name: "beforeText", label: "Antes \xB7 texto", ui: ta },
              { type: "string", name: "afterBadge", label: "Ahora \xB7 badge" },
              { type: "string", name: "afterLabel", label: "Ahora \xB7 etiqueta" },
              { type: "string", name: "afterValue", label: "Ahora \xB7 valor (n\xBA anima)" },
              { type: "string", name: "afterUnit", label: "Ahora \xB7 unidad" },
              { type: "string", name: "afterText", label: "Ahora \xB7 texto (HTML)", ui: ta },
              { type: "string", name: "closer", label: "Cierre (HTML)", ui: ta }
            ]
          },
          // ---- Programa ----
          {
            type: "object",
            name: "programa",
            label: "El programa (formatos)",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "T\xEDtulo (HTML)", ui: ta },
              { type: "string", name: "lead", label: "Intro", ui: ta },
              {
                type: "object",
                name: "cards",
                label: "Tarjetas de formato",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.title }) },
                fields: [
                  { type: "image", name: "media", label: "Imagen o v\xEDdeo" },
                  { type: "string", name: "type", label: "Tipo", options: ["video", "image"] },
                  { type: "string", name: "badge", label: "Etiqueta sobre media (opcional)" },
                  { type: "string", name: "cornerTag", label: "Sello esquina (opcional, ej. NUEVO)" },
                  { type: "string", name: "title", label: "T\xEDtulo" },
                  { type: "string", name: "text", label: "Texto", ui: ta }
                ]
              },
              {
                type: "object",
                name: "highlight",
                label: "Formato destacado (avatares clonados)",
                fields: [
                  { type: "string", name: "badge", label: "Badge" },
                  { type: "string", name: "title", label: "T\xEDtulo" },
                  { type: "string", name: "text", label: "Texto", ui: ta },
                  { type: "image", name: "media", label: "V\xEDdeo" }
                ]
              }
            ]
          },
          // ---- Clases nuevas ----
          ...["class01", "class02"].map((n, idx) => ({
            type: "object",
            name: n,
            label: `Nueva clase ${idx + 1}`,
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "badge", label: "Sello" },
              { type: "string", name: "heading", label: "T\xEDtulo" },
              { type: "string", name: "lead", label: "Subt\xEDtulo" },
              { type: "string", name: "body", label: "Cuerpo", ui: ta },
              { type: "image", name: "media", label: "V\xEDdeo/imagen" },
              stringList("bullets", "Bullets")
            ]
          })),
          // ---- Métricas ----
          {
            type: "object",
            name: "metrics",
            label: "M\xE9tricas de impacto",
            list: true,
            ui: { itemProps: (i) => ({ label: i?.value }) },
            fields: [
              { type: "string", name: "value", label: "Valor" },
              { type: "string", name: "text", label: "Texto", ui: ta }
            ]
          },
          // ---- Lo que te llevas ----
          {
            type: "object",
            name: "included",
            label: "Lo que te llevas",
            fields: [
              { type: "string", name: "heading", label: "T\xEDtulo" },
              { type: "string", name: "headingHighlight", label: "T\xEDtulo \xB7 resaltado" },
              { type: "string", name: "lead", label: "Intro", ui: ta },
              stringList("items", "\xCDtems (HTML permitido)"),
              { type: "string", name: "highlightItem", label: "\xCDtem destacado" },
              cta("cta", "Bot\xF3n"),
              { type: "string", name: "ctaNote", label: "Nota bajo bot\xF3n" }
            ]
          },
          // ---- Filosofía ----
          {
            type: "object",
            name: "philosophy",
            label: "Filosof\xEDa",
            fields: [
              { type: "string", name: "headingA", label: "T\xEDtulo \xB7 l\xEDnea 1" },
              { type: "string", name: "headingB", label: "T\xEDtulo \xB7 l\xEDnea 2" },
              { type: "string", name: "para1", label: "P\xE1rrafo 1", ui: ta },
              { type: "string", name: "para2", label: "P\xE1rrafo 2", ui: ta },
              { type: "string", name: "para3", label: "P\xE1rrafo 3", ui: ta }
            ]
          },
          // ---- Lo que NO es ----
          {
            type: "object",
            name: "notIs",
            label: "Lo que NO es",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "T\xEDtulo (HTML)" },
              {
                type: "object",
                name: "cards",
                label: "Tarjetas",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.title }) },
                fields: [
                  { type: "string", name: "title", label: "T\xEDtulo" },
                  { type: "string", name: "text", label: "Texto", ui: ta }
                ]
              },
              { type: "string", name: "isText", label: "Lo que S\xCD es (HTML)", ui: ta }
            ]
          },
          // ---- Testimonios ----
          {
            type: "object",
            name: "testimonials",
            label: "Testimonios",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "T\xEDtulo" },
              {
                type: "object",
                name: "screenshots",
                label: "Capturas (DMs)",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.alt }) },
                fields: [
                  { type: "image", name: "src", label: "Imagen" },
                  { type: "string", name: "alt", label: "Alt (SEO)" }
                ]
              },
              { type: "string", name: "sliderNote", label: "Nota del slider" },
              {
                type: "object",
                name: "quotes",
                label: "Testimonios de texto",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.name }) },
                fields: [
                  { type: "string", name: "quote", label: "Cita", ui: ta },
                  { type: "string", name: "initials", label: "Iniciales" },
                  { type: "string", name: "name", label: "Nombre" },
                  { type: "string", name: "role", label: "Rol" }
                ]
              },
              cta("cta", "Bot\xF3n")
            ]
          },
          // ---- Certificado ----
          {
            type: "object",
            name: "certificate",
            label: "Certificado",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "T\xEDtulo" },
              { type: "string", name: "para1", label: "P\xE1rrafo 1", ui: ta },
              { type: "string", name: "para2", label: "P\xE1rrafo 2 (HTML)", ui: ta },
              { type: "string", name: "para3", label: "P\xE1rrafo 3 (HTML)", ui: ta },
              { type: "string", name: "cardBody", label: "Texto del certificado (HTML)", ui: ta },
              { type: "string", name: "founderName", label: "Firma \xB7 nombre" },
              { type: "string", name: "founderRole", label: "Firma \xB7 rol" }
            ]
          },
          // ---- Fundador ----
          {
            type: "object",
            name: "founder",
            label: "Qui\xE9n est\xE1 detr\xE1s",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "T\xEDtulo" },
              { type: "image", name: "image", label: "Foto" },
              { type: "string", name: "imageAlt", label: "Alt de la foto" },
              { type: "string", name: "para1", label: "P\xE1rrafo 1 (HTML)", ui: ta },
              { type: "string", name: "para2", label: "P\xE1rrafo 2 (HTML)", ui: ta },
              { type: "string", name: "handNote", label: "Nota manuscrita" }
            ]
          },
          // ---- Precio ----
          {
            type: "object",
            name: "pricing",
            label: "Precio (order box)",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "T\xEDtulo" },
              { type: "string", name: "headingHighlight", label: "T\xEDtulo \xB7 resaltado" },
              { type: "string", name: "lead", label: "Intro", ui: ta },
              { type: "string", name: "includesTitle", label: 'T\xEDtulo de "Todo lo que te llevas"' },
              stringList("includes", "Incluye (HTML)"),
              { type: "string", name: "bonusTitle", label: "T\xEDtulo bonus" },
              stringList("bonuses", "Bonus (HTML)"),
              { type: "string", name: "totalValueLabel", label: "Etiqueta valor total" },
              { type: "string", name: "totalValue", label: "Valor total" },
              { type: "image", name: "boxImage", label: "Imagen del order box" },
              { type: "string", name: "boxImageAlt", label: "Alt imagen" },
              { type: "string", name: "boxTitle", label: "T\xEDtulo order box" },
              { type: "string", name: "discountBadge", label: "Badge descuento" },
              { type: "string", name: "anchorLabel", label: "Etiqueta precio anclaje" },
              { type: "string", name: "anchorPrice", label: "Precio anclaje (tachado)" },
              { type: "string", name: "price", label: "PRECIO" },
              { type: "string", name: "priceNote", label: "Nota precio (HTML con <br>)" },
              { type: "string", name: "priceSub", label: "Subtexto precio", ui: ta },
              cta("cta", "Bot\xF3n de compra"),
              { type: "string", name: "guaranteeNote", label: "Nota garant\xEDa" },
              stringList("boxBullets", "Bullets del box"),
              { type: "string", name: "boxFooter", label: "Pie del box (HTML)", ui: ta }
            ]
          },
          // ---- Garantía ----
          {
            type: "object",
            name: "guarantee",
            label: "Garant\xEDa",
            fields: [
              { type: "string", name: "days", label: "D\xEDas (n\xBA)" },
              { type: "string", name: "daysLabel", label: "Etiqueta d\xEDas" },
              { type: "string", name: "heading", label: "T\xEDtulo" },
              { type: "string", name: "para1", label: "P\xE1rrafo 1 (HTML)", ui: ta },
              { type: "string", name: "para2", label: "P\xE1rrafo 2", ui: ta }
            ]
          },
          // ---- FAQ ----
          {
            type: "object",
            name: "faq",
            label: "FAQ",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "T\xEDtulo" },
              {
                type: "object",
                name: "items",
                label: "Preguntas",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.q }) },
                fields: [
                  { type: "string", name: "q", label: "Pregunta" },
                  { type: "string", name: "a", label: "Respuesta", ui: ta }
                ]
              }
            ]
          },
          // ---- Cierre ----
          {
            type: "object",
            name: "closing",
            label: "Cierre",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "T\xEDtulo (HTML con <br>)" },
              { type: "string", name: "body", label: "Cuerpo", ui: ta },
              { type: "string", name: "handNote", label: "Nota manuscrita" },
              cta("cta", "Bot\xF3n"),
              { type: "string", name: "note", label: "Nota bajo bot\xF3n" }
            ]
          },
          // ---- Footer ----
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "string", name: "brandSuffix", label: "Sufijo de marca" },
              {
                type: "object",
                name: "links",
                label: "Enlaces",
                list: true,
                ui: { itemProps: (i) => ({ label: i?.label }) },
                fields: [
                  { type: "string", name: "label", label: "Texto" },
                  { type: "string", name: "href", label: "Enlace" }
                ]
              },
              { type: "string", name: "copyright", label: "Copyright" }
            ]
          },
          // ---- Sticky bar móvil ----
          {
            type: "object",
            name: "stickyBar",
            label: "Barra fija m\xF3vil",
            fields: [
              { type: "string", name: "price", label: "Precio" },
              { type: "string", name: "anchorPrice", label: "Precio tachado" },
              { type: "string", name: "note", label: "Nota" },
              cta("cta", "Bot\xF3n")
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
