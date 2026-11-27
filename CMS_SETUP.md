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

Create the GitHub App from local development; Keystatic does not allow the initial
App-creation flow on the production Worker. The local dev script uses Node.js for
Keystatic API routes, while production builds continue to use Cloudflare Workers.
From the project root, run:

```sh
PUBLIC_KEYSTATIC_STORAGE=github npm run dev -- --host 127.0.0.1 --port 4322
```

Open `http://127.0.0.1:4322/keystatic/`. If the GitHub setup prompt is not shown,
open `http://127.0.0.1:4322/api/keystatic/github/login` directly. Follow the setup
flow to create the app and install it with access to `jakubminka/minkacreative`.
Keystatic writes the generated values to the local `.env` file, which is ignored by
Git.

In the Cloudflare dashboard, open **Workers & Pages → minka-creative → Settings →
Variables and Secrets**. Add `KEYSTATIC_GITHUB_CLIENT_ID`,
`KEYSTATIC_GITHUB_CLIENT_SECRET`, and `KEYSTATIC_SECRET` as secrets. Add
`PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` as a regular variable. Never commit or share the
secret values. After saving the Worker settings, open `/keystatic/` on the deployed
site and sign in with GitHub.

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
