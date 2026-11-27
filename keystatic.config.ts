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
        repo: { owner: 'fotovideodronem', name: 'minkacreative' },
      }
    : { kind: 'local' as const };

export default config({
  storage,
  collections: {
    media: collection({
      label: 'Knihovna médií',
      slugField: 'title',
      path: 'src/content/media/*',
      columns: ['title', 'kind', 'category'],
      schema: {
        title: fields.slug({ name: { label: 'Název média' } }),
        kind: fields.select({
          label: 'Typ média',
          options: [
            { label: 'Fotografie / obrázek', value: 'image' },
            { label: 'Video (odkaz)', value: 'video' },
          ],
          defaultValue: 'image',
        }),
        category: fields.select({
          label: 'Kategorie',
          options: [
            { label: 'Úvodní stránka', value: 'home' },
            { label: 'Služby', value: 'services' },
            { label: 'Portfolio', value: 'portfolio' },
            { label: 'O mně', value: 'about' },
            { label: 'Loga klientů', value: 'logos' },
            { label: 'Ostatní', value: 'other' },
          ],
          defaultValue: 'other',
        }),
        image: fields.image({
          label: 'Obrázek nebo náhled videa',
          description:
            'Soubor se uloží do GitHub repozitáře. Astro při buildu vytvoří optimalizované varianty WebP a AVIF.',
          directory: 'src/assets/media',
          publicPath: '/src/assets/media/',
          validation: { isRequired: true },
        }),
        videoUrl: fields.url({
          label: 'Odkaz na video',
          description:
            'Vlož YouTube odkaz (podporované jsou také Vimeo a Bunny Stream). Video zůstává u poskytovatele, nenahrává se do repozitáře.',
        }),
        alt: fields.text({ label: 'Alternativní text (alt)' }),
        caption: fields.text({ label: 'Popisek', multiline: true }),
        description: fields.text({ label: 'Popis média', multiline: true }),
        credit: fields.text({ label: 'Autor / zdroj' }),
        tags: fields.array(fields.text({ label: 'Štítek' }), {
          label: 'Kategorie a štítky',
        }),
        seoTitle: fields.text({ label: 'SEO titulek média' }),
        seoDescription: fields.text({
          label: 'SEO popis média',
          multiline: true,
        }),
        videoDuration: fields.text({ label: 'Délka videa' }),
      },
    }),
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
        coverMedia: fields.relationship({
          label: 'Hlavní obrázek z knihovny',
          collection: 'media',
        }),
        galleryMedia: fields.multiRelationship({
          label: 'Galerie z knihovny',
          collection: 'media',
        }),
        videoMedia: fields.relationship({
          label: 'Video z knihovny',
          collection: 'media',
        }),
        cover: fields.image({
          label: 'Hlavní fotografie (starší projekt)',
          directory: 'src/assets/projects',
          publicPath: '/src/assets/projects/',
          validation: { isRequired: false },
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
          { label: 'Galerie (starší projekt)' }
        ),
        videoUrl: fields.url({ label: 'Odkaz na video (starší projekt)' }),
        videoPoster: fields.image({
          label: 'Náhled videa (starší projekt)',
          directory: 'src/assets/projects',
          publicPath: '/src/assets/projects/',
          validation: { isRequired: false },
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
        heroMedia: fields.relationship({
          label: 'Hlavní obrázek stránky',
          collection: 'media',
        }),
        fullBleedMedia: fields.relationship({
          label: 'Celošířkový obrázek',
          collection: 'media',
        }),
        galleryMedia: fields.multiRelationship({
          label: 'Fotogalerie stránky',
          collection: 'media',
        }),
        videoMedia: fields.relationship({
          label: 'Video stránky',
          collection: 'media',
        }),
        photoServiceMedia: fields.relationship({
          label: 'Obrázek služby Foto (titulní stránka a přehled služeb)',
          collection: 'media',
        }),
        videoServiceMedia: fields.relationship({
          label: 'Obrázek služby Video (titulní stránka a přehled služeb)',
          collection: 'media',
        }),
        droneServiceMedia: fields.relationship({
          label: 'Obrázek služby Dron (titulní stránka a přehled služeb)',
          collection: 'media',
        }),
        companyServiceMedia: fields.relationship({
          label: 'Obrázek služby Pro firmy (stránka Služby)',
          collection: 'media',
        }),
        constructionServiceMedia: fields.relationship({
          label: 'Obrázek služby Stavby (stránka Služby)',
          collection: 'media',
        }),
        architectureServiceMedia: fields.relationship({
          label: 'Obrázek služby Architektura (stránka Služby)',
          collection: 'media',
        }),
        tourismServiceMedia: fields.relationship({
          label: 'Obrázek služby Turismus (stránka Služby)',
          collection: 'media',
        }),
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
            media: fields.relationship({
              label: 'Logo z knihovny médií',
              collection: 'media',
            }),
            alt: fields.text({ label: 'Popis loga (alt)' }),
          }),
          { label: 'Loga spolupracujících firem' }
        ),
      },
    }),
  },
});
