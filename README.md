# Omarchy QOL website

A minimal Astro home and Starlight documentation site for the Omarchy QOL plugin
collection.

## What is here

- a public landing page at `/`
- a documentation overview and persistent sidebar at `/docs`
- one compact page for every plugin
- reviewed screenshot and video demos from the plugin repositories
- a separate Labs section for unfinished experiments
- direct routes to each plugin's GitHub repository
- a responsive dark theme

Plugin facts and documentation are kept in `src/content/docs/docs/plugins/*.md`.
Update the matching frontmatter when a manifest version, description, status, or
repository location changes. Published demo copies live under `public/media/`;
their source of truth remains the matching plugin repository.

## Project structure

Paths below are relative to the repository root.

| Path                        | Responsibility                         |
| --------------------------- | -------------------------------------- |
| `src/pages/`                | Landing page, robots and video sitemap |
| `src/layouts/`              | HTML document for the landing page     |
| `src/components/`           | Site header, brand and plugin displays |
| `src/components/starlight/` | Starlight component overrides          |
| `src/content/docs/docs/`    | Overview and plugin documentation      |
| `src/content.config.ts`     | Content validation and inferred types  |
| `src/config/site.mjs`       | Site metadata and sitemap exclusions   |
| `src/styles/`               | Shared styles and page-specific rules  |
| `public/`                   | Unprocessed media and public assets    |
| `scripts/`                  | Checks against the production build    |
| `tests/`                    | Redirect Worker tests                  |
| `infra/`                    | Redirect Worker implementation         |

The repeated `docs/docs` is intentional: the first directory belongs to
Starlight's content collection; the second creates the `/docs/` URL prefix. The
landing page at `/` uses Astro's file-based routing separately.

Starlight owns the documentation layout. Its five overrides are registered in
`astro.config.mjs`; each reuses the default component where appropriate.

### Editing content

- Edit the overview in `src/content/docs/docs/index.md` and landing-page copy in
  `src/pages/index.astro`.
- Each plugin has one Markdown file under `src/content/docs/docs/plugins/`. Its
  frontmatter supplies the plugin details and landing-page card. Optional
  Markdown below the frontmatter appears after the generated details.
- Setting `pluginOrder` identifies a plugin and sets its landing-page order. The
  schema then requires `category`, `status`, `version`, `kinds`, `highlights`,
  and `shortDescription`, in addition to Starlight's title.
- Keep media paths versioned and quote video dates, for example
  `uploadDate: "2026-08-22"`. Wrap prose at 80 columns; keep URLs intact.
- Update the explicit sidebar in `astro.config.mjs` when adding or moving a
  page. Its labels and group order are editorial choices, separate from
  `pluginOrder`.
- When a plugin enters or leaves Labs, update both its `status` and
  `NOINDEX_PATHS` in `src/config/site.mjs`. The build check verifies that the
  exclusions match the Labs pages exactly.

### Editing styles

`src/styles/custom.css` is the shared entry point for both page layouts. It
loads the font weights once per page, then imports these files in order:

- `theme.css`: colors, Starlight variables, base styles and shared typography
- `header.css`: brand, landing header and documentation header
- `landing.css`: hero, plugin cards and Labs callout
- `docs.css`: overview, plugin details and install-command controls
- `media.css`: screenshot and video presentation
- `starlight.css`: adjustments to Starlight's built-in layout and typography

Keep responsive rules with their owning styles. Shared defaults load before more
specific rules; changing that order can change the CSS cascade.

## Run locally

```bash
npm install
npm run dev
```

The development server opens at `http://localhost:3000`.

## Verify

```bash
npm run verify
```

The Astro build emits a deployable Cloudflare Worker. The canonical site and
redirect Worker can be deployed directly with Wrangler:

```bash
npm run verify
npx wrangler deploy --domain omarchyqol.com
npx wrangler deploy --config wrangler.redirects.jsonc
```

`sst.config.ts` describes the equivalent SST deployment for CI environments with
a Cloudflare API token. The post-publication discovery steps are kept in
[`SEO-LAUNCH.md`](SEO-LAUNCH.md).

## Brand

The pixel wordmark in `public/omarchy-wordmark.svg` is copied from the current
[Omarchy repository](https://github.com/omacom/omarchy/blob/quattro/logo.svg).
This is independent community work and is not affiliated with or endorsed by
Omarchy or Omacom. Confirm logo and name usage against any applicable brand
guidance before public launch.
