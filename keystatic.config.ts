import { config, fields, collection, singleton } from '@keystatic/core';

const categories = [
  { label: 'Firmy', value: 'firmy' },
  { label: 'Stavby', value: 'stavby' },
  { label: 'Architektura', value: 'architektura' },
  { label: 'Obce a turismus', value: 'obce-turismus' },
  { label: 'Eventy', value: 'eventy' },
  { label: 'Maturitní plesy', value: 'plesy' },
];

const services = [
  { label: 'Foto', value: 'foto' },
  { label: 'Video', value: 'video' },
  { label: 'Dron', value: 'dron' },
];

const storage =
  import.meta.env.PROD || import.meta.env.PUBLIC_KEYSTATIC_STORAGE === 'github'
    ? {
        kind: 'github' as const,
        repo: { owner: 'jakubminka', name: 'minkacreative' },
      }
    : { kind: 'local' as const };

export default config({
  storage,
  collections: {
    projects: collection({
      label: 'Portfolio projekty',
      slugField: 'title',
      path: 'src/content/projects/*',
      format: { contentField: 'body' },
      columns: ['title', 'year', 'featured'],
      schema: {
        title: fields.slug({ name: { label: 'Název projektu' } }),
        client: fields.text({ label: 'Klient' }),
        showClientName: fields.checkbox({ label: 'Zobrazit jméno klienta' }),
        relationship: fields.select({
          label: 'Vztah k zakázce',
          options: [
            { label: 'Přímý klient', value: 'direct' },
            { label: 'Subdodávka', value: 'subcontract' },
            { label: 'Zprostředkováno', value: 'brokered' },
          ],
          defaultValue: 'direct',
        }),
        year: fields.number({ label: 'Rok realizace' }),
        location: fields.text({ label: 'Místo' }),
        region: fields.text({ label: 'Kraj / oblast' }),
        categories: fields.multiselect({ label: 'Kategorie', options: categories }),
        services: fields.multiselect({ label: 'Služby', options: services }),
        summary: fields.text({ label: 'Krátké shrnutí', multiline: true }),
        brief: fields.text({ label: 'Zadání', multiline: true }),
        result: fields.text({ label: 'Výsledek', multiline: true }),
        cover: fields.image({
          label: 'Hlavní fotografie',
          directory: 'src/assets/projects',
          publicPath: '/src/assets/projects/',
        }),
        coverAlt: fields.text({ label: 'Popis hlavní fotografie (alt)' }),
        gallery: fields.array(
          fields.object({
            image: fields.image({
              label: 'Fotografie',
              directory: 'src/assets/projects',
              publicPath: '/src/assets/projects/',
            }),
            alt: fields.text({ label: 'Popis fotografie (alt)' }),
            caption: fields.text({ label: 'Popisek' }),
          }),
          { label: 'Galerie' }
        ),
        videoUrl: fields.url({ label: 'Odkaz na video' }),
        videoPoster: fields.image({
          label: 'Náhled videa',
          directory: 'src/assets/projects',
          publicPath: '/src/assets/projects/',
        }),
        videoPosterAlt: fields.text({ label: 'Popis náhledu videa (alt)' }),
        videoTitle: fields.text({ label: 'Název videa' }),
        videoDuration: fields.text({ label: 'Délka videa' }),
        testimonial: fields.object(
          {
            quote: fields.text({ label: 'Citace klienta', multiline: true }),
            author: fields.text({ label: 'Autor citace' }),
            company: fields.text({ label: 'Firma' }),
            published: fields.checkbox({ label: 'Schváleno ke zveřejnění' }),
          },
          { label: 'Reference k projektu' }
        ),
        featured: fields.checkbox({ label: 'Zobrazit jako vybraný projekt' }),
        order: fields.number({ label: 'Pořadí' }),
        seoTitle: fields.text({ label: 'SEO titulek' }),
        seoDescription: fields.text({ label: 'SEO popis', multiline: true }),
        body: fields.markdoc({ label: 'Popis projektu' }),
      },
    }),
    testimonials: collection({
      label: 'Reference',
      slugField: 'title',
      path: 'src/content/testimonials/*',
      columns: ['author', 'company', 'published'],
      schema: {
        title: fields.slug({ name: { label: 'Interní klíč reference' } }),
        author: fields.text({ label: 'Jméno autora' }),
        company: fields.text({ label: 'Firma / organizace' }),
        quote: fields.text({ label: 'Text reference', multiline: true }),
        projectHref: fields.text({ label: 'Odkaz na projekt (volitelný)' }),
        published: fields.checkbox({ label: 'Schváleno ke zveřejnění' }),
        order: fields.number({ label: 'Pořadí' }),
      },
    }),
    faqs: collection({
      label: 'Časté dotazy',
      slugField: 'title',
      path: 'src/content/faqs/*',
      columns: ['question', 'order'],
      schema: {
        title: fields.slug({ name: { label: 'Interní klíč otázky' } }),
        question: fields.text({ label: 'Otázka' }),
        answer: fields.text({ label: 'Odpověď', multiline: true }),
        order: fields.number({ label: 'Pořadí' }),
      },
    }),
    pageCopy: collection({
      label: 'Texty stránek',
      slugField: 'pageKey',
      path: 'src/content/page-copy/*',
      columns: ['pageKey', 'heading'],
      schema: {
        pageKey: fields.slug({ name: { label: 'Klíč stránky / URL' } }),
        seoTitle: fields.text({ label: 'SEO titulek' }),
        seoDescription: fields.text({ label: 'SEO popis', multiline: true }),
        eyebrow: fields.text({ label: 'Nadpis nad hlavním titulkem' }),
        heading: fields.text({ label: 'Hlavní nadpis stránky' }),
        lead: fields.text({ label: 'Úvodní text', multiline: true }),
        summary: fields.text({ label: 'Doplňující úvodní text', multiline: true }),
        summaryText: fields.text({ label: 'Text úvodního souhrnu', multiline: true }),
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: 'Kontakty a odkazy',
      path: 'src/content/site-settings',
      format: { data: 'json' },
      schema: {
        contact: fields.object({
          phoneDisplay: fields.text({ label: 'Telefon' }),
          phoneHref: fields.text({ label: 'Odkaz na telefon (tel:...)' }),
          email: fields.text({ label: 'E-mail' }),
          ico: fields.text({ label: 'IČO' }),
          serviceArea: fields.text({ label: 'Hlavní oblast působení' }),
          secondaryArea: fields.text({ label: 'Další oblast působení' }),
        }),
        socialLinks: fields.array(
          fields.object({
            id: fields.select({
              label: 'Síť',
              options: [
                { label: 'Instagram', value: 'instagram' },
                { label: 'Facebook', value: 'facebook' },
                { label: 'YouTube', value: 'youtube' },
                { label: 'LinkedIn', value: 'linkedin' },
              ],
              defaultValue: 'instagram',
            }),
            label: fields.text({ label: 'Název odkazu' }),
            url: fields.text({ label: 'Adresa profilu' }),
          }),
          { label: 'Sociální sítě' }
        ),
        clientLogos: fields.array(
          fields.object({
            name: fields.text({ label: 'Název firmy' }),
            image: fields.image({
              label: 'Logo',
              directory: 'public/images/client-logos',
              publicPath: '/images/client-logos/',
            }),
            alt: fields.text({ label: 'Popis loga (alt)' }),
          }),
          { label: 'Loga spolupracujících firem' }
        ),
      },
    }),
  },
});
