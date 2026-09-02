import type { APIRoute } from "astro"
import { getCollection } from "astro:content"
import { SITE } from "../config/site.mjs"

export const prerender = true

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    }
    return entities[character] ?? character
  })

const durationInSeconds = (duration: string) => {
  const match = duration.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/)
  if (!match) throw new Error(`Invalid video duration: ${duration}`)
  return Number(match[1] ?? 0) * 3600 + Number(match[2] ?? 0) * 60 + Number(match[3] ?? 0)
}

export const GET: APIRoute = async () => {
  const entries = (await getCollection("docs")).filter(
    (entry) => entry.data.status === "published" && entry.data.videos?.length,
  )

  const urls = entries.map((entry) => {
    const pageUrl = new URL(`/${entry.id}/`, SITE.origin).href
    const videos = (entry.data.videos ?? [])
      .map(
        (video) => `
    <video:video>
      <video:thumbnail_loc>${escapeXml(new URL(video.poster, SITE.origin).href)}</video:thumbnail_loc>
      <video:title>${escapeXml(video.title)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:content_loc>${escapeXml(new URL(video.src, SITE.origin).href)}</video:content_loc>
      <video:duration>${durationInSeconds(video.duration)}</video:duration>
      <video:publication_date>${video.uploadDate}</video:publication_date>
    </video:video>`,
      )
      .join("")

    return `<url><loc>${escapeXml(pageUrl)}</loc>${videos}\n  </url>`
  })

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${urls.join("\n  ")}
</urlset>
`

  return new Response(body, {
    headers: {
      "Cache-Control": "public, max-age=3600",
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
