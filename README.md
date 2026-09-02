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

Plugin facts and documentation are kept in
`src/content/docs/docs/plugins/*.md`. Update the matching frontmatter when a
manifest version, description, status, or repository location changes. Published
demo copies live under `public/media/`; their source of truth remains the
matching plugin repository.

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

Cloudflare deployment is described by `sst.config.ts`. Deployment remains a
manual action. The post-publication discovery steps are kept in
[`SEO-LAUNCH.md`](SEO-LAUNCH.md).

## Brand

The pixel wordmark in `public/omarchy-wordmark.svg` is copied from the current
[Omarchy repository](https://github.com/omacom/omarchy/blob/quattro/logo.svg).
This is independent community work and is not affiliated with or endorsed by
Omarchy or Omacom. Confirm logo and name usage against any applicable brand
guidance before public launch.
