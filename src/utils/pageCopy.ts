import { getCollection } from 'astro:content';

export async function getPageCopy(pageKey: string) {
  const entries = await getCollection('pageCopy');
  return entries.find((entry) => entry.id === pageKey);
}
