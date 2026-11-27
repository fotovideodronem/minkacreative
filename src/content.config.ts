import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content Collections — Minka Creative (Astro v7+).
 * Každý projekt = jeden Markdown soubor v src/content/projects/.
 * Obrázky odkazovány relativní cestou; Astro je zpracuje přes astro:assets.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{mdoc,yaml}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string().optional(),
      showClientName: z.boolean().default(false),
      relationship: z.enum(['direct', 'subcontract', 'brokered']).default('direct'),
      year: z.number().optional(),
      location: z.string().optional(),
      region: z.string().optional(),

      // Kategorie a služby
      categories: z
        .array(
          z.enum(['firmy', 'stavby', 'architektura', 'obce-turismus', 'eventy', 'plesy'])
        )
        .default([]),
      services: z.array(z.enum(['foto', 'video', 'dron'])).default([]),

      // Souhrn, zadání a výsledek
      summary: z.string(),
      brief: z.string().optional(),
      result: z.string().optional(),

      // Obrázky — zpracovány přes astro:assets
      cover: image(),
      coverAlt: z.string(),
      gallery: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
            caption: z.string().optional(),
          })
        )
        .default([]),

      // Video
      videoUrl: z.string().optional(),
      videoPoster: image().optional(),
      videoPosterAlt: z.string().optional(),
      videoTitle: z.string().optional(),
      videoDuration: z.string().optional(),

      // Citát klienta
      testimonial: z
        .object({
          quote: z.string(),
          author: z.string(),
          company: z.string().optional(),
          published: z.boolean().default(true),
        })
        .optional(),

      // Portfolio
      featured: z.boolean().default(false),
      order: z.number().default(99),

      // SEO
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
    }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/testimonials' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    company: z.string().optional(),
    quote: z.string(),
    projectHref: z.string().optional(),
    published: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/faqs' }),
  schema: z.object({
    title: z.string(),
    question: z.string(),
    answer: z.string(),
    order: z.number().default(99),
  }),
});

const pageCopy = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/page-copy' }),
  schema: z.object({
    pageKey: z.string(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
    lead: z.string().optional(),
    summary: z.string().optional(),
    summaryText: z.string().optional(),
  }),
});

export const collections = { projects, testimonials, faqs, pageCopy };
