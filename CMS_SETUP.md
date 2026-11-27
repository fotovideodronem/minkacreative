# CMS setup

The site uses Keystatic. In local development, start Astro with `npm run dev` and open
`http://localhost:4321/keystatic/`. Local mode writes edits to the project files; it
does not publish them. Commit and push those changes to trigger a production build.

The production CMS uses Keystatic GitHub mode and requires the site to run on
Cloudflare Workers. The Worker serves the pre-rendered website as static assets and
only runs server code for Keystatic and other dynamic routes.

## Cloudflare

Create a Cloudflare Worker deployment from this repository and use:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

Or deploy manually with `npm run cf:deploy`. Keep the account on the Workers Free
plan; the current Free limits include 100,000 Worker requests per day and 10 ms CPU
per invocation. Static asset requests are free and unlimited. The build uses local
image processing to avoid a Cloudflare Images binding.

## GitHub sign-in

Visit `/keystatic/` on the deployed site and follow Keystatic's GitHub App setup
flow. The GitHub App must be installed with write access to `jakubminka/minkacreative`.
Set the generated `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
and `KEYSTATIC_SECRET` as encrypted Worker secrets. Set
`PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` as a public build/runtime variable as requested
by the setup flow. Never commit the secret values.

When GitHub storage is active, saving an entry writes it to the repository. The
Cloudflare Git integration should then rebuild and deploy the site from the updated
default branch.

## Editable content

- Portfolio projects: title, metadata, galleries, video, SEO fields and project copy.
- Testimonials and FAQ entries: content and publication/order fields.
- Page copy: SEO title/description and hero heading/lead for entries in
  `src/content/page-copy/`.
- Contacts, social links and client logos: the **Kontakty a odkazy** singleton.

The page-copy collection currently edits the headline, intro and SEO content rather
than every body section on every page. Layouts, service detail blocks and styles
remain in Astro components.
