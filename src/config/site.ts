import siteSettings from '../content/site-settings.json';

/**
 * Centrální konfigurace webu Minka Creative.
 * Všechny kontaktní údaje, odkazy na sítě a navigace jsou na jednom místě.
 * Zástupné hodnoty označené "DOPLNIT:" stačí nahradit skutečnými údaji.
 */

export type ThemeVariant = 'dark' | 'light';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavLink[];
}

export interface SocialLink {
  id: 'instagram' | 'facebook' | 'youtube' | 'linkedin';
  label: string;
  url: string;
}

export interface ClientLogo {
  name: string;
  media: string;
  alt: string;
}

const socialLinks: SocialLink[] = siteSettings.socialLinks;
const clientLogos: ClientLogo[] = siteSettings.clientLogos;

/**
 * Jedna proměnná pro přepnutí varianty vzhledu celého webu.
 */
export const ACTIVE_THEME: ThemeVariant = 'light';

export const siteConfig = {
  brandName: 'Minka Creative',
  ownerName: 'Jakub Minka',
  ownerRole: 'Fotograf a tvůrce videí',
  locale: 'cs',
  domain: 'https://minka-creative.cz',

  contact: {
    ...siteSettings.contact,
  },

  externalLinks: {
    weddings: {
      label: 'Svatby',
      href: 'https://minka-weddings.cz',
    },
  },

  form: {
    endpoint: 'https://formspree.io/f/myewagad',
    successUrl: '/dekuji/',
  },

  analytics: {
    provider: 'none' as 'none' | 'plausible' | 'umami',
    scriptUrl: '',
    siteId: '',
  },

  socialLinks,
  clientLogos,

  navigation: {
    servicesOverview: {
      label: 'Přehled služeb',
      href: '/sluzby/',
    } satisfies NavLink,
    servicesGroups: [
      {
        title: 'Co dělám',
        items: [
          { label: 'Foto', href: '/sluzby/foto/' },
          { label: 'Video', href: '/sluzby/video/' },
          { label: 'Dron', href: '/sluzby/dron/' },
        ],
      },
      {
        title: 'Pro koho',
        items: [
          { label: 'Pro firmy', href: '/pro-firmy/' },
          { label: 'Stavební fotoreporty', href: '/stavebni-fotoreporty/' },
          { label: 'Interiéry a architektura', href: '/interiery-architektura/' },
          { label: 'Obce a turismus', href: '/obce-mesta-turismus/' },
          { label: 'Eventy', href: '/eventy/' },
          { label: 'Maturitní plesy', href: '/maturitni-plesy/' },
        ],
      },
    ] satisfies NavGroup[],
    mainLinks: [
      { label: 'Portfolio', href: '/portfolio/' },
      { label: 'Reference', href: '/reference/' },
      { label: 'O mně', href: '/o-mne/' },
      { label: 'Kontakt', href: '/kontakt/' },
    ] satisfies NavLink[],
    cta: {
      label: 'Poptávka',
      href: '/kontakt/',
    } satisfies NavLink,
  },

  footerLinks: {
    legal: {
      label: 'Ochrana osobních údajů',
      href: '/ochrana-osobnich-udaju/',
    } satisfies NavLink,
    local: {
      label: 'Fotograf Vlašim',
      href: '/fotograf-vlasim/',
    } satisfies NavLink,
    faq: {
      label: 'Časté dotazy (FAQ)',
      href: '/faq/',
    } satisfies NavLink,
  },
} as const;

/** Pomocná funkce: rozpozná, zda hodnota ještě čeká na doplnění. */
export function isPlaceholderValue(value: string): boolean {
  return value.trim().startsWith('DOPLNIT:');
}
