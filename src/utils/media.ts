import { getCollection, type CollectionEntry } from 'astro:content';
import type { ImageMetadata } from 'astro';
import type { GalleryItem } from '../components/MasonryGallery.astro';
import type { ServiceVideoPreview } from '../types/service';
import { parseVideoSource } from './videoEmbed';

export type MediaRecord = CollectionEntry<'media'>['data'];
export type MediaLibrary = ReadonlyMap<string, MediaRecord>;

let mediaLibraryPromise: Promise<MediaLibrary> | undefined;

export function getMediaLibrary(): Promise<MediaLibrary> {
  mediaLibraryPromise ??= getCollection('media').then(
    (entries) => new Map(entries.map(({ id, data }) => [id, data]))
  );
  return mediaLibraryPromise;
}

export function getMediaRecord(
  library: MediaLibrary,
  id: string | null | undefined,
  context: string
): MediaRecord | undefined {
  if (!id) return undefined;
  const record = library.get(id);
  if (!record) {
    throw new Error(`Media "${id}" referenced by ${context} does not exist.`);
  }
  return record;
}

export function requireMediaRecord(
  library: MediaLibrary,
  id: string,
  context: string
): MediaRecord {
  const record = getMediaRecord(library, id, context);
  if (!record) {
    throw new Error(`Media reference for ${context} is empty.`);
  }
  return record;
}

export function requireMediaImage(
  record: MediaRecord,
  context: string
): ImageMetadata {
  if (!record.image) {
    throw new Error(`Media "${record.title}" referenced by ${context} has no image or poster.`);
  }
  return record.image;
}

function requireVideoUrl(record: MediaRecord, context: string): string {
  if (!record.videoUrl || parseVideoSource(record.videoUrl).kind === 'placeholder') {
    throw new Error(
      `Video "${record.title}" referenced by ${context} has an unsupported or missing URL.`
    );
  }
  return record.videoUrl;
}

export function toGalleryItem(
  record: MediaRecord,
  context: string
): GalleryItem {
  return {
    image: requireMediaImage(record, context),
    alt: record.alt,
    caption: record.caption || undefined,
    videoUrl: record.kind === 'video' ? requireVideoUrl(record, context) : undefined,
    seoTitle: record.seoTitle,
    seoDescription: record.seoDescription,
    credit: record.credit,
  };
}

export function toVideoPreview(
  record: MediaRecord,
  context: string
): ServiceVideoPreview {
  if (record.kind !== 'video') {
    throw new Error(`Media "${record.title}" referenced by ${context} is not a video.`);
  }

  const videoUrl = requireVideoUrl(record, context);

  return {
    title: record.seoTitle || record.title,
    poster: requireMediaImage(record, context),
    posterAlt: record.alt,
    videoUrl,
    duration: record.videoDuration || undefined,
    caption: record.caption || undefined,
    description: record.seoDescription || record.description || undefined,
  };
}

export function toMediaStructuredData(
  item: GalleryItem,
  siteUrl: URL | undefined
): Record<string, string> {
  const imageUrl = siteUrl
    ? new URL(item.image.src, siteUrl).toString()
    : item.image.src;
  const name = item.seoTitle || item.caption || item.alt;
  const description = item.seoDescription || item.caption || item.alt;

  if (item.videoUrl) {
    const video = parseVideoSource(item.videoUrl);
    return {
      '@type': 'VideoObject',
      name,
      description,
      thumbnailUrl: imageUrl,
      ...(video.kind === 'embed'
        ? { embedUrl: video.src }
        : { contentUrl: item.videoUrl }),
    };
  }

  return {
    '@type': 'ImageObject',
    name,
    description,
    caption: item.caption || '',
    contentUrl: imageUrl,
    thumbnailUrl: imageUrl,
  };
}
