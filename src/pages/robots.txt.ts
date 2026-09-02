import type { APIRoute } from "astro"
import { SITE } from "../config/site.mjs"

export const prerender = true

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE.origin}/sitemap-index.xml`,
    `Sitemap: ${SITE.origin}/video-sitemap.xml`,
    "",
  ].join("\n")

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
