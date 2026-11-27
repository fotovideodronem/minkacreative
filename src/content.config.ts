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

      // Library references are preferred; direct image paths remain for existing entries.
      coverMedia: z.string().nullish(),
      galleryMedia: z.array(z.string()).default([]),
      videoMedia: z.string().nullish(),
      cover: image().nullish(),
      coverAlt: z.string().nullish(),
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
      videoUrl: z.string().nullish(),
      videoPoster: image().nullish(),
      videoPosterAlt: z.string().nullish(),
      videoTitle: z.string().nullish(),
      videoDuration: z.string().nullish(),

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

const media = defineCollection({
    loader: glob({ pattern: '**/*.yaml', base: './src/content/media' }),
    schema: ({ image }) =>
      z
        .object({
          title: z.string(),
          kind: z.enum(['image', 'video']).default('image'),
          category: z.enum(['home', 'services', 'portfolio', 'about', 'logos', 'other']).default('other'),
          image: image().nullish(),
          videoUrl: z.string().nullish(),
          alt: z.string().default(''),
          caption: z.string().nullish(),
          description: z.string().nullish(),
          credit: z.string().nullish(),
          tags: z.array(z.string()).default([]),
          seoTitle: z.string().nullish(),
          seoDescription: z.string().nullish(),
          videoDuration: z.string().nullish(),
        })
        .superRefine((entry, context) => {
          if (!entry.image) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['image'],
              message: 'Každý záznam musí obsahovat obrázek nebo náhled videa.',
            });
          }

          if (entry.kind === 'video' && !entry.videoUrl) {
            context.addIssue({
              code: z.ZodIssueCode.custom,
              path: ['videoUrl'],
              message: 'Video záznam musí obsahovat URL videa.',
            });
          }
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
    heroMedia: z.string().nullish(),
    fullBleedMedia: z.string().nullish(),
    galleryMedia: z.array(z.string()).default([]),
    videoMedia: z.string().nullish(),
    photoServiceMedia: z.string().nullish(),
    videoServiceMedia: z.string().nullish(),
    droneServiceMedia: z.string().nullish(),
    companyServiceMedia: z.string().nullish(),
    constructionServiceMedia: z.string().nullish(),
    architectureServiceMedia: z.string().nullish(),
    tourismServiceMedia: z.string().nullish(),
  }),
});

export const collections = { media, projects, testimonials, faqs, pageCopy };
