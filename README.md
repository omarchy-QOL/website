# Omarchy QOL website

Astro and Starlight source for [omarchyqol.com](https://omarchyqol.com).

```bash
npm ci
npm run dev
```

The development server runs at `http://localhost:3000`.

## Files

| Path                        | Purpose                                |
| --------------------------- | -------------------------------------- |
| `src/pages/`                | Landing page, robots and video sitemap |
| `src/content/docs/docs/`    | Overview and plugin documentation      |
| `src/content.config.ts`     | Frontmatter validation                 |
| `src/components/`           | Shared website components              |
| `src/components/starlight/` | Starlight overrides                    |
| `src/layouts/`              | Landing-page HTML layout               |
| `src/styles/`               | Theme, headers, landing, docs, media   |
| `src/config/site.mjs`       | Site metadata and sitemap exclusions   |
| `public/media/`             | Versioned screenshots and videos       |

`src/content/docs/` is Starlight's collection directory. Its `docs/` subfolder
creates the `/docs/` URL prefix.

Plugin frontmatter supplies the details and landing-page cards. `pluginOrder`
sets card order. Optional Markdown appears after the generated plugin details.
Keep video dates quoted and media filenames versioned.

Sidebar labels and order are configured in `astro.config.mjs`. When a plugin
enters or leaves Labs, update its `status` and `NOINDEX_PATHS` in
`src/config/site.mjs` together.

`src/styles/custom.css` imports the fonts and six stylesheets. Keep responsive
rules with their corresponding styles; import order affects the cascade.

## Checks and deployment

```bash
npm run verify
```

Runs formatting, Astro diagnostics, the Cloudflare build, SEO checks, and
redirect tests. Build output is written to `dist/`.

```bash
npx wrangler deploy --domain omarchyqol.com
npx wrangler deploy --config wrangler.redirects.jsonc
```

## Brand

The wordmark comes from the
[Omarchy repository](https://github.com/omacom/omarchy/blob/quattro/logo.svg).
This project is independent of Omarchy and Omacom.
