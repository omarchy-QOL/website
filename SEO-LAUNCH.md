# SEO launch checklist

The canonical origin is `https://omarchyqol.com`. Production deployment is
configured to redirect `www.omarchyqol.com`, `omarchy-qol.com`, and
`www.omarchy-qol.com` to that origin.

## Before production

- Run `npm run verify`.
- Confirm published plugin versions against their GitHub default branches.
- Confirm every media URL returns a successful byte-range response.
- Keep Labs visible but `noindex,follow` until they have public repositories
  and install information.

## After production deployment

- Confirm HTTP and alternate hostnames redirect to the canonical HTTPS origin.
- Confirm `/robots.txt`, `/sitemap-index.xml`, and `/video-sitemap.xml` return
  `200` without authentication.
- Run Google Rich Results Test on a plugin page containing videos.
- Run PageSpeed Insights for the landing page and one media-heavy plugin page.
- Verify the domain property in Google Search Console through Cloudflare DNS.
- Submit `https://omarchyqol.com/sitemap-index.xml` and inspect the landing
  page plus two representative plugin pages.
- Monitor Page Indexing, Video Indexing, and Core Web Vitals.

## External discovery

- Add `https://omarchyqol.com` to the GitHub organization profile.
- Link each plugin page from the matching repository and link each repository
  from its plugin page.
- Update the matching omarchyplugins.com entries after the website is public.

## Deliberately deferred

- Do not add fabricated ratings or reviews for `SoftwareApplication` rich
  results.
- Do not add generated keyword pages, a separate AEO/GEO layer, or analytics
  without a concrete measurement need.
- Do not add individual video watch pages unless video-search traffic becomes
  an explicit goal.
