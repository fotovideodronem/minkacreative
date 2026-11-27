/**
 * Pomocná funkce pro převod URL z YouTube, Vimeo nebo Bunny Stream na embed URL
 * (používá se ve VideoBlock i v Lightboxu, aby se přehrávač načetl až po kliknutí).
 */

export interface ParsedVideoSource {
  kind: 'embed' | 'file' | 'placeholder';
  src: string;
  provider?: 'youtube' | 'vimeo' | 'bunny';
}

export function parseVideoSource(rawUrl?: string): ParsedVideoSource {
  if (!rawUrl || rawUrl.trim() === '' || rawUrl.trim().startsWith('DOPLNIT:')) {
    return {
      kind: 'placeholder',
      src: rawUrl?.trim() || '[DOPLNIT: URL videa (YouTube / Vimeo / Bunny Stream)]',
    };
  }

  const trimmed = rawUrl.trim();

  if (/\.(mp4|webm)(\?.*)?$/i.test(trimmed)) {
    return { kind: 'file', src: trimmed };
  }

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return { kind: 'placeholder', src: trimmed };
  }

  const host = url.hostname.replace(/^www\./, '').toLowerCase();

  // YouTube (youtube.com, youtu.be, youtube-nocookie.com)
  if (host === 'youtu.be') {
    const id = url.pathname.split('/').filter(Boolean)[0];
    if (id) {
      return {
        kind: 'embed',
        provider: 'youtube',
        src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`,
      };
    }
  }

  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
    const watchId = url.searchParams.get('v');
    const pathParts = url.pathname.split('/').filter(Boolean);
    const shortOrEmbedId =
      pathParts[0] === 'shorts' || pathParts[0] === 'embed' ? pathParts[1] : undefined;
    const id = watchId || shortOrEmbedId;

    if (id) {
      return {
        kind: 'embed',
        provider: 'youtube',
        src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`,
      };
    }
  }

  // Vimeo (vimeo.com, player.vimeo.com)
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = url.pathname.split('/').filter(Boolean).pop();
    if (id && /^\d+$/.test(id)) {
      return {
        kind: 'embed',
        provider: 'vimeo',
        src: `https://player.vimeo.com/video/${id}?autoplay=1`,
      };
    }
  }

  // Bunny Stream (iframe.mediadelivery.net)
  if (host === 'iframe.mediadelivery.net') {
    const embedUrl = new URL(trimmed);
    embedUrl.pathname = embedUrl.pathname.replace(/^\/play\//, '/embed/');
    embedUrl.searchParams.set('autoplay', 'true');
    return {
      kind: 'embed',
      provider: 'bunny',
      src: embedUrl.toString(),
    };
  }

  return { kind: 'placeholder', src: trimmed };
}
