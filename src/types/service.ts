import type { ImageMetadata } from 'astro';
import type { GalleryItem } from '../components/MasonryGallery.astro';

/**
 * Datový model stránky služby / segmentu podle sekce 7 a 8 zadání.
 */
export interface ServiceSpec {
  label: string;
  value: string;
  isPlaceholder?: boolean;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServiceProjectPreview {
  title: string;
  href: string;
  summary: string;
  image: ImageMetadata;
  imageAlt: string;
  year?: number | string;
  location?: string;
  services?: string[];
  client?: string;
  showClientName?: boolean;
  relationship?: 'direct' | 'subcontract' | 'brokered';
}

export interface ServiceVideoPreview {
  title: string;
  poster: ImageMetadata;
  posterAlt: string;
  videoUrl?: string;
  duration?: string;
  caption?: string;
}

export interface ServicePageData {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  summaryLead: string;
  summaryBody: string;
  heroImage: ImageMetadata;
  heroImageAlt: string;
  specs: ServiceSpec[];
  benefitsHeading: string;
  benefitsLead?: string;
  benefits: ServiceBenefit[];
  galleryHeading: string;
  galleryLead?: string;
  gallery: GalleryItem[];
  video?: ServiceVideoPreview;
  processHeading?: string;
  processLead?: string;
  processSteps: ServiceProcessStep[];
  projectsHeading?: string;
  projectsLead?: string;
  projects: ServiceProjectPreview[];
  faqHeading?: string;
  faqLead?: string;
  faq: FaqItem[];
  ctaHeading?: string;
  ctaSummary?: string;
}
