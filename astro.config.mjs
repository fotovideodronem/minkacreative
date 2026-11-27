// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';

export default defineConfig({
  site: 'https://minka-creative.cz',
  output: 'static',
  adapter: cloudflare({
    configPath: './wrangler.jsonc',
    imageService: { build: 'compile', runtime: 'passthrough' },
  }),
  trailingSlash: 'always',
  integrations: [
    markdoc(),
    react(),
    keystatic(),
    sitemap({
      filter: (page) =>
        !page.includes('/dekuji/') &&
        !page.includes('/podekovani/') &&
        !page.includes('/design-system/') &&
        !page.includes('/ochrana-osobnich-udaju/'),
    }),
  ],
});
